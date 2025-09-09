<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Coordinador Dashboard</h1>
        <p class="text-gray-600">Coordinació d'activitats i serveis</p>
      </div>

      <!-- User Info -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-semibold text-gray-800">Benvingut, {{ user?.name }}</h2>
            <p class="text-gray-600">Rol: <span class="text-green-600 font-medium">{{ user?.role }}</span></p>
          </div>
          <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors">
            Tancar Sessió
          </button>
        </div>
      </div>

      <!-- Dashboard Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div class="flex items-center">
            <div class="text-3xl text-green-500 mr-4">📅</div>
            <div>
              <h3 class="text-lg font-semibold text-gray-800">Planificació</h3>
              <p class="text-gray-600">Horaris i calendari</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div class="flex items-center">
            <div class="text-3xl text-blue-500 mr-4">👨‍🏫</div>
            <div>
              <h3 class="text-lg font-semibold text-gray-800">Monitors</h3>
              <p class="text-gray-600">Coordinació monitors</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <div class="flex items-center">
            <div class="text-3xl text-orange-500 mr-4">🏃‍♂️</div>
            <div>
              <h3 class="text-lg font-semibold text-gray-800">Activitats</h3>
              <p class="text-gray-600">Gestió d'activitats</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div class="flex items-center">
            <div class="text-3xl text-purple-500 mr-4">📊</div>
            <div>
              <h3 class="text-lg font-semibold text-gray-800">Informes</h3>
              <p class="text-gray-600">Reports i estadístiques</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div class="flex items-center">
            <div class="text-3xl text-yellow-500 mr-4">🔧</div>
            <div>
              <h3 class="text-lg font-semibold text-gray-800">Recursos</h3>
              <p class="text-gray-600">Gestió de recursos</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
          <div class="flex items-center">
            <div class="text-3xl text-indigo-500 mr-4">📋</div>
            <div>
              <h3 class="text-lg font-semibold text-gray-800">Seguiment</h3>
              <p class="text-gray-600">Control d'activitats</p>
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