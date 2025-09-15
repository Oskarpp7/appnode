<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <nav class="bg-red-600 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-white">
              🚀 SuperAdmin Dashboard
            </h1>
          </div>
          <UserMenu />
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">
          Gestió Global del Sistema
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Gestió Tenants -->
          <DashboardCard 
            title="Gestió Centres"
            description="Crear i gestionar centres educatius"
            icon="🏫"
            color="red"
            :stats="[{label: 'Centres Actius', value: '12'}]"
          />
          
          <!-- Gestió Usuaris Globals -->
          <DashboardCard 
            title="Usuaris Globals"
            description="Administradors i super usuaris"
            icon="👥"
            color="red"
            :stats="[{label: 'Super Admins', value: '3'}]"
          />
          
          <!-- Monitorització Sistema -->
          <DashboardCard 
            title="Monitorització"
            description="Estat del sistema i rendiment"
            icon="📊"
            color="red"
            :stats="[{label: 'Uptime', value: '99.9%'}]"
          />
          
          <!-- Configuració Global -->
          <DashboardCard 
            title="Configuració"
            description="Paràmetres globals del sistema"
            icon="⚙️"
            color="red"
            :stats="[{label: 'Mòduls', value: '8'}]"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import DashboardCard from '@/components/DashboardCard.vue'
import UserMenu from '@/components/UserMenu.vue'
</script>
