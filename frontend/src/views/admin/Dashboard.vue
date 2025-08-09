<template>
  <div class="flex h-screen bg-slate-100 dark:bg-slate-900">
    <Sidebar />
    <main class="flex-1 p-6 overflow-y-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Sidebar from "../../components/Sidebar.vue";
</script>
