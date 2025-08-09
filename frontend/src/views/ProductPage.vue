<template>
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Product Image Gallery -->
      <div>
        <img :src="product.image" :alt="product.name" class="w-full rounded-lg shadow-md">
        <div class="grid grid-cols-4 gap-2 mt-4">
          <img v-for="i in 4" :key="i" :src="product.image" class="w-full rounded-lg cursor-pointer border-2 border-transparent hover:border-blue-500">
        </div>
      </div>

      <!-- Product Details -->
      <div>
        <h1 class="text-3xl font-bold mb-2">{{ product.name }}</h1>
        <div class="flex items-center mb-4">
          <div class="flex text-yellow-400">
            <svg v-for="i in 5" :key="i" class="w-5 h-5 fill-current" :class="{ 'text-gray-300': i > product.rating }">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.445a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.366-2.445a1 1 0 00-1.175 0l-3.366 2.445c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
            </svg>
          </div>
          <span class="text-sm text-gray-500 ml-2">({{ product.reviews }} reviews)</span>
        </div>
        <p class="text-gray-600 mb-4">{{ product.description }}</p>
        <div class="text-3xl font-bold mb-4">
          <span>${{ product.price }}</span>
          <span v-if="product.oldPrice" class="text-xl text-gray-500 line-through ml-2">${{ product.oldPrice }}</span>
        </div>
        <div class="flex items-center mb-6">
          <label for="quantity" class="mr-4">Quantity:</label>
          <input type="number" id="quantity" value="1" min="1" class="w-20 px-2 py-1 border border-gray-300 rounded-md">
        </div>
        <button class="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const productId = route.params.id;

// In a real app, you would fetch this data from an API
const product = ref({
  id: productId,
  name: 'Sample Product Name',
  description: 'This is a detailed description of the product, highlighting its key features, benefits, and specifications. It is designed to give the customer all the information they need to make a purchase decision.',
  price: 1199,
  oldPrice: 1299,
  rating: 5,
  reviews: 142,
  image: `https://placehold.co/600x600/3498db/ffffff?text=Product+${productId}`
});
</script>