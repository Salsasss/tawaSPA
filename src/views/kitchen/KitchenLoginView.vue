<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useKitchenAuthStore } from "@/stores/kitchenAuth.js";

const router = useRouter();
const auth = useKitchenAuthStore();

const employeeId = ref("");
const password = ref("");
const isLoading = ref(false);

async function handleLogin() {
  isLoading.value = true;
  const ok = await auth.login(employeeId.value, password.value);
  isLoading.value = false;
  if (ok) {
    router.push("/kitchen/display");
  }
}
</script>

<template>
  <div class="relative min-h-dvh flex items-center justify-center bg-bg text-text p-4">
    <!-- Botón Volver al Inicio -->
    <button
      type="button"
      class="fixed top-6 left-6 z-50 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-md transition hover:bg-slate-50 hover:scale-105 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
      @click="router.push('/welcome')"
    >
      ← Volver al Inicio
    </button>

    <!-- Background blobs -->
    <div class="pointer-events-none fixed inset-0 -z-10">
      <div class="absolute -top-32 -right-40 h-80 w-80 rounded-full bg-blue-200/50 blur-3xl dark:bg-blue-500/15"></div>
      <div class="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-rose-200/50 blur-3xl dark:bg-rose-500/15"></div>
      <div class="absolute left-0 right-0 top-0 h-48 bg-linear-to-b from-blue-100/40 to-transparent dark:from-blue-500/5"></div>
    </div>

    <!-- Login Card -->
    <div
      class="relative w-full max-w-[880px] rounded-3xl border border-border bg-surface
             shadow-[0_20px_60px_rgba(0,0,0,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.40)]
             backdrop-blur overflow-hidden"
    >
      <div class="grid md:grid-cols-2">
        <!-- ── Left: Form ── -->
        <div class="px-8 py-10 md:px-10 md:py-12">
          <!-- Title -->
          <h1 class="text-3xl font-extrabold text-primary">¡Hola!</h1>
          <p class="mt-1 text-sm text-text-muted">Bienvenido al portal de empleados.</p>

          <form class="mt-8 space-y-5" @submit.prevent="handleLogin">
            <!-- Employee ID -->
            <div>
              <label for="employee-id" class="block text-sm font-semibold text-text mb-1.5">
                ID de Empleado
              </label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"/>
                  </svg>
                </span>
                <input
                  id="employee-id"
                  v-model="employeeId"
                  type="text"
                  autocomplete="username"
                  placeholder="ej. EMP-001"
                  class="w-full rounded-xl border border-border bg-bg pl-10 pr-4 py-3 text-sm
                         outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>
            </div>

            <!-- Password -->
            <div>
              <label for="employee-pass" class="block text-sm font-semibold text-text mb-1.5">
                Contraseña
              </label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                  </svg>
                </span>
                <input
                  id="employee-pass"
                  v-model="password"
                  type="password"
                  autocomplete="current-password"
                  placeholder="••••••••"
                  class="w-full rounded-xl border border-border bg-bg pl-10 pr-4 py-3 text-sm
                         outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>
            </div>

            <!-- Error message -->
            <p
              v-if="auth.loginError"
              class="text-xs text-danger font-medium flex items-center gap-1"
            >
              <span>⚠</span> {{ auth.loginError }}
            </p>

            <!-- Submit -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full rounded-xl bg-accent py-3.5 text-sm font-bold text-white
                     shadow-sm transition hover:brightness-110 active:scale-[0.99]
                     disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span v-if="isLoading" class="inline-flex items-center gap-2">
                <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                </svg>
                Ingresando…
              </span>
              <span v-else>Ingresar</span>
            </button>
          </form>

          <!-- Support link -->
          <div class="mt-8 pt-5 border-t border-border text-center text-xs text-text-muted">
            ¿Problemas para acceder?
            <button class="text-accent font-semibold hover:underline ml-1">Contactar Soporte</button>
          </div>
        </div>

        <!-- ── Right: Branding ── -->
        <div class="relative hidden md:flex flex-col items-center justify-center bg-bg/50 px-8 py-10">
          <!-- Decorative blobs -->
          <div class="absolute top-6 right-8 h-28 w-28 rounded-full bg-rose-300/40 blur-2xl dark:bg-rose-500/15"></div>
          <div class="absolute bottom-12 left-6 h-20 w-20 rounded-full bg-blue-300/30 blur-2xl dark:bg-blue-500/10"></div>

          <!-- Circular image -->
          <div class="relative">
            <div
              class="h-44 w-44 rounded-full border-4 border-white dark:border-gray-700
                     shadow-xl overflow-hidden bg-muted"
            >
              <img
                src="/logo.png"
                alt="Mariscos Tawa"
                class="h-full w-full object-cover"
              />
            </div>
          </div>

          <!-- Brand text -->
          <div class="mt-6 text-center">
            <div class="text-xl font-extrabold tracking-wider text-text">
              MARISCOS "TAWA"
            </div>
            <div class="mt-1 text-sm font-bold tracking-wider text-accent">
              MENÚ & COCINA
            </div>
          </div>

          <!-- Schedule badge -->
          <div
            class="mt-5 inline-flex items-center gap-2 rounded-full border border-border
                   bg-surface/80 px-5 py-2.5 text-xs font-medium text-text-muted shadow-sm"
          >
            <span>🕘</span>
            <span>Horario: 9:00 am - 6:00 pm</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
