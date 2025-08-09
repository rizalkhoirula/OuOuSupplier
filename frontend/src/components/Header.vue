<template>
  <header
    class="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl sticky top-0 z-50 border-b border-slate-700/50"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 lg:h-18">
        <!-- Left Side: Logo & Desktop Nav -->
        <div class="flex items-center space-x-6 lg:space-x-8">
          <!-- Logo -->
          <a
            href="#"
            class="text-2xl lg:text-3xl font-bold text-white tracking-wider hover:text-blue-400 transition-colors duration-300"
          >
            <span
              class="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            >
              OuOu
            </span>
          </a>

          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a
              href="#"
              class="text-gray-300 hover:text-white font-medium transition-colors duration-200 relative group"
            >
              Home
              <span
                class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"
              ></span>
            </a>
            <a
              href="#"
              class="text-gray-300 hover:text-white font-medium transition-colors duration-200 relative group"
            >
              Deals
              <span
                class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"
              ></span>
            </a>
            <a
              href="#"
              class="text-gray-300 hover:text-white font-medium transition-colors duration-200 relative group"
            >
              New Arrivals
              <span
                class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"
              ></span>
            </a>
            <a
              href="#"
              class="text-gray-300 hover:text-white font-medium transition-colors duration-200 relative group"
            >
              Categories
              <span
                class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"
              ></span>
            </a>
          </nav>
        </div>

        <!-- Right Side: Search & Icons -->
        <div class="flex items-center space-x-3 lg:space-x-4">
          <!-- Search (Desktop) -->
          <div class="hidden md:flex items-center relative">
            <input
              type="text"
              class="w-40 lg:w-56 xl:w-64 px-4 py-2.5 bg-slate-800/70 border border-slate-600 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 focus:w-48 lg:focus:w-64 xl:focus:w-72 backdrop-blur-sm"
              placeholder="Search products..."
            />
            <button
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          <!-- Action Icons -->
          <div class="flex items-center space-x-2 lg:space-x-3">
            <!-- Wishlist (Desktop) -->
            <a
              href="#"
              class="hidden lg:flex p-2 text-gray-300 hover:text-red-400 hover:bg-slate-800/50 rounded-lg transition-all duration-200 group"
            >
              <svg
                class="w-5 h-5 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </a>

            <!-- User Account -->
            <a
              href="#"
              class="p-2 text-gray-300 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg transition-all duration-200 group"
            >
              <svg
                class="w-5 h-5 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </a>

            <!-- Shopping Cart -->
            <a
              href="#"
              class="relative p-2 text-gray-300 hover:text-green-400 hover:bg-slate-800/50 rounded-lg transition-all duration-200 group"
            >
              <svg
                class="w-5 h-5 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span
                class="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-slate-900 shadow-lg animate-pulse"
              >
                3
              </span>
            </a>

            <!-- Mobile Search Button -->
            <button
              class="md:hidden p-2 text-gray-300 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg transition-all duration-200"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <!-- Hamburger Menu (Mobile) -->
            <button
              @click="isSidebarOpen = true"
              class="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200 group"
            >
              <svg
                class="w-5 h-5 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Sidebar -->
    <MobileSidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />
  </header>
</template>

<script setup>
import { ref } from "vue";
import MobileSidebar from "./MobileSidebar.vue";

const isSidebarOpen = ref(false);
</script>
