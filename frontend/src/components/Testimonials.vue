<template>
  <div class="bg-light py-12">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-primary mb-8">What Our Customers Say</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="testimonial in testimonials" :key="testimonial.name" class="bg-white p-6 rounded-lg shadow-lg slide-up">
          <p class="text-gray-600 italic mb-4">"{{ testimonial.quote }}"</p>
          <div class="flex items-center">
            <img :src="testimonial.avatar" :alt="testimonial.name" class="w-12 h-12 rounded-full mr-4">
            <div>
              <p class="font-bold text-primary">{{ testimonial.name }}</p>
              <p class="text-sm text-gray-500">{{ testimonial.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const testimonials = ref([
  { name: 'Sarah Johnson', title: 'Happy Customer', quote: 'Amazing service and the best prices! I found the perfect phone and it arrived the next day. Highly recommended!', avatar: 'https://i.pravatar.cc/150?img=1' },
  { name: 'Michael Chen', title: 'Tech Enthusiast', quote: 'As a tech lover, I appreciate the wide selection and detailed product information. This is my new go-to for all my gadgets.', avatar: 'https://i.pravatar.cc/150?img=2' },
  { name: 'Jessica Williams', title: 'Satisfied Shopper', quote: 'The website is so easy to use and looks beautiful. The checkout process was a breeze. I will definitely be back!', avatar: 'https://i.pravatar.cc/150?img=3' },
]);
</script>
