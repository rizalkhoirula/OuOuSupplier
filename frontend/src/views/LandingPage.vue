<template>
  <div>
    <Hero />
    <FeaturedBrands />
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div class="lg:col-span-1">
          <Filters />
        </div>
        <div class="lg:col-span-3">
          <ProductList />
        </div>
      </div>
    </div>
    <Testimonials />
    <Promotions />
  </div>
</template>

<script setup>
import Hero from '../components/Hero.vue';
import FeaturedBrands from '../components/FeaturedBrands.vue';
import Filters from '../components/Filters.vue';
import ProductList from '../components/ProductList.vue';
import Testimonials from '../components/Testimonials.vue';
import Promotions from '../components/Promotions.vue';
</script>