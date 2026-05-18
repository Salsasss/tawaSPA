<script setup>
import OrderTypeCard from "./OrderTypeCard.vue";

const emit = defineEmits(["select"]);

function onSelect(type) {
  emit("select", type);
}
</script>

<template>
  <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
    <OrderTypeCard
        title="Comer Aquí"
        subtitle="Disfrute en nuestras mesas"
        value="dine_in"
        icon="🍽️"
        icon-class="bg-blue-100 dark:bg-blue-500/20"
        @select="onSelect"
    />

    <OrderTypeCard
        title="Para Llevar"
        subtitle="Listo para llevar a casa"
        value="takeaway"
        icon="🛍️"
        icon-class="bg-rose-100 dark:bg-rose-500/20"
        @select="onSelect"
    />
  </div>
</template>
