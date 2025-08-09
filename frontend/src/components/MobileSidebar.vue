<template>
  <div
    :class="['fixed top-0 right-0 h-full w-64 bg-primary shadow-lg transform transition-transform duration-300 ease-in-out z-50', isOpen ? 'translate-x-0' : 'translate-x-full']"
  >
    <div class="p-4">
      <button @click="$emit('close')" class="text-light mb-4">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
      <nav class="flex flex-col space-y-4">
        <a href="#" class="text-light hover:text-accent font-semibold py-2">Home</a>
        <a href="#" class="text-light hover:text-accent font-semibold py-2">Deals</a>
        <a href="#" class="text-light hover:text-accent font-semibold py-2">New Arrivals</a>
        <a href="#" class="text-light hover:text-accent font-semibold py-2">Categories</a>
        <a href="#" class="text-light hover:text-accent font-semibold py-2">Contact Us</a>
      </nav>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
});
defineEmits(['close']);
</script>
