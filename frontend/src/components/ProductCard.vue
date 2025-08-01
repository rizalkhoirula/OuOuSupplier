<!-- components/ProductCard.vue -->
<template>
  <div
    class="group relative rounded-2xl bg-white dark:bg-slate-800 shadow-lg ring-1 ring-slate-900/5 overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
  >
    <img
      :src="product.image"
      :alt="product.name"
      class="w-full h-48 object-cover transition-opacity group-hover:opacity-90"
      loading="lazy"
    />
    <div class="p-4">
      <h3
        class="text-lg font-semibold text-slate-800 dark:text-slate-100 truncate"
      >
        {{ product.name }}
      </h3>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
        {{ product.brand }}
      </p>
      <p class="text-lg font-bold text-indigo-600 dark:text-indigo-400 mt-2">
        ${{ product.price.toFixed(2) }}
      </p>
      <button
        @click="$emit('open', product)"
        class="mt-4 w-full rounded-md bg-indigo-600 text-white py-2 text-sm font-medium hover:bg-indigo-500 transition-colors"
        :aria-label="`View details for ${product.name}`"
      >
        View Details
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
});

defineEmits(["open"]);
</script>
