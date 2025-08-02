<template>
  <div class="app" :class="{ dark: isDark }" @keyup.esc="closeModal">
    <Header
      :is-dark="isDark"
      :cart="cart"
      v-model:search-query="searchQuery"
      @toggle-dark="toggleDark"
      @toggle-cart-sidebar="() => {}"
    />

    <Hero :hero-img="heroImg" />

    <!-- ========= MAIN ========= -->
    <main
      id="products"
      class="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <div class="lg:flex lg:gap-8">
        <Filters
          :brands="brands"
          v-model:selected-brands="selectedBrands"
          v-model:price-range="priceRange"
        />
        <ProductList
          :products="filteredProducts"
          v-model:sort-by="sortBy"
          @show-product-details="showProductDetails"
          @reset-filters="resetFilters"
        />
      </div>
    </main>

    <Footer />

    <!-- ========= MODAL ========= -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-300"
        leave-active-class="transition ease-in duration-200"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showModal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          @click.self="closeModal"
        >
          <Transition
            enter-active-class="transition ease-out duration-300"
            leave-active-class="transition ease-in duration-200"
            enter-from-class="opacity-0 scale-95"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              class="relative w-full max-w-4xl rounded-2xl bg-white dark:bg-slate-800 shadow-2xl m-4"
            >
              <button
                @click="closeModal"
                class="absolute top-4 right-4 z-10 rounded-full bg-slate-100 dark:bg-slate-700 p-2 text-slate-600 dark:text-slate-300"
                aria-label="Close modal"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div
                class="grid md:grid-cols-2 gap-6 p-6 lg:p-8"
                v-if="selectedProduct"
              >
                <!-- image -->
                <div
                  class="flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900/50 p-4"
                >
                  <img
                    :src="selectedProduct.image"
                    :alt="selectedProduct.name"
                    class="max-h-96 object-contain"
                  />
                </div>

                <!-- details -->
                <div>
                  <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
                    {{ selectedProduct.name }}
                  </h2>
                  <span
                    class="mt-2 inline-block rounded-full bg-green-100 dark:bg-green-900/50 px-3 py-1 text-sm font-semibold text-green-800 dark:text-green-200"
                  >
                    Stok Tersedia
                  </span>
                  <p
                    class="mt-4 text-3xl font-extrabold text-slate-900 dark:text-white"
                  >
                    ${{ selectedProduct.price.toFixed(2) }}
                  </p>
                  <p
                    class="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
                  >
                    {{ selectedProduct.description }}
                  </p>

                  <div class="mt-4 text-sm text-slate-600 dark:text-slate-300">
                    <p v-if="selectedProduct.color"><strong>Color:</strong> {{ selectedProduct.color }}</p>
                    <p v-if="selectedProduct.spec" class="mt-2"><strong>Specifications:</strong><br/>{{ selectedProduct.spec }}</p>
                  </div>

                  <!-- add to cart -->
                  <button
                    @click="addToCart(selectedProduct)"
                    class="mt-8 w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 active:scale-[0.98]"
                  >
                    Tambah ke Keranjang
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

    <!-- ========= TOAST ========= -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300"
        leave-active-class="transition duration-300"
        enter-from-class="opacity-0 translate-y-4"
        leave-to-class="opacity-0 translate-y-4"
      >
        <div
          v-if="showToast"
          class="fixed bottom-6 right-6 z-50 rounded-lg bg-green-500 px-5 py-3 text-sm font-medium text-white shadow-xl"
        >
          Berhasil ditambahkan ke keranjang!
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref, computed, onMounted, nextTick, reactive } from "vue";
import axios from "axios";
import Header from "../components/Header.vue";
import Hero from "../components/Hero.vue";
import Filters from "../components/Filters.vue";
import ProductList from "../components/ProductList.vue";
import Footer from "../components/Footer.vue";

