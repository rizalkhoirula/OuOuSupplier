<!-- components/ProductModal.vue -->
<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    leave-active-class="transition duration-300 ease-in"
    enter-from-class="opacity-0 scale-95"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      @click.self="close"
    >
      <div
        class="relative max-w-2xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto"
      >
        <button
          @click="close"
          class="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          aria-label="Close modal"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-64 object-cover rounded-lg mb-4"
          loading="lazy"
        />
        <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100">
          {{ product.name }}
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {{ product.brand }}
        </p>
        <p class="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">
          ${{ product.price.toFixed(2) }}
        </p>
        <p class="text-sm text-slate-600 dark:text-slate-400 mt-4">
          {{ product.description }}
        </p>
        <!-- Options -->
        <div class="mt-6">
          <h3 class="font-semibold text-sm text-slate-700 dark:text-slate-300">
            Options
          </h3>
          <div class="mt-2 space-y-4">
            <div>
              <label
                class="text-sm font-medium text-slate-700 dark:text-slate-300"
                >Color</label
              >
              <select
                v-model="selectedOptions.color"
                class="mt-1 w-full rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                aria-label="Select color"
              >
                <option
                  v-for="color in product.options.colors"
                  :key="color"
                  :value="color"
                >
                  {{ color }}
                </option>
              </select>
            </div>
            <div>
              <label
                class="text-sm font-medium text-slate-700 dark:text-slate-300"
                >RAM</label
              >
              <select
                v-model="selectedOptions.ram"
                class="mt-1 w-full rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                aria-label="Select RAM"
              >
                <option
                  v-for="ram in product.options.ram"
                  :key="ram"
                  :value="ram"
                >
                  {{ ram }}
                </option>
              </select>
            </div>
            <div>
              <label
                class="text-sm font-medium text-slate-700 dark:text-slate-300"
                >Storage</label
              >
              <select
                v-model="selectedOptions.storage"
                class="mt-1 w-full rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                aria-label="Select storage"
              >
                <option
                  v-for="storage in product.options.storage"
                  :key="storage"
                  :value="storage"
                >
                  {{ storage }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <button
          @click="$emit('add', { ...product, options: selectedOptions })"
          class="mt-6 w-full rounded-md bg-indigo-600 text-white py-2 text-sm font-medium hover:bg-indigo-500 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  product: {
    type: Object,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["close", "add"]);

const selectedOptions = ref({
  color: "",
  ram: "",
  storage: "",
});

// Initialize default options
const initOptions = () => {
  selectedOptions.value.color = props.product.options.colors[0] || "";
  selectedOptions.value.ram = props.product.options.ram[0] || "";
  selectedOptions.value.storage = props.product.options.storage[0] || "";
};

// Reset options when product changes
watch(
  () => props.product,
  () => {
    initOptions();
  },
  { immediate: true }
);
</script>
