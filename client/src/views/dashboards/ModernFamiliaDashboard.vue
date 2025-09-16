<template>
  <ModernLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Dashboard Família</h1>
          <p class="text-gray-600">Seguiment de l'activitat dels vostres fills</p>
        </div>
        <div class="flex items-center space-x-3">
          <div class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            Família
          </div>
        </div>
      </div>

      <!-- Els Meus Fills -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-sm text-white">
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span class="text-2xl font-bold">MF</span>
            </div>
            <div>
              <h3 class="text-xl font-semibold">Marc Fernández</h3>
              <p class="text-blue-100">6è Primària</p>
              <div class="flex items-center space-x-2 mt-2">
                <span class="bg-green-500 w-3 h-3 rounded-full"></span>
                <span class="text-sm">Present avui</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-r from-pink-500 to-pink-600 p-6 rounded-xl shadow-sm text-white">
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span class="text-2xl font-bold">AF</span>
            </div>
            <div>
              <h3 class="text-xl font-semibold">Anna Fernández</h3>
              <p class="text-pink-100">4t Primària</p>
              <div class="flex items-center space-x-2 mt-2">
                <span class="bg-green-500 w-3 h-3 rounded-full"></span>
                <span class="text-sm">Present avui</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Resum Setmanal -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Dies Aquest Mes</p>
              <p class="text-3xl font-bold text-green-600">18</p>
              <p class="text-sm text-green-600 mt-1">Assistència excel·lent</p>
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
              <p class="text-sm text-gray-600">Activitats Inscrites</p>
              <p class="text-3xl font-bold text-blue-600">6</p>
              <p class="text-sm text-blue-600 mt-1">Ambdós fills</p>
            </div>
            <div class="bg-blue-50 p-3 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Pagaments Pendents</p>
              <p class="text-3xl font-bold text-yellow-600">€48</p>
              <p class="text-sm text-yellow-600 mt-1">Setembre 2025</p>
            </div>
            <div class="bg-yellow-50 p-3 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Missatges Nous</p>
              <p class="text-3xl font-bold text-purple-600">2</p>
              <p class="text-sm text-purple-600 mt-1">Del centre</p>
            </div>
            <div class="bg-purple-50 p-3 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Activitats dels Fills -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Activitats Aquesta Setmana</h3>
            <button class="text-purple-600 hover:text-purple-800 text-sm font-medium">
              Veure calendari
            </button>
          </div>
          <div class="space-y-4">
            <div class="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span class="text-blue-600 font-semibold text-sm">MF</span>
                </div>
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h4 class="text-sm font-semibold text-gray-900">Marc - Futbol Iniciació</h4>
                  <span class="text-xs text-gray-500">Dl 16:00</span>
                </div>
                <p class="text-sm text-gray-600">Monitor: Joan Pérez</p>
                <div class="mt-2">
                  <span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    Present
                  </span>
                </div>
              </div>
            </div>

            <div class="flex items-start space-x-4 p-4 bg-pink-50 rounded-lg border-l-4 border-pink-400">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <span class="text-pink-600 font-semibold text-sm">AF</span>
                </div>
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h4 class="text-sm font-semibold text-gray-900">Anna - Taller d'Art</h4>
                  <span class="text-xs text-gray-500">Dt 15:30</span>
                </div>
                <p class="text-sm text-gray-600">Monitor: Maria Soler</p>
                <div class="mt-2">
                  <span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-pink-100 text-pink-800">
                    Present
                  </span>
                </div>
              </div>
            </div>

            <div class="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span class="text-green-600 font-semibold text-sm">2</span>
                </div>
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h4 class="text-sm font-semibold text-gray-900">Ambdós - Estudi Dirigit</h4>
                  <span class="text-xs text-gray-500">Cada dia 17:00</span>
                </div>
                <p class="text-sm text-gray-600">Deures i reforç</p>
                <div class="mt-2">
                  <span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Participen
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Comunicacions del Centre -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Comunicacions</h3>
          <div class="space-y-4">
            <div class="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                  <svg class="w-5 h-5 text-purple-600 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Reunió de pares i mares</p>
                  <p class="text-sm text-gray-600 mt-1">Us convidem a la reunió informativa del proper dijous a les 19:00 per parlar del curs escolar.</p>
                  <p class="text-xs text-gray-500 mt-2">Direcció - Ahir</p>
                  <button class="text-purple-600 hover:text-purple-800 text-xs font-medium mt-1">Confirmar assistència</button>
                </div>
              </div>
            </div>

            <div class="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                  <svg class="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Recorda: pagament mensual</p>
                  <p class="text-sm text-gray-600 mt-1">El pagament de setembre (€48) vencia el dia 15. Si us plau, efectueu el pagament el més aviat possible.</p>
                  <p class="text-xs text-gray-500 mt-2">Administració - Fa 2 dies</p>
                  <button class="text-blue-600 hover:text-blue-800 text-xs font-medium mt-1">Pagar ara</button>
                </div>
              </div>
            </div>

            <div class="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                  <svg class="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Excel·lent assistència!</p>
                  <p class="text-sm text-gray-600 mt-1">Els vostres fills han tingut una assistència del 98% aquest mes. Felicitats per la constància!</p>
                  <p class="text-xs text-gray-500 mt-2">Sistema - Fa 1 setmana</p>
                </div>
              </div>
            </div>
          </div>

          <button class="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg">
            Enviar Missatge al Centre
          </button>
        </div>
      </div>

      <!-- Historial de Pagaments -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Historial de Pagaments</h3>
            <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Descarregar Rebuts
            </button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mes</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Import</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Concepte</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estat</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Pagament</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Setembre 2025</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€48,00</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Activitats extraescolars</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pendent
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Agost 2025</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€48,00</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Activitats extraescolars</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Pagat
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">14/08/2025</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Juliol 2025</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€48,00</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Activitats extraescolars</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Pagat
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12/07/2025</td>
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