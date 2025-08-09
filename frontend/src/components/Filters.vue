<template>
  <div class="bg-white p-6 rounded-xl shadow-lg sticky top-28">
    <h3 class="text-2xl font-bold mb-6 text-primary">Filters</h3>
    
    <!-- Category Filter -->
    <div class="mb-6">
      <h4 class="font-bold text-lg mb-3 text-secondary">Category</h4>
      <ul class="space-y-2">
        <li><a href="#" class="text-gray-600 hover:text-accent transition-colors font-medium">Smartphones</a></li>
        <li><a href="#" class="text-gray-600 hover:text-accent transition-colors font-medium">Laptops</a></li>
        <li><a href="#" class="text-gray-600 hover:text-accent transition-colors font-medium">Tablets</a></li>
        <li><a href="#" class="text-gray-600 hover:text-accent transition-colors font-medium">Headphones</a></li>
        <li><a href="#" class="text-gray-600 hover:text-accent transition-colors font-medium">Accessories</a></li>
      </ul>
    </div>

    <!-- Price Range Filter -->
    <div class="mb-6">
      <h4 class="font-bold text-lg mb-3 text-secondary">Price Range</h4>
      <input type="range" min="0" max="2000" value="1000" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider">
      <div class="flex justify-between text-sm text-gray-600 mt-2 font-medium">
        <span>$0</span>
        <span>$2000</span>
      </div>
    </div>

    <!-- Brand Filter -->
    <div>
      <h4 class="font-bold text-lg mb-3 text-secondary">Brand</h4>
      <ul class="space-y-3">
        <li><label class="flex items-center custom-checkbox"><input type="checkbox" class="mr-3"> Apple</label></li>
        <li><label class="flex items-center custom-checkbox"><input type="checkbox" class="mr-3"> Samsung</label></li>
        <li><label class="flex items-center custom-checkbox"><input type="checkbox" class="mr-3"> Google</label></li>
        <li><label class="flex items-center custom-checkbox"><input type="checkbox" class="mr-3"> Sony</label></li>
        <li><label class="flex items-center custom-checkbox"><input type="checkbox" class="mr-3"> Xiaomi</label></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #3498db;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
}

.range-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #3498db;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
}

.custom-checkbox input[type="checkbox"] {
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 0.15em;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
  cursor: pointer;
}

.custom-checkbox input[type="checkbox"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em #3498db;
  transform-origin: bottom left;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}

.custom-checkbox input[type="checkbox"]:checked::before {
  transform: scale(1);
}
</style>
