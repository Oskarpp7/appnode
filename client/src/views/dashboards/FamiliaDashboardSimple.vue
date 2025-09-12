<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">
      👨‍👩‍👧‍👦 Dashboard Família
    </h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900">Els Meus Fills</h3>
        <p class="text-3xl font-bold text-purple-600 mt-2">{{ kpis.fills }}</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900">Assistència</h3>
        <p class="text-3xl font-bold text-purple-600 mt-2">{{ kpis.assistencia }}%</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900">Missatges</h3>
        <p class="text-3xl font-bold text-purple-600 mt-2">{{ kpis.missatges }}</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900">Facturació</h3>
        <p class="text-3xl font-bold text-purple-600 mt-2">€{{ kpis.facturacio }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Els Meus Fills</h3>
        <div class="space-y-4">
          <div v-for="fill in fills" :key="fill.id" class="border border-gray-200 rounded-lg p-4">
            <div class="flex justify-between items-start mb-2">
              <div>
                <p class="font-medium">{{ fill.name }}</p>
                <p class="text-sm text-gray-500">{{ fill.curs }} · {{ fill.escola }}</p>
              </div>
              <span 
                :class="fill.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                class="px-2 py-1 rounded-full text-xs"
              >
                {{ fill.status === 'present' ? 'Present' : 'Pendent' }}
              </span>
            </div>
            <div class="text-sm text-gray-600">
              <p>Assistència setmana: {{ fill.assistenciaSetmana }}%</p>
              <p>Serveis: {{ fill.serveis.join(', ') }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Comunicacions</h3>
        <div class="space-y-3">
          <div v-for="comunicacio in comunicacions" :key="comunicacio.id" class="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p class="text-sm font-medium text-blue-800">{{ comunicacio.title }}</p>
            <p class="text-xs text-blue-600 mt-1">{{ comunicacio.time }}</p>
          </div>
        </div>
        
        <div class="mt-6">
          <h4 class="text-md font-medium text-gray-900 mb-3">Resum Facturació</h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span>Pendent de pagament:</span>
              <span class="font-medium text-red-600">€125</span>
            </div>
            <div class="flex justify-between">
              <span>Pagat aquest mes:</span>
              <span class="font-medium text-green-600">€340</span>
            </div>
            <div class="flex justify-between border-t pt-2 font-medium">
              <span>Total previst:</span>
              <span>€465</span>
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
  fills: 2,
  assistencia: 92,
  missatges: 3,
  facturacio: 125
})

const fills = ref([
  { 
    id: 1, 
    name: 'Anna Puig', 
    curs: 'P4', 
    escola: 'CEIP Montjuïc',
    status: 'present',
    assistenciaSetmana: 95,
    serveis: ['Menjador', 'Acollida']
  },
  { 
    id: 2, 
    name: 'Marc Puig', 
    curs: '2n Primària', 
    escola: 'CEIP Montjuïc',
    status: 'present',
    assistenciaSetmana: 88,
    serveis: ['Menjador', 'Extraescolars']
  }
])

const comunicacions = ref([
  { id: 1, title: 'Excursió divendres - Portar esmorzar', time: 'Dimarts 09:00' },
  { id: 2, title: 'Canvi menú demà per al·lèrgies', time: 'Avui 11:30' },
  { id: 3, title: 'Reunió trimestral programada', time: 'Dilluns 16:20' }
])

console.log('✅ FamiliaDashboard carregat correctament')

onMounted(() => {
  console.log('✅ FamiliaDashboard muntat')
})
</script>
