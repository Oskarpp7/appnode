<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-red-600 mb-4">403</h1>
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">
        No Autoritzat
      </h2>
      <p class="text-gray-600 mb-6">
        No tens permisos per accedir a aquesta pàgina.
      </p>
      <button 
        @click="goBack"
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
      >
        Tornar Enrere
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>
