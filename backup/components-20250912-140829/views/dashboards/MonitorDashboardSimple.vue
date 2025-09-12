<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">
      👀 Monitor Dashboard
    </h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900">Grups Avui</h3>
        <p class="text-3xl font-bold text-blue-600 mt-2">{{ kpis.grups }}</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900">Presents</h3>
        <p class="text-3xl font-bold text-blue-600 mt-2">{{ kpis.presents }}</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900">Absents</h3>
        <p class="text-3xl font-bold text-blue-600 mt-2">{{ kpis.absents }}</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900">Completat</h3>
        <p class="text-3xl font-bold text-blue-600 mt-2">{{ kpis.completat }}%</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Grups d'Avui</h3>
        <div class="space-y-3">
          <div v-for="grup in grups" :key="grup.id" class="flex justify-between items-center py-2 border-b">
            <div>
              <p class="font-medium">{{ grup.name }}</p>
              <p class="text-sm text-gray-500">{{ grup.horari }}</p>
            </div>
            <div class="text-right">
              <span class="text-sm font-medium">{{ grup.presents }}/{{ grup.total }}</span>
              <div class="w-20 bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  class="bg-blue-600 h-2 rounded-full" 
                  :style="{ width: (grup.presents / grup.total * 100) + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Missatges Urgents</h3>
        <div class="space-y-3">
          <div v-for="missatge in missatges" :key="missatge.id" class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p class="text-sm font-medium text-yellow-800">{{ missatge.title }}</p>
            <p class="text-xs text-yellow-600 mt-1">{{ missatge.time }}</p>
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
  grups: 3,
  presents: 28,
  absents: 4,
  completat: 67
})

const grups = ref([
  { id: 1, name: 'Menjador P3-P4', horari: '12:00 - 14:00', presents: 12, total: 15 },
  { id: 2, name: 'Extraescolars Esport', horari: '16:00 - 17:00', presents: 16, total: 22 },
  { id: 3, name: 'Acollida Tarda', horari: '17:00 - 18:30', presents: 0, total: 18 }
])

const missatges = ref([
  { id: 1, title: 'Al·lèrgia alimentària - Maria P.', time: '08:30' },
  { id: 2, title: 'Canvi d\'horari - Extraescolars', time: '14:45' }
])

console.log('✅ MonitorDashboard carregat correctament')

onMounted(() => {
  console.log('✅ MonitorDashboard muntat')
})
</script>
