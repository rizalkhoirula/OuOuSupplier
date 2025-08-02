<template>
  <div
    class="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800/80 shadow-lg ring-1 ring-slate-900/5 transition-all hover:shadow-2xl hover:-translate-y-1"
  >
    <div
      class="absolute top-3 right-3 z-10 rounded-full bg-indigo-500 px-2.5 py-1 text-xs font-semibold text-white"
    >
      {{ product.brand }}
    </div>
    <div class="aspect-square w-full bg-slate-100 dark:bg-slate-700/50">
      <img
        :src="product.image"
        :alt="product.name"
        class="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div class="p-4">
      <h3
        class="truncate text-base font-semibold text-slate-900 dark:text-slate-100"
      >
        {{ product.name }}
      </h3>
      <p class="mt-1 text-lg font-bold text-slate-800 dark:text-slate-50">
        ${{ product.price.toFixed(2) }}
      </p>
      <button
        @click="$emit('open', product)"
        class="mt-3 w-full rounded-lg bg-indigo-600 py-2 text-sm font-semibold text-white transition-transform transform active:scale-95"
      >
        Lihat Detail
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

defineEmits(['open']);
</script>
