<template>
  <div class="relative bg-primary overflow-hidden">
    <div class="container mx-auto px-4 py-24 lg:py-32">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div class="text-white z-10">
          <div class="slide-up">
            <h1 class="text-5xl md:text-7xl font-extrabold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              iPhone 15 Pro
            </h1>
            <p class="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
              The ultimate iPhone. A magical new way to interact with iPhone.
              Groundbreaking safety features. And an innovative 48MP camera for
              mind-blowing detail.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="btn-primary">
                Buy Now
              </a>
              <a href="#" class="bg-secondary text-white font-bold py-3 px-8 rounded-full hover:bg-secondary/80 transition-all duration-300 transform hover:scale-105">
                Learn More
              </a>
            </div>
          </div>
        </div>
        <div class="relative h-full flex items-center justify-center">
          <div class="absolute w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
          <img src="../assets/images/iphone.jpg" alt="iPhone 15 Pro" class="w-full h-auto max-w-md mx-auto transform lg:scale-125 fade-in z-10">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>