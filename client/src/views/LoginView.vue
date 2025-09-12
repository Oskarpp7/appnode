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
          <p><strong>Super Admin:</strong> admin@gestioescolar.com / password123</p>
          <p><strong>Admin Centre:</strong> admin@edutech.com / password123</p>
          <p><strong>Coordinador:</strong> coordinador@edutech.com / password123</p>
          <p><strong>Monitor:</strong> monitor@edutech.com / password123</p>
          <p><strong>Família:</strong> familia@edutech.com / password123</p>
        </div>
        
        <!-- Botons d'accés directe per debug -->
        <div class="mt-4 space-y-2">
          <h3 class="text-sm font-medium text-gray-700 text-center">🔧 Accés directe (desenvolupament)</h3>
          <div class="grid grid-cols-2 gap-2">
            <router-link to="/admin" class="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded text-center">
              🏢 Admin Centre
            </router-link>
            <router-link to="/admin-simple" class="bg-blue-600 hover:bg-blue-800 text-white text-xs font-bold py-1 px-2 rounded text-center">
              🏢 Admin Simple
            </router-link>
            <router-link to="/coordinador" class="bg-green-500 hover:bg-green-700 text-white text-xs font-bold py-1 px-2 rounded text-center">
              📋 Coordinador
            </router-link>
            <router-link to="/monitor" class="bg-yellow-500 hover:bg-yellow-700 text-white text-xs font-bold py-1 px-2 rounded text-center">
              👨‍🏫 Monitor
            </router-link>
            <router-link to="/familia" class="bg-purple-500 hover:bg-purple-700 text-white text-xs font-bold py-1 px-2 rounded text-center">
              👨‍👩‍👧‍👦 Família
            </router-link>
            <router-link to="/test" class="bg-gray-500 hover:bg-gray-700 text-white text-xs font-bold py-1 px-2 rounded text-center">
              🧪 Test Form
            </router-link>
          </div>
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
