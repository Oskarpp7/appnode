<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">
      🎯 Super Admin Dashboard
    </h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900">Centres Actius</h3>
        <p class="text-3xl font-bold text-red-600 mt-2">{{ kpis.centres }}</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900">Usuaris Totals</h3>
        <p class="text-3xl font-bold text-red-600 mt-2">{{ kpis.usuaris }}</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900">Estudiants</h3>
        <p class="text-3xl font-bold text-red-600 mt-2">{{ kpis.estudiants }}</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900">Ingressos Mensuals</h3>
        <p class="text-3xl font-bold text-red-600 mt-2">€{{ kpis.ingressos }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Centres Recents</h3>
        <div class="space-y-3">
          <div v-for="centre in centres" :key="centre.id" class="flex justify-between items-center py-2 border-b">
            <div>
              <p class="font-medium">{{ centre.name }}</p>
              <p class="text-sm text-gray-500">{{ centre.location }}</p>
            </div>
            <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
              {{ centre.status }}
            </span>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Alertes del Sistema</h3>
        <div class="space-y-3">
          <div v-for="alert in alerts" :key="alert.id" class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <div class="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
            </div>
            <div>
              <p class="text-sm font-medium">{{ alert.title }}</p>
              <p class="text-xs text-gray-500">{{ alert.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Data reactiva
const kpis = ref({
  centres: 8,
  usuaris: 1247,
  estudiants: 3892,
  ingressos: 47350
})

const centres = ref([
  { id: 1, name: 'CEIP Montjuïc', location: 'Barcelona', status: 'Actiu' },
  { id: 2, name: 'Col·legi Europa', location: 'Girona', status: 'Actiu' },
  { id: 3, name: 'Escola Mediterrània', location: 'Tarragona', status: 'Actiu' }
])

const alerts = ref([
  { id: 1, title: 'Actualització del sistema programada', time: 'Fa 2 hores' },
  { id: 2, title: 'Nou centre registrat: Escola Nova', time: 'Fa 4 hores' },
  { id: 3, title: 'Backup completat correctament', time: 'Ahir' }
])

console.log('✅ SuperAdminDashboard carregat correctament')

onMounted(() => {
  console.log('✅ SuperAdminDashboard muntat')
})
</script>
