<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-green-600 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-white">
              📋 Coordinador Dashboard
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-white text-sm">
              Coordinador (COORDINADOR)
            </span>
            <router-link to="/login" class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-1 rounded text-sm">
              Sortir
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">
          Coordinació d'Activitats
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Planificació -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <span class="text-2xl">📅</span>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Planificació
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      Horaris i calendaris d'activitats
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-green-50 px-5 py-3">
              <div class="text-sm">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-green-700">Activitats</span>
                  <span class="font-bold text-green-700">15</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Monitors -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <span class="text-2xl">👩‍🏫</span>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Gestió Monitors
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      Assignació i coordinació
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-green-50 px-5 py-3">
              <div class="text-sm">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-green-700">Monitors</span>
                  <span class="font-bold text-green-700">8</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Assistència -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <span class="text-2xl">✅</span>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Control Assistència
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      Seguiment diari assistència
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-green-50 px-5 py-3">
              <div class="text-sm">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-green-700">Avui</span>
                  <span class="font-bold text-green-700">89%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Accions ràpides del coordinador -->
        <div class="mt-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Accions Ràpides</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Nova Activitat
            </button>
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Assignar Monitor
            </button>
            <button class="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Control Assistència
            </button>
            <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Informe Setmanal
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// No dependencies needed
</script>
