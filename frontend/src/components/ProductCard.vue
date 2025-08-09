<template>
  <router-link :to="`/product/${product.id}`" class="card group">
    <div class="relative overflow-hidden">
      <img :src="product.image" :alt="product.name" class="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out">
      <div class="absolute top-0 left-0 w-full h-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <span v-if="product.isNew" class="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">NEW</span>
      <div class="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
        <button class="w-full btn-primary">
          Add to Cart
        </button>
      </div>
    </div>
    <div class="p-4">
      <p class="text-sm text-gray-500 mb-1">{{ product.category }}</p>
      <h3 class="text-lg font-bold text-primary truncate">{{ product.name }}</h3>
       <div class="flex justify-between items-center mt-2">
        <div class="text-xl font-extrabold text-primary">${{ product.price }}
          <span v-if="product.oldPrice" class="text-sm text-gray-500 line-through ml-1">${{ product.oldPrice }}</span>
        </div>
        <div class="flex text-yellow-400">
          <svg v-for="i in 5" :key="i" class="w-5 h-5 fill-current" :class="{ 'text-gray-300': i > product.rating }">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.445a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.366-2.445a1 1 0 00-1.175 0l-3.366 2.445c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
          </svg>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
});
</script>
