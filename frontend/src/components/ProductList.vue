<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Featured Products</h2>
      <div class="flex items-center space-x-2">
        <label for="sort" class="text-sm">Sort by:</label>
        <select id="sort" class="border border-gray-300 rounded-md px-2 py-1 text-sm">
          <option>Best Match</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest Arrivals</option>
        </select>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProductCard from './ProductCard.vue';

const products = ref([
  { id: 1, name: 'iPhone 15 Pro Max', category: 'Smartphones', price: 1199, oldPrice: 1299, rating: 5, reviews: 142, isNew: true, image: 'https://placehold.co/600x600/3498db/ffffff?text=iPhone+15' },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', category: 'Smartphones', price: 1099, rating: 4, reviews: 98, isNew: true, image: 'https://placehold.co/600x600/2ecc71/ffffff?text=Galaxy+S24' },
  { id: 3, name: 'Google Pixel 9 Pro', category: 'Smartphones', price: 999, rating: 5, reviews: 77, isNew: true, image: 'https://placehold.co/600x600/e74c3c/ffffff?text=Pixel+9' },
  { id: 4, name: 'Sony WH-1000XM5 Headphones', category: 'Audio', price: 399, oldPrice: 449, rating: 5, reviews: 210, isNew: false, image: 'https://placehold.co/600x600/f39c12/ffffff?text=Sony+XM5' },
  { id: 5, name: 'Apple MacBook Air M3', category: 'Laptops', price: 1299, rating: 5, reviews: 180, isNew: false, image: 'https://placehold.co/600x600/9b59b6/ffffff?text=MacBook+Air' },
  { id: 6, name: 'Dell XPS 15', category: 'Laptops', price: 1499, rating: 4, reviews: 150, isNew: false, image: 'https://placehold.co/600x600/34495e/ffffff?text=Dell+XPS' },
  { id: 7, name: 'Apple iPad Pro', category: 'Tablets', price: 799, rating: 5, reviews: 320, isNew: false, image: 'https://placehold.co/600x600/1abc9c/ffffff?text=iPad+Pro' },
  { id: 8, name: 'Samsung Galaxy Tab S9', category: 'Tablets', price: 699, rating: 4, reviews: 112, isNew: false, image: 'https://placehold.co/600x600/7f8c8d/ffffff?text=Tab+S9' },
]);
</script>
