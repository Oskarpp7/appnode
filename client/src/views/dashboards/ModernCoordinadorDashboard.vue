<template>
  <ModernLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Dashboard Coordinador</h1>
          <p class="text-gray-600">Gestió d'activitats i coordinació del centre</p>
        </div>
        <div class="flex items-center space-x-3">
          <div class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Coordinador
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Estudiants Actius</p>
              <p class="text-3xl font-bold text-gray-900">342</p>
              <p class="text-sm text-green-600 mt-1">96% assistència</p>
            </div>
            <div class="bg-blue-50 p-3 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Activitats Setmanals</p>
              <p class="text-3xl font-bold text-gray-900">18</p>
              <p class="text-sm text-blue-600 mt-1">5 programades avui</p>
            </div>
            <div class="bg-green-50 p-3 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Monitors Disponibles</p>
              <p class="text-3xl font-bold text-gray-900">12</p>
              <p class="text-sm text-yellow-600 mt-1">2 de baixa temporal</p>
            </div>
            <div class="bg-yellow-50 p-3 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Ocupació Mitjana</p>
              <p class="text-3xl font-bold text-gray-900">87%</p>
              <p class="text-sm text-green-600 mt-1">Dins dels objectius</p>
            </div>
            <div class="bg-purple-50 p-3 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Planificació d'Activitats -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">Planificació Setmanal</h3>
              <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Nova Activitat
              </button>
            </div>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">Futbol Iniciació</p>
                    <p class="text-sm text-gray-600">Dilluns 16:00 - 17:30</p>
                    <p class="text-sm text-green-600">Monitor: Joan Pérez</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-900">24/25 places</p>
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Completa
                  </span>
                </div>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">Taller d'Art</p>
                    <p class="text-sm text-gray-600">Dimarts 15:30 - 17:00</p>
                    <p class="text-sm text-blue-600">Monitor: Maria Soler</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-900">18/20 places</p>
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    Disponible
                  </span>
                </div>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">Reforç Matemàtiques</p>
                    <p class="text-sm text-gray-600">Dimecres 17:00 - 18:00</p>
                    <p class="text-sm text-yellow-600">Pendent assignar monitor</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-900">12/15 places</p>
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pendent
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Gestió de Monitors -->
        <div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Monitors Disponibles</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span class="text-green-600 font-semibold text-sm">JP</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">Joan Pérez</p>
                    <p class="text-sm text-gray-600">Esports</p>
                  </div>
                </div>
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Disponible
                </span>
              </div>
              
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span class="text-blue-600 font-semibold text-sm">MS</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">Maria Soler</p>
                    <p class="text-sm text-gray-600">Arts i Manualitats</p>
                  </div>
                </div>
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Disponible
                </span>
              </div>
              
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span class="text-red-600 font-semibold text-sm">AR</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">Anna Roca</p>
                    <p class="text-sm text-gray-600">Idiomes</p>
                  </div>
                </div>
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                  De baixa
                </span>
              </div>
            </div>

            <button class="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
              Gestionar Monitors
            </button>
          </div>
        </div>
      </div>

      <!-- Resumen de Reports -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Informe d'Assistència Setmanal</h3>
            <div class="flex space-x-2">
              <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
                Exportar
              </button>
              <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Generar Informe
              </button>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activitat</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monitor</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inscrits</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assistència</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentatge</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">Futbol Iniciació</div>
                  <div class="text-sm text-gray-500">Dilluns 16:00-17:30</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Joan Pérez</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">25</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">24</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    96%
                  </span>
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">Taller d'Art</div>
                  <div class="text-sm text-gray-500">Dimarts 15:30-17:00</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Maria Soler</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">18</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">16</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    89%
                  </span>
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">Estudi Dirigit</div>
                  <div class="text-sm text-gray-500">Cada dia 17:00-18:00</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Carles Vila</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">30</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">28</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    93%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </ModernLayout>
</template>

<script setup>
import ModernLayout from '@/components/layout/ModernLayout.vue'
</script>