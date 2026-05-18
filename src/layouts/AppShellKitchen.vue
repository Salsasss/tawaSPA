<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useTheme } from "@/composables/useTheme.js";
import { useKitchenAuthStore } from "@/stores/kitchenAuth.js";
import logoUrl from "@/assets/logo.png";

const router = useRouter();
const { isDark, toggleTheme } = useTheme();
const auth = useKitchenAuthStore();

/* ── Live clock ── */
const now = ref(new Date());
let clockTimer = null;

onMounted(() => {
  clockTimer = setInterval(() => (now.value = new Date()), 1000);
});
onUnmounted(() => clearInterval(clockTimer));

const clockLabel = computed(() => {
  const h = String(now.value.getHours()).padStart(2, "0");
  const m = String(now.value.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
});

function handleLogout() {
  auth.logout();
  router.push("/kitchen/login");
}
</script>

<template>
  <div class="min-h-dvh flex flex-col bg-bg text-text">
    <!-- Subtle background blobs -->
    <div class="pointer-events-none fixed inset-0 -z-10">
      <div class="absolute -top-32 -right-40 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-500/10"></div>
      <div class="absolute -bottom-40 -left-40 h-72 w-72 rounded-full bg-rose-200/30 blur-3xl dark:bg-rose-500/10"></div>
    </div>

    <!-- ── Header ── -->
    <header class="flex-shrink-0 border-b border-border bg-surface/80 backdrop-blur">
      <div class="flex items-center justify-between px-5 py-3">
        <!-- Left: Brand -->
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-xl overflow-hidden bg-muted border border-border grid place-items-center shadow-sm">
            <img :src="logoUrl" alt="Logo" class="h-full w-full object-contain p-1" />
          </div>
          <div class="leading-tight">
            <div class="text-base font-extrabold tracking-wide">MARISCOS TAWA</div>
            <div class="text-[10px] text-text-muted tracking-[0.2em] uppercase">Kitchen Display System</div>
          </div>
        </div>

        <!-- Right: Clock + Theme toggle -->
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 shadow-sm">
            <span class="text-primary text-sm">●</span>
            <span class="text-sm font-mono font-bold text-text">{{ clockLabel }}</span>
          </div>
          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface shadow-sm hover:brightness-95 active:scale-[0.98] transition"
            :aria-label="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
            @click="toggleTheme"
          >
            <span class="text-lg leading-none">{{ isDark ? "☀️" : "🌙" }}</span>
          </button>
        </div>
      </div>
    </header>

    <!-- ── Main content ── -->
    <main class="flex-1 overflow-hidden p-4">
      <slot />
    </main>

    <!-- ── Footer ── -->
    <footer class="flex-shrink-0 border-t border-border bg-surface/60 backdrop-blur">
      <div class="flex items-center justify-between px-5 py-2 text-sm text-text-muted">
        <div class="flex items-center gap-4">
          <span>Estado del Servidor: <span class="text-success font-semibold">Conectado</span></span>
          <span>Versión: 2.4.0</span>
        </div>

        <div class="font-semibold uppercase tracking-wider text-text-muted/70">
          NOTA: LOS ALIMENTOS SE PREPARAN AL MOMENTO
        </div>

        <div class="flex items-center gap-4">
          <span v-if="auth.isAuthenticated">
            Usuario: <span class="font-semibold text-text">{{ auth.employeeName }}</span>
          </span>
          <button
            v-if="auth.isAuthenticated"
            class="text-primary font-semibold hover:underline transition"
            @click="handleLogout"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>
