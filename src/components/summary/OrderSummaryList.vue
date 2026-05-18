<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import OrderItemRow from './OrderItemRow.vue'

const cart = useCartStore()
const hasItems = computed(() => cart.items.length > 0)
</script>

<template>
  <div>
    <!-- Estado vacío -->
    <div
        v-if="!hasItems"
        class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300
               bg-slate-50 px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900/40"
    >
      <span class="text-4xl">🛒</span>
      <p class="mt-4 text-base font-bold text-slate-700 dark:text-slate-300">
        Tu carrito está vacío
      </p>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Agrega productos desde el menú para verlos aquí.
      </p>
    </div>

    <!-- Lista de productos -->
    <div v-else class="space-y-3">
      <OrderItemRow
          v-for="item in cart.items"
          :key="item.id"
          :item="item"
          @increment="cart.increment(item.id)"
          @decrement="cart.decrement(item.id)"
          @remove="cart.remove(item.id)"
      />
    </div>
  </div>
</template>