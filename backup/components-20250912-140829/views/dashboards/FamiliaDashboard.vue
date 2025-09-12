<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-purple-600 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-white">
              👨‍👩‍👧‍👦 Dashboard Família
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-white text-sm">
              Família (FAMILIA)
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
          Els Meus Fills
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Assistència Setmana -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <span class="text-2xl">📅</span>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Assistència Setmanal
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      Seguiment assistència dels fills
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-purple-50 px-5 py-3">
              <div class="text-sm">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-purple-700">Aquesta setmana</span>
                  <span class="font-bold text-purple-700">95%</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Menjador -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <span class="text-2xl">🍽️</span>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Servei Menjador
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      Menu i assistència menjador
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-purple-50 px-5 py-3">
              <div class="text-sm">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-purple-700">Dies contractats</span>
                  <span class="font-bold text-purple-700">5</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Facturació -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <span class="text-2xl">💳</span>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Facturació
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      Rebuts i pagaments pendents
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-purple-50 px-5 py-3">
              <div class="text-sm">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-purple-700">Pendent</span>
                  <span class="font-bold text-purple-700">€125</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Comunicacions -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <span class="text-2xl">📧</span>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Comunicacions
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      Missatges del centre
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-purple-50 px-5 py-3">
              <div class="text-sm">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-purple-700">Nous</span>
                  <span class="font-bold text-purple-700">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Accions ràpides de la família -->
        <div class="mt-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Accions Ràpides</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              📋 Veure Informe
            </button>
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              💳 Pagar Factura
            </button>
            <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              📞 Contactar Centre
            </button>
            <button class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              📝 Justificar Absència
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
