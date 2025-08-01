<template>
  <nav class="sidebar">
    <ul>
      <li><router-link to="/admin">Home</router-link></li>
      <li><router-link to="/admin/product">Product</router-link></li>
      <li><router-link to="/admin/category">Category</router-link></li>
      <li><router-link to="/admin/review">Review</router-link></li>
      <li><a href="#" @click.prevent="logout">Logout</a></li>
    </ul>
  </nav>
</template>

<script setup>
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

const router = useRouter();

function logout() {
  Cookies.remove("token");
  router.push("/admin/login");
}
</script>

<style scoped>
.sidebar {
  width: 200px;
  background: #333;
  color: white;
  padding: 20px;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  margin: 15px 0;
}
.sidebar a {
  color: white;
  text-decoration: none;
}
.sidebar a.router-link-active {
  font-weight: bold;
}
</style>
