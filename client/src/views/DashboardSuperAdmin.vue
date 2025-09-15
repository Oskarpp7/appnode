<template>
  <DashboardLayout>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <!-- KPI Cards -->
      <DashboardCard title="Ingressos Mensuals" icon="💰" value="€12.500" color="bg-green-100 text-green-800" />
      <DashboardCard title="Ocupació Menjador" icon="🏫" value="85%" color="bg-blue-100 text-blue-800" />
      <DashboardCard title="Taxa Cobrament" icon="📈" value="97%" color="bg-yellow-100 text-yellow-800" />
      <DashboardCard title="Assistència Diària" icon="✅" value="1.230" color="bg-indigo-100 text-indigo-800" />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
      <!-- Gràfic evolució inscripcions -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-2">Evolució Inscripcions (12 mesos)</h3>
        <ChartInscripcions />
      </div>
      <!-- Gràfic ingressos per servei -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-2">Ingressos per Servei</h3>
        <ChartIngressosServei />
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6 mb-8">
      <h3 class="text-lg font-semibold mb-2">Llistat d'Escoles</h3>
      <SchoolList />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <!-- Notificacions globals -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-2">Notificacions Globals</h3>
        <NotificationList />
      </div>
      <!-- Logs i monitorització -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-2">Logs i Monitorització</h3>
        <LogList />
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import DashboardCard from '@/components/DashboardCard.vue'
import ChartInscripcions from '@/components/ChartInscripcions.vue'
import ChartIngressosServei from '@/components/ChartIngressosServei.vue'
import SchoolList from '@/components/SchoolList.vue'
import NotificationList from '@/components/NotificationList.vue'
import LogList from '@/components/LogList.vue'
</script>

<style scoped>
/* Personalització addicional si cal */
</style>
