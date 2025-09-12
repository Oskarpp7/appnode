<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-yellow-600 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-white">
              👩‍🏫 Monitor Dashboard
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-white text-sm">
              Monitor (MONITOR)
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
          Gestió Diària - Interfície Tàctil
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Passar Llista -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium mb-4">⚡ Passar Llista Ràpida</h3>
            <button class="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-6 rounded-lg text-xl">
              📱 Iniciar Passa Llista Tàctil
            </button>
          </div>
          
          <!-- Resum Avui -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium mb-4">📊 Resum d'Avui</h3>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span>Presents:</span>
                <span class="font-semibold text-green-600">32</span>
              </div>
              <div class="flex justify-between">
                <span>Absents:</span>
                <span class="font-semibold text-red-600">3</span>
              </div>
              <div class="flex justify-between">
                <span>Justificats:</span>
                <span class="font-semibold text-yellow-600">1</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Accions ràpides del monitor -->
        <div class="mt-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Accions Ràpides</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              ✅ Marcar Assistència
            </button>
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              📝 Afegir Observació
            </button>
            <button class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              🚑 Incident Mèdic
            </button>
            <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              📞 Contactar Família
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
