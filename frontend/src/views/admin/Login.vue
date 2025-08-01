<template>
  <div class="login-container">
    <h2>Admin Login</h2>
    <form @submit.prevent="login" class="login-form">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
        autocomplete="username"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
        autocomplete="current-password"
      />
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error-msg">{{ error }}</p>
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
      "http://localhost:5000/api/users/login",
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

<style scoped>
.login-container {
  max-width: 400px;
  margin: 80px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 24px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.login-form input {
  padding: 12px 10px;
  margin-bottom: 16px;
  font-size: 16px;
  border: 1px solid #bbb;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
}

.login-form input:focus {
  border-color: #409eff;
}

.login-form button {
  padding: 12px;
  background-color: #409eff;
  border: none;
  color: white;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-form button:hover {
  background-color: #66b1ff;
}

.error-msg {
  margin-top: 10px;
  color: #f56c6c;
  text-align: center;
}
</style>
