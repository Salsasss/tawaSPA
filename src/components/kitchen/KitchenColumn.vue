<script setup>
import KitchenOrderCard from "./KitchenOrderCard.vue";
import { ref } from "vue";

const props = defineProps({
  title: { type: String, required: true },
  icon: { type: String, default: "" },
  status: { type: String, required: true }, // 'new' | 'preparing' | 'completed'
  orders: { type: Array, default: () => [] },
  headerColor: { type: String, default: "" }, // tailwind bg class for the header bar
  badgeColor: { type: String, default: "" }, // tailwind bg class for count badge
});

const emit = defineEmits(["action", "undo", "drop", "toggleItem"]);

/* ── Drag & Drop zone ── */
const isDragOver = ref(false);

function onDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  isDragOver.value = true;
}

function onDragLeave() {
  isDragOver.value = false;
}

function onDrop(e) {
  e.preventDefault();
  isDragOver.value = false;
  const orderId = e.dataTransfer.getData("text/plain");
  if (orderId) {
    emit("drop", { orderId, targetStatus: props.status });
  }
}
</script>

<template>
  <div
    class="kitchen-column flex flex-col rounded-2xl border border-border bg-surface/80
           backdrop-blur transition-colors duration-200 overflow-hidden"
    :class="{ 'ring-2 ring-accent/40 bg-accent/5': isDragOver }"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <!-- Column Header -->
    <div class="flex items-center justify-between px-4 py-3 border-b border-border">
      <div class="flex items-center gap-2">
        
        <h2 class="text-sm font-extrabold tracking-wide uppercase text-text">
          {{ title }}
        </h2>
      </div>
      <span
        class="inline-flex h-6 min-w-6 items-center justify-center rounded-full text-xs font-bold text-white px-1.5"
        :class="badgeColor || 'bg-gray-400'"
      >
        {{ orders.length }}
      </span>
    </div>

    <!-- Scrollable order list -->
    <div class="flex-1 overflow-y-auto p-3 space-y-3 kitchen-column-scroll">
      <TransitionGroup name="card-list" tag="div" class="space-y-3">
        <KitchenOrderCard
          v-for="order in orders"
          :key="order.id"
          :order="order"
          :status="status"
          @action="(id) => emit('action', id)"
          @undo="(id) => emit('undo', id)"
          @toggleItem="(itemIndex) => emit('toggleItem', order.id, itemIndex)"
        />
      </TransitionGroup>

      <!-- Empty state -->
      <div
        v-if="orders.length === 0"
        class="flex flex-col items-center justify-center py-12 text-text-muted"
      >
        <span class="text-3xl mb-2 opacity-30">📋</span>
        <span class="text-xs">Sin órdenes</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kitchen-column {
  min-height: 0; /* let flex-1 work */
}

.kitchen-column-scroll {
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}

.kitchen-column-scroll::-webkit-scrollbar {
  width: 4px;
}
.kitchen-column-scroll::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 4px;
}

/* TransitionGroup animations */
.card-list-enter-active {
  transition: all 0.3s ease-out;
}
.card-list-leave-active {
  transition: all 0.2s ease-in;
}
.card-list-enter-from {
  opacity: 0;
  transform: translateY(-12px) scale(0.97);
}
.card-list-leave-to {
  opacity: 0;
  transform: translateX(20px) scale(0.95);
}
.card-list-move {
  transition: transform 0.3s ease;
}
</style>
