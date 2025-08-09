<template>
  <div class="bg-white py-12">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">Shop by Category</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div v-for="category in categories" :key="category.name" class="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <img :src="category.image" :alt="category.name" class="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300">
          <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h3 class="text-white text-xl font-bold">{{ category.name }}</h3>
          </div>
          <a :href="category.link" class="absolute inset-0"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const categories = ref([
  { name: 'Smartphones', image: 'https://placehold.co/400x400/3498db/ffffff?text=Phones', link: '#' },
  { name: 'Laptops', image: 'https://placehold.co/400x400/2ecc71/ffffff?text=Laptops', link: '#' },
  { name: 'Tablets', image: 'https://placehold.co/400x400/e74c3c/ffffff?text=Tablets', link: '#' },
  { name: 'Headphones', image: 'https://placehold.co/400x400/f39c12/ffffff?text=Audio', link: '#' },
  { name: 'Accessories', image: 'https://placehold.co/400x400/9b59b6/ffffff?text=Accessories', link: '#' },
]);
</script>