/* ----------------------------------------------------------------- */
/*  MOCK DATA – EMBED BASE64 HERO IMAGE
/* ----------------------------------------------------------------- */
const heroImg =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAFNAU0DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//Z";

/* ----------------------------------------------------------------- */
/*  STATE
/* ----------------------------------------------------------------- */
const products = ref([]);
const brands = ref([]);
const selectedBrands = ref([]);
const priceRange = ref({ min: 0, max: 2000, current: 2000 });
const searchQuery = ref("");
const sortBy = ref("default");
const cart = ref([]);
const selectedProduct = ref(null);
const showModal = ref(false);
const showToast = ref(false);
const isDark = ref(false);

/* ----------------------------------------------------------------- */
/*  API INTEGRATION
/* -----------------------------------------------------------------*/
const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/products');
    const data = response.data.map(p => ({
      id: p._id,
      name: p.name,
      brand: p.category ? p.category.name : 'Unbranded',
      price: p.price,
      image: p.photos && p.photos.length > 0 ? p.photos[0] : 'https://via.placeholder.com/400',
      description: p.description,
      spec: p.spec,
      color: p.color,
      // Add a default options object to avoid errors in the modal
      options: {},
    }));
    products.value = data;

    // Update filters based on fetched data
    brands.value = [...new Set(data.map(p => p.brand))].sort();
    const prices = data.map(p => p.price);
    if (prices.length > 0) {
      priceRange.value.min = Math.floor(Math.min(...prices));
      priceRange.value.max = Math.ceil(Math.max(...prices));
      priceRange.value.current = priceRange.value.max;
    }

  } catch (error) {
    console.error("Failed to fetch products:", error);
    // Optionally, handle the error in the UI
  }
};

/* ----------------------------------------------------------------- */
/*  COMPUTED
/* -----------------------------------------------------------------*/
const filteredProducts = computed(() => {
  let list = products.value;

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(q));
  }

  if (selectedBrands.value.length) {
    list = list.filter((p) => selectedBrands.value.includes(p.brand));
  }

  list = list.filter((p) => p.price <= priceRange.value.current);

  if (sortBy.value === "price-asc") list.sort((a, b) => a.price - b.price);
  if (sortBy.value === "price-desc") list.sort((a, b) => b.price - a.price);

  return list;
});

/* ----------------------------------------------------------------- */
/*  METHODS
/* -----------------------------------------------------------------*/
const showProductDetails = (product) => {
  selectedProduct.value = product;
  showModal.value = true;
  nextTick(() => {
    document.body.style.overflow = "hidden";
  });
};

const closeModal = () => {
  showModal.value = false;
  selectedProduct.value = null;
  document.body.style.overflow = "";
};

const addToCart = (payload) => {
  cart.value.push({ ...payload, cartId: Date.now() });
  closeModal();
  showToast.value = true;
  setTimeout(() => (showToast.value = false), 3000);
};

const resetFilters = () => {
  selectedBrands.value = [];
  searchQuery.value = "";
  priceRange.value.current = priceRange.value.max;
  sortBy.value = "default";
};

const toggleDark = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("dark", isDark.value);
};

/* ----------------------------------------------------------------- */
/*  LIFECYCLE
/* -----------------------------------------------------------------*/
onMounted(() => {
  fetchProducts();
  // dark mode
  isDark.value = localStorage.getItem("dark") === "true";
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap");

:root {
  --color-primary: 79 70 229;
  --color-surface: 248 250 252;
  --color-surface-dark: 15 23 42;
  --color-text: 30 41 59;
  --color-text-dark: 226 232 240;
}
.dark {
  --color-surface: var(--color-surface-dark);
  --color-text: var(--color-text-dark);
}
html {
  scroll-behavior: smooth;
}
body {
  font-family: "Inter", sans-serif;
  background-color: rgb(var(--color-surface));
  color: rgb(var(--color-text));
  transition: background-color 0.3s ease;
}
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
