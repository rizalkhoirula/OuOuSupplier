<template>
  <div class="bg-primary py-12">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-white mb-8">Featured Brands</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        <div v-for="brand in brands" :key="brand" class="flex justify-center items-center grayscale hover:grayscale-0 transition-all duration-300">
          <img :src="`https://logo.clearbit.com/${brand}.com`" :alt="brand" class="h-12">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const brands = ref(['apple', 'samsung', 'google', 'sony', 'dell', 'xiaomi']);
</script>
