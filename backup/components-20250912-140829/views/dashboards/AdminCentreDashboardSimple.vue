<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">
      🏢 Admin Centre Dashboard
    </h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900">Estudiants</h3>
        <p class="text-3xl font-bold text-green-600 mt-2">{{ kpis.estudiants }}</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900">Professorat</h3>
        <p class="text-3xl font-bold text-green-600 mt-2">{{ kpis.professorat }}</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900">Assistència Avui</h3>
        <p class="text-3xl font-bold text-green-600 mt-2">{{ kpis.assistencia }}%</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900">Facturació</h3>
        <p class="text-3xl font-bold text-green-600 mt-2">€{{ kpis.facturacio }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Serveis Actius</h3>
        <div class="space-y-3">
          <div v-for="servei in serveis" :key="servei.id" class="flex justify-between items-center py-2 border-b">
            <div>
              <p class="font-medium">{{ servei.name }}</p>
              <p class="text-sm text-gray-500">{{ servei.descripcio }}</p>
            </div>
            <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              {{ servei.participants }} alumnes
            </span>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Activitat Recent</h3>
        <div class="space-y-3">
          <div v-for="activitat in activitats" :key="activitat.id" class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <div class="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
            </div>
            <div>
              <p class="text-sm font-medium">{{ activitat.title }}</p>
              <p class="text-xs text-gray-500">{{ activitat.time }}</p>
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
  estudiants: 542,
  professorat: 28,
  assistencia: 94,
  facturacio: 18750
})

const serveis = ref([
  { id: 1, name: 'Menjador', descripcio: 'Servei de menjador escolar', participants: 420 },
  { id: 2, name: 'Extraescolars', descripcio: 'Activitats extraescolars', participants: 245 },
  { id: 3, name: 'Acollida', descripcio: 'Servei d\'acollida matinal', participants: 180 }
])

const activitats = ref([
  { id: 1, title: 'Nova matrícula processada', time: 'Fa 30 minuts' },
  { id: 2, title: 'Assistència menjador actualitzada', time: 'Fa 1 hora' },
  { id: 3, title: 'Factura generada automàticament', time: 'Fa 2 hores' }
])

console.log('✅ AdminCentreDashboard carregat correctament')

onMounted(() => {
  console.log('✅ AdminCentreDashboard muntat')
})
</script>
