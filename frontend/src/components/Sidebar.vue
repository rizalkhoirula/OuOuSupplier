<template>
  <aside class="w-64 bg-white dark:bg-slate-800 shadow-md">
    <div class="p-6">
      <h2 class="text-xl font-bold text-slate-900 dark:text-white">Admin Menu</h2>
    </div>
    <nav class="px-4">
      <ul>
        <li>
          <router-link to="/admin" class="flex items-center px-2 py-3 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700" active-class="bg-slate-200 dark:bg-slate-700 font-bold">
            Home
          </router-link>
        </li>
        <li>
          <router-link to="/admin/product" class="flex items-center px-2 py-3 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700" active-class="bg-slate-200 dark:bg-slate-700 font-bold">
            Product
          </router-link>
        </li>
        <li>
          <router-link to="/admin/category" class="flex items-center px-2 py-3 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700" active-class="bg-slate-200 dark:bg-slate-700 font-bold">
            Category
          </router-link>
        </li>
        <li>
          <router-link to="/admin/review" class="flex items-center px-2 py-3 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700" active-class="bg-slate-200 dark:bg-slate-700 font-bold">
            Review
          </router-link>
        </li>
      </ul>
      <div class="absolute bottom-0 w-full p-4">
        <a href="#" @click.prevent="logout" class="flex items-center px-2 py-3 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700">
          Logout
        </a>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
import axios from 'axios';

const router = useRouter();

async function logout() {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/users/logout`, {}, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    Cookies.remove("token"); // This might be redundant if backend clears cookie
    router.push("/admin/login");
  }
}
</script>
