<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">
      🎯 Coordinador Dashboard
    </h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900">Grups Assignats</h3>
        <p class="text-3xl font-bold text-red-600 mt-2">{{ kpis.grups }}</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900">Monitors</h3>
        <p class="text-3xl font-bold text-red-600 mt-2">{{ kpis.monitors }}</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900">Incidents</h3>
        <p class="text-3xl font-bold text-red-600 mt-2">{{ kpis.incidents }}</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900">Ocupació</h3>
        <p class="text-3xl font-bold text-red-600 mt-2">{{ kpis.ocupacio }}%</p>
      </div>
    </div>

    <!-- Botó d'assistència tàctica destacat -->
    <div class="mb-8">
      <div class="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold">Assistència Tàctica</h3>
            <p class="text-red-100 mt-1">Passa llista ràpida per a tots els grups</p>
          </div>
          <button class="bg-white text-red-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Iniciar Assistència
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Assignacions d'Avui</h3>
        <div class="space-y-3">
          <div v-for="assignacio in assignacions" :key="assignacio.id" class="flex justify-between items-center py-2 border-b">
            <div>
              <p class="font-medium">{{ assignacio.grup }}</p>
              <p class="text-sm text-gray-500">{{ assignacio.monitor }} · {{ assignacio.horari }}</p>
            </div>
            <div class="text-right">
              <span 
                :class="assignacio.status === 'Completat' ? 'bg-green-100 text-green-800' : 
                        assignacio.status === 'Actiu' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'"
                class="px-2 py-1 rounded-full text-xs"
              >
                {{ assignacio.status }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Incidents i Alertes</h3>
        <div class="space-y-3">
          <div v-for="incident in incidents" :key="incident.id" class="bg-red-50 border border-red-200 rounded-lg p-3">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-medium text-red-800">{{ incident.title }}</p>
                <p class="text-xs text-red-600 mt-1">{{ incident.monitor }} · {{ incident.time }}</p>
              </div>
              <span 
                :class="incident.priority === 'Alta' ? 'bg-red-500' : 'bg-yellow-500'"
                class="w-3 h-3 rounded-full"
              ></span>
            </div>
          </div>
        </div>
        
        <div class="mt-6">
          <h4 class="text-md font-medium text-gray-900 mb-3">Comunicacions</h4>
          <div class="space-y-2">
            <div v-for="comunicacio in comunicacions" :key="comunicacio.id" class="text-sm">
              <p class="font-medium">{{ comunicacio.title }}</p>
              <p class="text-xs text-gray-500">{{ comunicacio.time }}</p>
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
  grups: 12,
  monitors: 8,
  incidents: 2,
  ocupacio: 87
})

const assignacions = ref([
  { id: 1, grup: 'Menjador P3-P4', monitor: 'Maria Santos', horari: '12:00-14:00', status: 'Completat' },
  { id: 2, grup: 'Extraescolars Esport', monitor: 'Joan Pérez', horari: '16:00-17:00', status: 'Actiu' },
  { id: 3, grup: 'Acollida Matinal', monitor: 'Laura García', horari: '08:00-09:00', status: 'Completat' },
  { id: 4, grup: 'Acollida Tarda', monitor: 'Pere Martín', horari: '17:00-18:30', status: 'Pendent' }
])

const incidents = ref([
  { id: 1, title: 'Al·lèrgia alimentària reportada', monitor: 'Maria Santos', time: 'Fa 1 hora', priority: 'Alta' },
  { id: 2, title: 'Retard en recollida d\'alumne', monitor: 'Pere Martín', time: 'Fa 30 min', priority: 'Mitjana' }
])

const comunicacions = ref([
  { id: 1, title: 'Reunió coordinadors demà 15:00', time: 'Avui 10:30' },
  { id: 2, title: 'Nou protocol d\'emergència activat', time: 'Ahir 16:45' }
])

console.log('✅ CoordinadorDashboard carregat correctament')

onMounted(() => {
  console.log('✅ CoordinadorDashboard muntat')
})
</script>
