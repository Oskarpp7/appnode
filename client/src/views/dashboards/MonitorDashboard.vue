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
          <UserMenu />
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
      </div>
    </main>
  </div>
</template>

<script setup>
import UserMenu from '@/components/UserMenu.vue'
</script>
