<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const developers = [
  {
    name: "Aarón Salas Chávez",
    id: "22020795",
    initials: "AS",
    gradient: "from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500",
  },
  {
    name: "Jesús Abraham Vargas Armijo",
    id: "22020826",
    initials: "JV",
    gradient: "from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500",
  },
  {
    name: "Luis Daniel Morales Villarauz",
    id: "22020790",
    initials: "LM",
    gradient: "from-rose-500 to-pink-600 dark:from-rose-400 dark:to-pink-500",
  },
  {
    name: "Roberto De Jesus Gil Huesca",
    id: "22020787",
    initials: "RG",
    gradient: "from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500",
  },
];
</script>

<template>
  <section class="relative min-h-[calc(100vh-12rem)] flex flex-col justify-center py-6 md:py-12">
    <!-- Back Button -->
    <div class="mb-8 self-start">
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-text shadow-sm transition hover:bg-muted hover:scale-105 active:scale-95"
        @click="router.push('/welcome')"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Volver al inicio</span>
      </button>
    </div>

    <!-- Header Section -->
    <div class="text-center mb-12">
      <span class="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent tracking-wide uppercase">
        🎓 Programación Web
      </span>
      <h1 class="mt-4 text-3xl md:text-5xl font-black tracking-tight text-text">
        Sobre Nosotros
      </h1>
      <p class="mt-3 max-w-2xl mx-auto text-base text-text-muted">
        Conoce a los integrantes y desarrolladores que hicieron posible el sitio web de
        <span class="font-semibold text-primary">Mariscos Tawa</span>.
      </p>
    </div>

    <!-- Developers Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      <div
        v-for="dev in developers"
        :key="dev.id"
        class="card group relative overflow-hidden p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-accent/40"
      >
        <!-- Background radial glow on hover -->
        <div class="absolute -inset-px bg-radial from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        <!-- Initial Avatar with custom gradient -->
        <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br shadow-inner transition-transform duration-500 group-hover:scale-110" :class="dev.gradient">
          <span class="text-2xl font-black text-white tracking-wider">
            {{ dev.initials }}
          </span>
        </div>

        <!-- Developer Info -->
        <div class="relative z-10">
          <h3 class="text-lg font-bold text-text transition-colors duration-300 group-hover:text-accent">
            {{ dev.name }}
          </h3>
          
          <div class="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1 text-xs font-mono font-semibold text-text-muted border border-border/60 transition-colors duration-300 group-hover:bg-accent/5 group-hover:text-accent group-hover:border-accent/20">
            <span>Matrícula:</span>
            <span>{{ dev.id }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Card overlay styling for glossy modern look */
.card {
  backdrop-filter: blur(8px);
}
</style>
