<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-blue-600 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-white">
              🏫 Admin Centre Dashboard
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-white text-sm">
              Admin Centre (ADMIN_CENTRE)
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
          Administració del Centre
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Gestió Usuaris Centre -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <span class="text-2xl">👤</span>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Usuaris del Centre
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      Monitors, coordinadors i famílies
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-blue-50 px-5 py-3">
              <div class="text-sm">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-blue-700">Total Usuaris</span>
                  <span class="font-bold text-blue-700">156</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Gestió Estudiants -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <span class="text-2xl">🎓</span>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Estudiants
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      Alumnes del centre educatiu
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-blue-50 px-5 py-3">
              <div class="text-sm">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-blue-700">Estudiants</span>
                  <span class="font-bold text-blue-700">234</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Configuració Serveis -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <span class="text-2xl">🍽️</span>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Serveis
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      Menjador, acollida, extraescolars
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-blue-50 px-5 py-3">
              <div class="text-sm">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-blue-700">Serveis Actius</span>
                  <span class="font-bold text-blue-700">5</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Reports i Estadístiques -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <span class="text-2xl">📈</span>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Reports
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      Informes d'assistència i facturació
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-blue-50 px-5 py-3">
              <div class="text-sm">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-blue-700">Reports</span>
                  <span class="font-bold text-blue-700">28</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Facturació -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <span class="text-2xl">💰</span>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Facturació
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      Gestió de pagaments i factures
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-blue-50 px-5 py-3">
              <div class="text-sm">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-blue-700">Pendent</span>
                  <span class="font-bold text-blue-700">€2.345</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Comunicació -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <span class="text-2xl">📢</span>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Comunicació
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      Notificacions a famílies
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-blue-50 px-5 py-3">
              <div class="text-sm">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-blue-700">Missatges</span>
                  <span class="font-bold text-blue-700">12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Secció adicional amb accions ràpides -->
        <div class="mt-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Accions Ràpides</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Afegir Usuari
            </button>
            <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Nou Estudiant
            </button>
            <button class="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Generar Informe
            </button>
            <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Enviar Notificació
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// No dependencies needed for this simple version
</script>
