<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/order'
import OrderSuccessCard from '@/components/end/OrderSuccessCard.vue'

const router = useRouter()
const cart = useCartStore()
const order = useOrderStore()

// Guardar el total antes de limpiar, incluyendo propina
const tipAmount = Math.round(cart.subtotal * (order.tipPercent / 100) * 100) / 100
const savedTotal = Math.round((cart.subtotal + cart.iva + tipAmount) * 100) / 100

function handleFinish() {
  cart.clear()
  order.resetOrder()
  router.push('/welcome')
}
</script>

<template>
  <section class="flex min-h-[calc(100vh-200px)] items-center justify-center">
    <OrderSuccessCard :total="savedTotal" @finish="handleFinish" />
  </section>
</template>
