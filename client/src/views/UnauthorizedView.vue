<template>
  <div class="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
      <!-- Icon -->
      <div class="text-6xl text-red-500 mb-6">🚫</div>
      
      <!-- Title -->
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Accés No Autoritzat</h1>
      
      <!-- Message -->
      <p class="text-gray-600 mb-6">
        No tens permisos per accedir a aquesta pàgina. Si creus que és un error, 
        contacta amb l'administrador del sistema.
      </p>
      
      <!-- User Info -->
      <div class="bg-gray-100 rounded-lg p-4 mb-6">
        <p class="text-sm text-gray-700">
          <strong>Usuari:</strong> {{ user?.name || 'Desconegut' }}
        </p>
        <p class="text-sm text-gray-700">
          <strong>Rol actual:</strong> {{ user?.role || 'No definit' }}
        </p>
      </div>
      
      <!-- Actions -->
      <div class="space-y-3">
        <button 
          @click="goToDashboard" 
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Tornar al Dashboard
        </button>
        
        <button 
          @click="logout" 
          class="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Tancar Sessió
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const user = computed(() => authStore.user)

const goToDashboard = () => {
  router.push('/dashboard')
}

const logout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>