<!-- App.vue – Vue 3 + Vite + Tailwind -->
<template>
  <div class="app" :class="{ dark: isDark }" @keyup.esc="closeModal">
    <!-- ========= HEADER ========= -->
    <header
      class="sticky top-0 z-40 bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-700/50"
    >
      <div
        class="mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <!-- Logo -->
        <a href="#" class="flex items-center space-x-2">
          <svg
            class="h-8 w-8 text-indigo-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-.01L12 2z"
            />
          </svg>
          <span
            class="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100"
          >
            VueMobile
          </span>
        </a>

        <!-- Search -->
        <div class="hidden lg:flex flex-1 max-w-md mx-8">
          <label class="relative w-full">
            <input
              v-model.trim="searchQuery"
              type="search"
              placeholder="Cari produk, merek, dan lainnya..."
              class="w-full rounded-full bg-slate-100 dark:bg-slate-800 border-transparent py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-indigo-500"
            />
            <svg
              class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </label>
        </div>

        <!-- Nav -->
        <nav class="flex items-center space-x-6">
          <button
            @click="toggleDark"
            class="hidden md:block rounded-full p-2 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
            aria-label="Toggle dark mode"
          >
            <svg
              v-if="!isDark"
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
              />
            </svg>
            <svg v-else class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <a
            href="#"
            class="hidden md:block text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-500"
          >
            Deals
          </a>

          <button
            @click="toggleCartSidebar"
            class="relative p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-500"
            aria-label="Open cart"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span
              v-if="cart.length"
              class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
            >
              {{ cart.length }}
            </span>
          </button>
        </nav>
      </div>
    </header>

    <!-- ========= HERO ========= -->
    <section
      class="relative flex items-center justify-center bg-cover bg-center py-24 sm:py-32 text-center text-white"
      :style="{
        backgroundImage: `linear-gradient(rgba(15,23,42,.75),rgba(15,23,42,.75)), url(${heroImg})`,
      }"
    >
      <div class="mx-auto max-w-3xl px-4">
        <h1
          class="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
        >
          Teknologi Terbaru di Ujung Jari Anda
        </h1>
        <p class="mt-6 text-lg text-slate-200 max-w-xl mx-auto">
          Jelajahi koleksi smartphone terbaru dari merek-merek ternama dunia.
          Penawaran terbaik menanti Anda.
        </p>
        <a
          href="#products"
          class="mt-10 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 shadow-lg hover:bg-slate-100 transition-transform transform hover:scale-105"
        >
          Belanja Sekarang
        </a>
      </div>
    </section>

    <!-- ========= MAIN ========= -->
    <main
      id="products"
      class="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <div class="lg:flex lg:gap-8">
        <!-- Filters -->
        <aside class="lg:w-1/4 mb-8 lg:mb-0">
          <div
            class="rounded-2xl bg-white dark:bg-slate-800/80 p-6 shadow-lg ring-1 ring-slate-900/5"
          >
            <h2
              class="text-xl font-bold mb-6 border-b pb-3 dark:border-slate-700"
            >
              Filter
            </h2>

            <!-- Brand -->
            <div>
              <h3
                class="font-semibold mb-3 text-sm text-slate-700 dark:text-slate-300"
              >
                Merek
              </h3>
              <div class="space-y-2">
                <label
                  v-for="brand in brands"
                  :key="brand"
                  class="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    v-model="selectedBrands"
                    :value="brand"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span class="text-sm text-slate-600 dark:text-slate-400">
                    {{ brand }}
                  </span>
                </label>
              </div>
            </div>

            <!-- Price -->
            <div class="mt-8">
              <h3
                class="font-semibold mb-3 text-sm text-slate-700 dark:text-slate-300"
              >
                Rentang Harga
              </h3>
              <input
                v-model.number="priceRange.current"
                type="range"
                :min="priceRange.min"
                :max="priceRange.max"
                class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <div class="flex justify-between text-xs text-slate-500 mt-2">
                <span>${{ priceRange.min }}</span>
                <span>${{ priceRange.current }}</span>
                <span>${{ priceRange.max }}</span>
              </div>
            </div>
          </div>
        </aside>

        <!-- Products -->
        <div class="lg:w-3/4">
          <div
            class="mb-6 flex items-center justify-between rounded-2xl bg-white dark:bg-slate-800/80 px-4 py-3 shadow-lg ring-1 ring-slate-900/5"
          >
            <p class="text-sm text-slate-600 dark:text-slate-400">
              {{ filteredProducts.length }} produk ditemukan
            </p>
            <select
              v-model="sortBy"
              class="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="default">Urutan Default</option>
              <option value="price-asc">Harga: Rendah → Tinggi</option>
              <option value="price-desc">Harga: Tinggi → Rendah</option>
            </select>
          </div>

          <!-- Grid -->
          <div
            v-if="filteredProducts.length"
            class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            <div
              v-for="p in filteredProducts"
              :key="p.id"
              class="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800/80 shadow-lg ring-1 ring-slate-900/5 transition-all hover:shadow-2xl hover:-translate-y-1"
            >
              <div
                class="absolute top-3 right-3 z-10 rounded-full bg-indigo-500 px-2.5 py-1 text-xs font-semibold text-white"
              >
                {{ p.brand }}
              </div>
              <div
                class="aspect-square w-full bg-slate-100 dark:bg-slate-700/50"
              >
                <img
                  :src="p.image"
                  :alt="p.name"
                  class="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div class="p-4">
                <h3
                  class="truncate text-base font-semibold text-slate-900 dark:text-slate-100"
                >
                  {{ p.name }}
                </h3>
                <p
                  class="mt-1 text-lg font-bold text-slate-800 dark:text-slate-50"
                >
                  ${{ p.price.toFixed(2) }}
                </p>
                <button
                  @click="showProductDetails(p)"
                  class="mt-3 w-full rounded-lg bg-indigo-600 py-2 text-sm font-semibold text-white transition-transform transform active:scale-95"
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          </div>

          <!-- Empty -->
          <div
            v-else
            class="flex flex-col items-center justify-center py-16 rounded-2xl bg-white dark:bg-slate-800/80 shadow-lg ring-1 ring-slate-900/5"
          >
            <svg
              class="h-16 w-16 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p class="mt-4 text-slate-500">Produk tidak ditemukan</p>
            <button
              @click="resetFilters"
              class="mt-2 text-sm font-medium text-indigo-500 hover:underline"
            >
              Reset filter
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- ========= FOOTER ========= -->
    <footer class="bg-slate-900 text-slate-300">
      <div class="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="col-span-2 md:col-span-1">
            <a href="#" class="flex items-center space-x-2">
              <svg
                class="h-7 w-7 text-indigo-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-.01L12 2z"
                />
              </svg>
              <span class="text-xl font-bold text-white">VueMobile</span>
            </a>
            <p class="mt-4 text-sm leading-relaxed">
              Toko smartphone terpercaya. Garansi resmi & harga terbaik.
            </p>
          </div>

          <div>
            <h3 class="font-semibold text-white">Tautan Cepat</h3>
            <ul class="mt-4 space-y-2 text-sm">
              <li><a href="#" class="hover:text-white">Tentang Kami</a></li>
              <li><a href="#" class="hover:text-white">Hubungi Kami</a></li>
              <li>
                <a href="#" class="hover:text-white">Kebijakan Privasi</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold text-white">Ikuti Kami</h3>
            <div class="mt-4 flex space-x-4">
              <a href="#" class="hover:text-white">Facebook</a>
              <a href="#" class="hover:text-white">Twitter</a>
              <a href="#" class="hover:text-white">Instagram</a>
            </div>
          </div>

          <div>
            <h3 class="font-semibold text-white">Newsletter</h3>
            <p class="mt-2 text-sm">Dapatkan promo & produk terbaru.</p>
            <form class="mt-3">
              <input
                type="email"
                placeholder="Email Anda"
                class="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
              />
            </form>
          </div>
        </div>

        <div class="mt-12 border-t border-slate-700 pt-6 text-center text-sm">
          &copy; {{ new Date().getFullYear() }} VueMobile. All rights reserved.
        </div>
      </div>
    </footer>

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

                  <!-- options -->
                  <div class="mt-6 space-y-4">
                    <div
                      v-for="(opts, key) in selectedProduct.options"
                      :key="key"
                    >
                      <label
                        class="block text-sm font-medium text-slate-700 dark:text-slate-200"
                      >
                        {{
                          key.charAt(0).toUpperCase() +
                          key.slice(1).replace(/([A-Z])/g, " $1")
                        }}
                      </label>
                      <select
                        v-model="selection[key]"
                        class="mt-1 block w-full rounded-md border-slate-300 bg-slate-50 dark:bg-slate-700 dark:border-slate-600 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        <option v-for="o in opts" :key="o" :value="o">
                          {{ o }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <!-- add to cart -->
                  <button
                    @click="
                      addToCart({
                        ...selectedProduct,
                        selectedOptions: { ...selection },
                      })
                    "
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
import { ref, computed, onMounted, nextTick, reactive, watch } from "vue";

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
const selection = reactive({});

/* ----------------------------------------------------------------- */
/*  MOCK DATA
/* -----------------------------------------------------------------*/
const getMockProducts = () => [
  {
    id: 1,
    name: "Galaxy S23 Ultra",
    brand: "Samsung",
    price: 1199.99,
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMDAwIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1zaXplPSIyMCIgZm9udC1mYW1pbHk9IkFyaWFsIj5HYWxheHkgUzIzPC90ZXh0Pgo8L3N2Zz4K",
    description:
      "Flagship terbaik dengan layar menakjubkan, sistem kamera pro, dan performa kuat.",
    options: {
      colors: ["Phantom Black", "Cream", "Green", "Lavender"],
      ram: ["8GB", "12GB"],
      storage: ["256GB", "512GB", "1TB"],
    },
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    brand: "Apple",
    price: 999,
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY3Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiBmaWxsPSIjMUQxRDFGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1zaXplPSIyMCIgZm9udC1mYW1pbHk9IkFyaWFsIj5pUGhvbmUgMTU8L3RleHQ+Cjwvc3ZnPgo=",
    description:
      "Rasakan kekuatan chip A17 Bionic dan layar Super Retina XDR yang indah.",
    options: {
      colors: [
        "Natural Titanium",
        "Blue Titanium",
        "White Titanium",
        "Black Titanium",
      ],
      ram: ["8GB"],
      storage: ["128GB", "256GB", "512GB", "1TB"],
    },
  },
  {
    id: 3,
    name: "Pixel 8 Pro",
    brand: "Google",
    price: 899,
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRTBFMEYwIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiBmaWxsPSIjNDI4NUY0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1zaXplPSIyMCIgZm9udC1mYW1pbHk9IkFyaWFsIj5QaXhlbCA4PC90ZXh0Pgo8L3N2Zz4K",
    description: "Smartphone terpintar dengan Google AI terintegrasi.",
    options: {
      colors: ["Obsidian", "Porcelain", "Bay"],
      ram: ["12GB"],
      storage: ["128GB", "256GB", "512GB"],
    },
  },
  {
    id: 4,
    name: "OnePlus 11",
    brand: "OnePlus",
    price: 699,
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMTAxMDEwIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiBmaWxsPSIjRUIwMDI4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1zaXplPSIyMCIgZm9udC1mYW1pbHk9IkFyaWFsIj5PbmVQbHVzIDExPC90ZXh0Pgo8L3N2Zz4K",
    description: "Performa super cepat bertemu dengan desain ramping.",
    options: {
      colors: ["Titan Black", "Eternal Green"],
      ram: ["8GB", "16GB"],
      storage: ["128GB", "256GB"],
    },
  },
];

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
    Object.keys(product.options).forEach((k) => {
      selection[k] = product.options[k][0];
    });
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
  const data = getMockProducts();
  products.value = data;
  brands.value = [...new Set(data.map((p) => p.brand))].sort();
  const prices = data.map((p) => p.price);
  priceRange.value.min = Math.floor(Math.min(...prices));
  priceRange.value.max = Math.ceil(Math.max(...prices));
  priceRange.value.current = priceRange.value.max;

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
