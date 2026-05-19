import { createRouter, createWebHistory } from "vue-router";
import { useKitchenAuthStore } from "@/stores/kitchenAuth.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/welcome" },

    // ── Consumer flow ──
    { path: "/welcome", name: "welcome", component: () => import("@/views/WelcomeView.vue") },
    { path: "/about", name: "about", component: () => import("@/views/AboutView.vue") },
    { path: "/menu", name: "menu", component: () => import("@/views/FoodMenuView.vue") },
    { path: "/summary", name: "summary", component: () => import("@/views/SummaryView.vue") },
    { path: "/payment", name: "payment", component: () => import("@/views/PaymentView.vue") },
    { path: "/end", name: "end", component: () => import("@/views/EndView.vue") },

    // ── Kitchen flow ──
    {
      path: "/kitchen/login",
      name: "kitchen-login",
      component: () => import("@/views/kitchen/KitchenLoginView.vue"),
    },
    {
      path: "/kitchen/display",
      name: "kitchen-display",
      component: () => import("@/views/kitchen/KitchenDisplayView.vue"),
      meta: { requiresKitchenAuth: true },
    },

    // opcional: 404 rápido
    { path: "/:pathMatch(.*)*", redirect: "/welcome" },
  ],
});

/* ── Navigation guard: Kitchen auth ── */
router.beforeEach((to) => {
  if (to.meta.requiresKitchenAuth) {
    const auth = useKitchenAuthStore();
    if (!auth.isAuthenticated) {
      return { name: "kitchen-login" };
    }
  }
});

export default router;
