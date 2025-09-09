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
          <UserMenu />
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
          <DashboardCard 
            title="Usuaris del Centre"
            description="Monitors, coordinadors i famílies"
            icon="👤"
            color="blue"
            :stats="[{label: 'Total Usuaris', value: '156'}]"
          />
          
          <!-- Gestió Estudiants -->
          <DashboardCard 
            title="Estudiants"
            description="Alumnes del centre educatiu"
            icon="🎓"
            color="blue"
            :stats="[{label: 'Estudiants', value: '234'}]"
          />
          
          <!-- Configuració Serveis -->
          <DashboardCard 
            title="Serveis"
            description="Menjador, acollida, extraescolars"
            icon="🍽️"
            color="blue"
            :stats="[{label: 'Serveis Actius', value: '5'}]"
          />
          
          <!-- Reports i Estadístiques -->
          <DashboardCard 
            title="Reports"
            description="Informes d'assistència i facturació"
            icon="📈"
            color="blue"
            :stats="[{label: 'Reports', value: '28'}]"
          />
          
          <!-- Facturació -->
          <DashboardCard 
            title="Facturació"
            description="Gestió de pagaments i factures"
            icon="💰"
            color="blue"
            :stats="[{label: 'Pendent', value: '€2.345'}]"
          />
          
          <!-- Comunicació -->
          <DashboardCard 
            title="Comunicació"
            description="Notificacions a famílies"
            icon="📢"
            color="blue"
            :stats="[{label: 'Missatges', value: '12'}]"
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
