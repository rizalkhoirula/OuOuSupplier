<template>
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
              v-model="selectedBrandsModel"
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
          v-model.number="priceRangeModel"
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
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  brands: Array,
  selectedBrands: Array,
  priceRange: Object,
});

const emit = defineEmits(['update:selectedBrands', 'update:priceRange']);

const selectedBrandsModel = computed({
  get: () => props.selectedBrands,
  set: (value) => emit('update:selectedBrands', value),
});

const priceRangeModel = computed({
  get: () => props.priceRange.current,
  set: (value) => {
    const newPriceRange = { ...props.priceRange, current: value };
    emit('update:priceRange', newPriceRange);
  }
});
</script>
