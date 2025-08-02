<template>
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
            v-model.trim="searchModel"
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
          @click="$emit('toggleDark')"
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
          @click="$emit('toggleCartSidebar')"
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
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  isDark: Boolean,
  cart: Array,
  searchQuery: String,
});

const emit = defineEmits(['update:searchQuery', 'toggleDark', 'toggleCartSidebar']);

const searchModel = computed({
  get: () => props.searchQuery,
  set: (value) => emit('update:searchQuery', value)
});
</script>
