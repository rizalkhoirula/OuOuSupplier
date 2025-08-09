<template>
  <div class="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-slate-800">
      <h2 class="text-2xl font-bold text-center text-slate-900 dark:text-white">Admin Login</h2>
      <form @submit.prevent="login" class="space-y-6">
        <div>
          <label for="email" class="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
          <input
            v-model="email"
            id="email"
            type="email"
            placeholder="Email"
            required
            autocomplete="username"
            class="w-full px-3 py-2 mt-1 text-slate-900 bg-slate-50 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
          />
        </div>
        <div>
          <label for="password" class="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
          <input
            v-model="password"
            id="password"
            type="password"
            placeholder="Password"
            required
            autocomplete="current-password"
            class="w-full px-3 py-2 mt-1 text-slate-900 bg-slate-50 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
          />
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>
      <p v-if="error" class="mt-4 text-sm text-center text-red-600 dark:text-red-400">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

async function login() {
  console.log("login function called");
  error.value = "";
  if (!email.value || !password.value) {
    error.value = "Email and password required";
    return;
  }
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/login`,
      {
        email: email.value,
        password: password.value,
      },
      {
        withCredentials: true, // IMPORTANT: allow cookies from backend
      }
    );
    console.log("response:", response);

    if (response.data.message === "Login successful") {
      router.push("/admin");
    } else {
      error.value = "Login failed";
    }
  } catch (err) {
    console.error("login error:", err);
    if (err.response && err.response.data && err.response.data.message) {
      error.value = err.response.data.message;
    } else {
      error.value = "Login failed. Please try again.";
    }
  }
}
</script>


