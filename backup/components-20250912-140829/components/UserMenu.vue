<template>
  <div class="flex items-center space-x-4">
    <span class="text-white text-sm">
      {{ authStore.user?.name }} ({{ authStore.user?.role }})
    </span>
    <button 
      @click="authStore.logout"
      class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-1 rounded text-sm"
    >
      Sortir
    </button>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
</script>
