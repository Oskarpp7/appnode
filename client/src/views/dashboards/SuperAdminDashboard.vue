<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar superior -->
    <nav class="bg-white shadow mb-6">
      <div class="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <div class="flex items-center gap-4">
          <span class="text-2xl mr-2">🏫</span>
          <span class="font-bold text-xl text-gray-800">Gestió Escolar</span>
        </div>
        <div class="flex items-center gap-4">
          <button class="text-gray-600 hover:text-blue-600">Centres</button>
          <button class="text-gray-600 hover:text-blue-600">Usuaris</button>
          <button class="text-gray-600 hover:text-blue-600">Serveis</button>
          <button class="text-gray-600 hover:text-blue-600">Facturació</button>
          <button class="text-gray-600 hover:text-blue-600">Logs</button>
          <button class="text-gray-600 hover:text-blue-600">Configuració</button>
          <div class="ml-4 flex items-center gap-2">
            <span class="font-semibold text-gray-700">Super Admin</span>
            <span class="text-2xl">👤</span>
            <button class="text-red-500 ml-2">Sortir</button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Gestió Global del Sistema</h2>

      <!-- KPIs -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <DashboardCard title="Ingressos Mensuals" icon="💰" value="€12.500" color="bg-green-100 text-green-800" />
        <DashboardCard title="Ocupació Menjador" icon="🏫" value="85%" color="bg-blue-100 text-blue-800" />
        <DashboardCard title="Taxa Cobrament" icon="📈" value="97%" color="bg-yellow-100 text-yellow-800" />
        <DashboardCard title="Assistència Diària" icon="✅" value="1.230" color="bg-indigo-100 text-indigo-800" />
      </div>

      <!-- Gràfics -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-2">Evolució Inscripcions (12 mesos)</h3>
          <ChartInscripcions />
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-2">Ingressos per Servei</h3>
          <ChartIngressosServei />
        </div>
      </div>

      <!-- Taules i llistats -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-2">Llistat d'Escoles</h3>
          <SchoolList />
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-2">Llistat d'Usuaris Globals</h3>
          <UserList />
        </div>
      </div>

      <!-- Logs i notificacions -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-2">Logs i Monitorització</h3>
          <LogList />
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-2">Notificacions Globals</h3>
          <NotificationList />
        </div>
      </div>

      <!-- Accions ràpides -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <QuickActionCard title="Crear Centre" icon="➕" />
        <QuickActionCard title="Crear Usuari Global" icon="➕" />
        <QuickActionCard title="Gestionar Serveis" icon="🛠️" />
        <QuickActionCard title="Exportar Dades" icon="📤" />
      </div>

      <!-- Configuració -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h3 class="text-lg font-semibold mb-2">Configuració Global</h3>
        <ConfigPanel />
      </div>
    </main>
  </div>
</template>

<script>
import DashboardCard from '@/components/DashboardCard.vue'
import ChartInscripcions from '@/components/ChartInscripcions.vue'
import ChartIngressosServei from '@/components/ChartIngressosServei.vue'
import SchoolList from '@/components/SchoolList.vue'
import UserList from '@/components/UserList.vue'
import LogList from '@/components/LogList.vue'
import NotificationList from '@/components/NotificationList.vue'
import QuickActionCard from '@/components/QuickActionCard.vue'
import ConfigPanel from '@/components/ConfigPanel.vue'

export default {
  name: 'SuperAdminDashboard',
  components: {
    DashboardCard,
    ChartInscripcions,
    ChartIngressosServei,
    SchoolList,
    UserList,
    LogList,
    NotificationList,
    QuickActionCard,
    ConfigPanel
  }
}
</script>
