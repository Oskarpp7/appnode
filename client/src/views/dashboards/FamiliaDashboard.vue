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
          <UserMenu />
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
          <DashboardCard 
            title="Assistència Setmanal"
            description="Seguiment assistència dels fills"
            icon="📅"
            color="purple"
            :stats="[{label: 'Aquesta setmana', value: '95%'}]"
          />
          
          <!-- Menjador -->
          <DashboardCard 
            title="Servei Menjador" 
            description="Menu i assistència menjador"
            icon="🍽️"
            color="purple"
            :stats="[{label: 'Dies contractats', value: '5'}]"
          />
          
          <!-- Facturació -->
          <DashboardCard 
            title="Facturació"
            description="Rebuts i pagaments pendents"
            icon="💳"
            color="purple"
            :stats="[{label: 'Pendent', value: '€125'}]"
          />
          
          <!-- Comunicacions -->
          <DashboardCard 
            title="Comunicacions"
            description="Missatges del centre"
            icon="📧"
            color="purple"
            :stats="[{label: 'Nous', value: '2'}]"
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
