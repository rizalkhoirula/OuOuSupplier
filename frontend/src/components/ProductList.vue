<template>
  <div class="lg:w-3/4">
    <div
      class="mb-6 flex items-center justify-between rounded-2xl bg-white dark:bg-slate-800/80 px-4 py-3 shadow-lg ring-1 ring-slate-900/5"
    >
      <p class="text-sm text-slate-600 dark:text-slate-400">
        {{ products.length }} produk ditemukan
      </p>
      <select
        :value="sortBy"
        @change="$emit('update:sortBy', $event.target.value)"
        class="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="default">Urutan Default</option>
        <option value="price-asc">Harga: Rendah → Tinggi</option>
        <option value="price-desc">Harga: Tinggi → Rendah</option>
      </select>
    </div>

    <!-- Grid -->
    <div
      v-if="products.length"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
    >
      <ProductCard
        v-for="p in products"
        :key="p.id"
        :product="p"
        @open="$emit('showProductDetails', p)"
      />
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
        @click="$emit('resetFilters')"
        class="mt-2 text-sm font-medium text-indigo-500 hover:underline"
      >
        Reset filter
      </button>
    </div>
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue';

defineProps({
  products: Array,
  sortBy: String,
});

defineEmits(['update:sortBy', 'showProductDetails', 'resetFilters']);
</script>
