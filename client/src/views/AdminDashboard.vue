<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Admin Centre Dashboard</h1>
        <p class="text-gray-600">Administració del centre educatiu</p>
      </div>

      <!-- User Info -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-semibold text-gray-800">Benvingut, {{ user?.name }}</h2>
            <p class="text-gray-600">Rol: <span class="text-blue-600 font-medium">{{ user?.role }}</span></p>
          </div>
          <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors">
            Tancar Sessió
          </button>
        </div>
      </div>

      <!-- Dashboard Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div class="flex items-center">
            <div class="text-3xl text-blue-500 mr-4">👨‍🎓</div>
            <div>
              <h3 class="text-lg font-semibold text-gray-800">Estudiants</h3>
              <p class="text-gray-600">Gestió d'alumnes</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div class="flex items-center">
            <div class="text-3xl text-green-500 mr-4">👪</div>
            <div>
              <h3 class="text-lg font-semibold text-gray-800">Famílies</h3>
              <p class="text-gray-600">Administrar famílies</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div class="flex items-center">
            <div class="text-3xl text-purple-500 mr-4">👨‍🏫</div>
            <div>
              <h3 class="text-lg font-semibold text-gray-800">Personal</h3>
              <p class="text-gray-600">Gestió del personal</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div class="flex items-center">
            <div class="text-3xl text-yellow-500 mr-4">🍽️</div>
            <div>
              <h3 class="text-lg font-semibold text-gray-800">Menjador</h3>
              <p class="text-gray-600">Servei de menjador</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <div class="flex items-center">
            <div class="text-3xl text-orange-500 mr-4">🏃‍♂️</div>
            <div>
              <h3 class="text-lg font-semibold text-gray-800">Extraescolars</h3>
              <p class="text-gray-600">Activitats extraescolars</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
          <div class="flex items-center">
            <div class="text-3xl text-indigo-500 mr-4">💰</div>
            <div>
              <h3 class="text-lg font-semibold text-gray-800">Facturació</h3>
              <p class="text-gray-600">Gestió econòmica</p>
            </div>
          </div>
        </div>
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

const logout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>