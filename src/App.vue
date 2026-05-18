<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import AppShellConsumer from "@/layouts/AppShellConsumer.vue";

const route = useRoute();

/**
 * Kitchen routes manage their own layout (AppShellKitchen) inside each view,
 * so we skip the consumer shell for them.
 */
const isKitchenRoute = computed(() => route.path.startsWith("/kitchen"));
</script>

<template>
  <!-- Kitchen routes: no consumer shell wrapper -->
  <template v-if="isKitchenRoute">
    <RouterView />
  </template>

  <!-- Consumer routes: wrapped in AppShellConsumer -->
  <template v-else>
    <AppShellConsumer :showSearch="false">
      <RouterView />
    </AppShellConsumer>
  </template>
</template>
