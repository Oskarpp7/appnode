<template>
  <ModernLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Dashboard Monitor</h1>
          <p class="text-gray-600">Gestió d'assistència i activitats diàries</p>
        </div>
        <div class="flex items-center space-x-3">
          <div class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
            Monitor
          </div>
          <div class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Actiu
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl shadow-sm text-white">
          <div class="flex items-center space-x-4">
            <div class="bg-white bg-opacity-20 p-3 rounded-lg">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold">Passar Llista</h3>
              <p class="text-yellow-100 text-sm">Registra assistència ràpida</p>
            </div>
          </div>
          <button class="w-full mt-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium py-3 px-4 rounded-lg">
            Iniciar Pas de Llista
          </button>
        </div>

        <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-sm text-white">
          <div class="flex items-center space-x-4">
            <div class="bg-white bg-opacity-20 p-3 rounded-lg">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold">Planificar Activitat</h3>
              <p class="text-blue-100 text-sm">Organitza sessions</p>
            </div>
          </div>
          <button class="w-full mt-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium py-3 px-4 rounded-lg">
            Nova Activitat
          </button>
        </div>

        <div class="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl shadow-sm text-white">
          <div class="flex items-center space-x-4">
            <div class="bg-white bg-opacity-20 p-3 rounded-lg">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8s0 0 0 0l-6-6zM16 18H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold">Generar Informe</h3>
              <p class="text-green-100 text-sm">Resum setmanal</p>
            </div>
          </div>
          <button class="w-full mt-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium py-3 px-4 rounded-lg">
            Crear Informe
          </button>
        </div>
      </div>

      <!-- Today's Summary -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Estudiants Presents</p>
              <p class="text-3xl font-bold text-green-600">28</p>
            </div>
            <div class="bg-green-50 p-3 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Estudiants Absents</p>
              <p class="text-3xl font-bold text-red-600">3</p>
            </div>
            <div class="bg-red-50 p-3 rounded-lg">
              <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Activitats Programades</p>
              <p class="text-3xl font-bold text-blue-600">5</p>
            </div>
            <div class="bg-blue-50 p-3 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Percentatge Assistència</p>
              <p class="text-3xl font-bold text-purple-600">90%</p>
            </div>
            <div class="bg-purple-50 p-3 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Lista de Estudiants -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Els Meus Estudiants (Grup A)</h3>
            <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-medium">
              31 estudiants
            </span>
          </div>
          <div class="space-y-3 max-h-80 overflow-y-auto">
            <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900">Marc Fernández</p>
                  <p class="text-sm text-gray-600">6è Primària</p>
                </div>
              </div>
              <span class="text-sm text-green-600 font-medium">Present</span>
            </div>

            <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900">Laura Martínez</p>
                  <p class="text-sm text-gray-600">5è Primària</p>
                </div>
              </div>
              <span class="text-sm text-green-600 font-medium">Present</span>
            </div>

            <div class="flex items-center justify-between p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900">Pol Sánchez</p>
                  <p class="text-sm text-gray-600">4t Primària</p>
                </div>
              </div>
              <span class="text-sm text-red-600 font-medium">Absent</span>
            </div>

            <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900">Anna Vila</p>
                  <p class="text-sm text-gray-600">6è Primària</p>
                </div>
              </div>
              <span class="text-sm text-green-600 font-medium">Present</span>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-200">
            <button class="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg">
              Actualitzar Assistència
            </button>
          </div>
        </div>

        <!-- Horari d'Avui -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Horari d'Avui - Dilluns</h3>
          <div class="space-y-4">
            <div class="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span class="text-blue-600 font-bold text-sm">15:00</span>
                </div>
              </div>
              <div class="flex-1">
                <h4 class="text-sm font-semibold text-gray-900">Recollida i Berenar</h4>
                <p class="text-sm text-gray-600">Supervisió d'arribades</p>
                <div class="mt-2">
                  <span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    En curs
                  </span>
                </div>
              </div>
            </div>

            <div class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span class="text-gray-600 font-bold text-sm">16:00</span>
                </div>
              </div>
              <div class="flex-1">
                <h4 class="text-sm font-semibold text-gray-900">Futbol Iniciació</h4>
                <p class="text-sm text-gray-600">Camp de futbol - Grup A</p>
                <div class="mt-2">
                  <span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                    Programat
                  </span>
                </div>
              </div>
            </div>

            <div class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span class="text-gray-600 font-bold text-sm">17:00</span>
                </div>
              </div>
              <div class="flex-1">
                <h4 class="text-sm font-semibold text-gray-900">Estudi Dirigit</h4>
                <p class="text-sm text-gray-600">Aula 12 - Deures i reforç</p>
                <div class="mt-2">
                  <span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                    Programat
                  </span>
                </div>
              </div>
            </div>

            <div class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span class="text-gray-600 font-bold text-sm">18:00</span>
                </div>
              </div>
              <div class="flex-1">
                <h4 class="text-sm font-semibold text-gray-900">Recollida</h4>
                <p class="text-sm text-gray-600">Supervisió de sortides</p>
                <div class="mt-2">
                  <span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                    Programat
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Notes i Comunicacions -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Notes i Comunicacions</h3>
          <button class="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Nova Nota
          </button>
        </div>
        <div class="space-y-4">
          <div class="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <svg class="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Recordatori important</p>
                <p class="text-sm text-gray-600 mt-1">El Marc Fernández no pot participar en activitats esportives per indicació mèdica aquesta setmana.</p>
                <p class="text-xs text-gray-500 mt-2">Coordinació - Avui 9:30</p>
              </div>
            </div>
          </div>
          <div class="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <svg class="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Missatge de la família Vila</p>
                <p class="text-sm text-gray-600 mt-1">L'Anna Vila serà recollida avui a les 17:00 per visita al metge. Gràcies per la comprensió.</p>
                <p class="text-xs text-gray-500 mt-2">Família - Ahir 20:45</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ModernLayout>
</template>

<script setup>
import ModernLayout from '@/components/layout/ModernLayout.vue'
</script>