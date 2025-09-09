<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Gestió Escolar
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Accedeix al teu compte
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              v-model="credentials.email"
              name="email"
              type="email"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="El teu email"
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Contrasenya</label>
            <input
              id="password"
              v-model="credentials.password"
              name="password"
              type="password"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="La teva contrasenya"
            />
          </div>
        </div>

        <div v-if="authStore.error" class="bg-red-50 border border-red-200 rounded-md p-3">
          <p class="text-sm text-red-700">{{ authStore.error }}</p>
        </div>

        <div>
          <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <span v-if="authStore.loading">Entrant...</span>
            <span v-else>Entrar</span>
          </button>
        </div>
        
        <div class="text-xs text-gray-500 bg-gray-100 p-3 rounded">
          <p class="font-medium">Credencials de prova:</p>
          <p><strong>Família Anna:</strong> anna.garcia@email.com / familia123</p>
          <p><strong>Admin:</strong> admin@escola-demo.com / admin123</p>
          <p><strong>Monitor:</strong> monitor@escola-demo.com / monitor123</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const credentials = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  console.log('🚀 INICIANT LOGIN...')
  
  const result = await authStore.login(credentials.value)
  
  if (!result.success) {
    console.error('❌ LOGIN FALLIT:', result.error)
  }
  // NO cal redireccionar manualment - ho fa automàticament l'store
}
</script>
