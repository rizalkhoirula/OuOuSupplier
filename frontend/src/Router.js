import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";

import LandingPage from "./views/LandingPage.vue";
import AdminLogin from "./views/admin/Login.vue";
import AdminDashboard from "./views/admin/Dashboard.vue";
import Home from "./views/admin/Home.vue";
import Product from "./views/admin/Product.vue";
import Category from "./views/admin/Category.vue";
import Review from "./views/admin/Review.vue";

const routes = [
  { path: "/", component: LandingPage },

  {
    path: "/admin/login",
    component: AdminLogin,
  },

  {
    path: "/admin",
    component: AdminDashboard,
    meta: { requiresAuth: true },
    children: [
      { path: "", component: Home },
      { path: "product", component: Product },
      { path: "category", component: Category },
      { path: "review", component: Review },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (!requiresAuth) {
    return next();
  }

  try {
    // Call backend to verify auth; HttpOnly cookie sent automatically
    await axios.get("http://localhost:5000/api/users/me", {
      withCredentials: true,
    });
    // Authenticated
    if (to.path === "/admin/login") {
      return next("/admin"); // Prevent visiting login if already logged in
    }
    next();
  } catch (error) {
    // Not authenticated
    if (to.path !== "/admin/login") {
      return next("/admin/login");
    }
    next();
  }
});

export default router;
