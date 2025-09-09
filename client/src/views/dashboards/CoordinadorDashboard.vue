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
          <UserMenu />
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
          <DashboardCard 
            title="Planificació"
            description="Horaris i calendaris d'activitats"
            icon="📅"
            color="green"
            :stats="[{label: 'Activitats', value: '15'}]"
          />
          
          <!-- Monitors -->
          <DashboardCard 
            title="Gestió Monitors"
            description="Assignació i coordinació"
            icon="👩‍🏫"
            color="green"
            :stats="[{label: 'Monitors', value: '8'}]"
          />
          
          <!-- Assistència -->
          <DashboardCard 
            title="Control Assistència"
            description="Seguiment diari assistència"
            icon="✅"
            color="green"
            :stats="[{label: 'Avui', value: '89%'}]"
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
