<script setup>
import { useRouter } from "vue-router";
import { useOrderStore } from "@/stores/order";

import BrandHeader from "@/components/brand/BrandHeader.vue";
import FooterInfoBar from "@/components/shared/FooterInfoBar.vue";
import OrderTypeGrid from "@/components/welcome/OrderTypeGrid.vue";

const router = useRouter();
const order = useOrderStore();

function handleSelect(type) {
  order.setOrderType(type);
  router.push("/menu");
}
</script>

<template>
  <section class="relative min-h-[calc(100vh-2rem)] overflow-hidden">

    <!-- Employee access button (bottom-left) -->
    <button
      type="button"
      class="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-md transition hover:bg-slate-50 hover:scale-105 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
      aria-label="Acceso empleados"
      @click="router.push('/kitchen/login')"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
      </svg>
      <span>Acceso Staff</span>
    </button>

    <!-- "Sobre nosotros" button (bottom-right) -->
    <button
      type="button"
      class="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-md transition hover:bg-slate-50 hover:scale-105 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
      aria-label="Sobre nosotros"
      @click="router.push('/about')"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="h-4.5 w-4.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
      <span>Sobre nosotros</span>
    </button>

    <!-- Content wrapper -->
    <div class="relative mx-auto max-w-5xl px-4 py-8">
      <!-- Main card/surface -->
      <div
          class="relative rounded-3xl border border-border bg-white/80 dark:bg-black/20
               shadow-[0_16px_60px_rgba(0,0,0,0.10)] backdrop-blur
               px-6 md:px-10 py-10"
      >

        <!-- Header pill -->
        <div class="flex justify-center">
          <div
              class="inline-flex items-center gap-3 rounded-full border border-border
                   bg-white/90 dark:bg-black/30 backdrop-blur
                   px-6 py-3 shadow-sm"
          >
            <BrandHeader />
          </div>
        </div>

        <!-- Question -->
        <div class="mt-14 text-center">
          <h1 class="text-2xl md:text-3xl font-extrabold text-text">
            ¿Dónde desea disfrutar su comida?
          </h1>
          <p class="mt-2 text-sm text-text-muted">
            Seleccione una opción para comenzar su orden
          </p>
        </div>

        <!-- Cards -->
        <div class="mt-10">
          <!-- OrderTypeGrid ya trae su grid -->
          <OrderTypeGrid @select="handleSelect" />
        </div>

        <!-- Soft bottom wave -->
        <div class="pointer-events-none absolute inset-x-0 bottom-0 h-28">
          <br>
          <div class="h-full w-full rounded-b-3xl bg-muted/30" />
        </div>

        <!-- Footer -->

        <div class="relative mt-16">
          <FooterInfoBar />
        </div>
      </div>
    </div>
  </section>
</template>
