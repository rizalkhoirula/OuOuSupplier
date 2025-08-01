<template>
  <div class="dashboard">
    <Sidebar />
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Sidebar from "../../components/Sidebar.vue";
</script>

<style>
.dashboard {
  display: flex;
  height: 100vh;
}
.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
