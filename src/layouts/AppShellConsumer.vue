<script setup>
import BrandHeader from "@/components/brand/BrandHeader.vue";
import ThemeToggle from "@/components/shared/ThemeToggle.vue";

defineProps({
  showSearch: { type: Boolean, default: false },
});
</script>

<template>
  <div class="min-h-dvh bg-bg text-text">
    <!-- blobs/fondo suave -->
    <div class="pointer-events-none fixed inset-0 -z-10">
      <div class="absolute -top-32 -right-40 h-72 w-72 rounded-full bg-blue-200/50 blur-3xl dark:bg-blue-500/20"></div>
      <div class="absolute -bottom-40 -left-40 h-72 w-72 rounded-full bg-rose-200/50 blur-3xl dark:bg-rose-500/20"></div>
      <div class="absolute left-0 right-0 top-0 h-48 bg-linear-to-b from-blue-100/60 to-transparent dark:from-blue-500/10"></div>
      <div class="absolute left-0 right-0 bottom-0 h-48 bg-linear-to-t from-rose-100/60 to-transparent dark:from-rose-500/10"></div>
    </div>

    <header class="mx-auto max-w-6xl px-6 pt-6">
      <div class="flex items-start justify-between gap-4">
        <BrandHeader />

        <div class="flex items-center gap-3">
          <div v-if="showSearch" class="hidden md:block">
            <input
                class="h-10 w-90 rounded-full border border-border bg-surface px-4 text-sm outline-none focus-visible:outline focus-visible:outline-accent"
                placeholder="Buscar platillo (ej. Camarones...)"
            />
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-6 py-10">
      <slot />
    </main>

    <footer class="mx-auto max-w-6xl px-6 pb-6">
      <div class="flex items-center justify-between text-xs text-text-muted">
        <div>© 2026 Mariscos Tawa. Todos los derechos reservados.</div>
        <div>Horario: 9:00 am - 6:00 pm</div>
      </div>
    </footer>
  </div>
</template>
