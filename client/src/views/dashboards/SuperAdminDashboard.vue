<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <PageHeader 
      title="Dashboard Global" 
      subtitle="Super Administració del Sistema"
      :breadcrumbs="[
        { name: 'Inici', href: '/' },
        { name: 'Super Admin' }
      ]"
    />

    <!-- Loading State -->
    <div v-if="loading" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Skeleton type="card" v-for="n in 4" :key="n" />
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Skeleton type="chart" class="lg:col-span-3" />
        <Skeleton type="chart" class="lg:col-span-2" />
      </div>
      <Skeleton type="table" />
    </div>

    <!-- Dashboard Content -->
    <div v-else class="space-y-6">
      <!-- KPI Cards -->
      <MetricGroup>
        <StatCard 
          title="Centres Actius" 
          :value="kpis.centres" 
          icon="BuildingOffice2Icon"
          trend="+2"
          trend-type="positive"
          :progress="85"
          description="8 centres operatius"
        />
        <StatCard 
          title="Usuaris Totals" 
          :value="kpis.users.toLocaleString()" 
          icon="UsersIcon"
          trend="+12.5%"
          trend-type="positive"
          description="Crescut aquest mes"
        />
        <StatCard 
          title="Estudiants Actius" 
          :value="kpis.students.toLocaleString()" 
          icon="AcademicCapIcon"
          trend="+156"
          trend-type="positive"
          :progress="92"
          description="Matriculats aquest curs"
        />
        <StatCard 
          title="Ingressos Mes" 
          :value="`€${kpis.revenue.toLocaleString()}`" 
          icon="CurrencyEuroIcon"
          trend="+8.3%"
          trend-type="positive"
          description="Facturació setembre"
        />
      </MetricGroup>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <!-- Revenue Trend -->
        <div class="lg:col-span-3 bg-white rounded-xl p-6 shadow-soft">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Evolució Ingressos</h3>
              <p class="text-sm text-gray-500">Últims 12 mesos</p>
            </div>
            <div class="flex space-x-2">
              <button 
                v-for="period in ['3M', '6M', '12M']"
                :key="period"
                :class="[
                  'px-3 py-1 text-xs font-medium rounded-md transition-colors',
                  selectedPeriod === period 
                    ? 'bg-super-admin-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                ]"
                @click="selectedPeriod = period"
              >
                {{ period }}
              </button>
            </div>
          </div>
          <TrendLine 
            :data="revenueChartData" 
            height="300"
            :period="selectedPeriod"
          />
        </div>

        <!-- Services Distribution -->
        <div class="lg:col-span-2 bg-white rounded-xl p-6 shadow-soft">
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Distribució Serveis</h3>
            <p class="text-sm text-gray-500">Per tipus de servei</p>
          </div>
          <DonutChart 
            :data="servicesChartData" 
            height="300"
            :center-value="servicesChartData.datasets[0].data.reduce((a, b) => a + b, 0)"
            center-label="Total Serveis"
          />
        </div>
      </div>

      <!-- Centers Table -->
      <div class="bg-white rounded-xl shadow-soft">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Centres Educatius</h3>
              <p class="text-sm text-gray-500">Gestió dels centres del sistema</p>
            </div>
            <button class="btn-primary btn-sm">
              <PlusIcon class="h-4 w-4 mr-2" />
              Afegir Centre
            </button>
          </div>
        </div>
        <DataTable 
          :columns="centresColumns"
          :rows="centres"
          :search-enabled="true"
          :sort-enabled="true"
          :pagination-enabled="true"
          :per-page="10"
        />
      </div>

      <!-- Quick Actions -->
      <QuickActions 
        title="Accions Ràpides"
        :actions="quickActions"
        @action="handleQuickAction"
      />

      <!-- System Alerts -->
      <InfoBanner 
        v-if="systemAlerts.length > 0"
        :type="systemAlerts[0].type"
        :title="systemAlerts[0].title"
        :description="systemAlerts[0].description"
        :dismissible="true"
        @dismiss="dismissAlert(0)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoleTheme } from '@/composables/useRoleTheme'
import PageHeader from '@/components/ui/PageHeader.vue'
import MetricGroup from '@/components/ui/MetricGroup.vue'
import StatCard from '@/components/ui/StatCard.vue'
import TrendLine from '@/components/ui/TrendLine.vue'
import DonutChart from '@/components/ui/DonutChart.vue'
import DataTable from '@/components/ui/DataTable.vue'
import QuickActions from '@/components/ui/QuickActions.vue'
import InfoBanner from '@/components/ui/InfoBanner.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'

// Composables
const { theme, currentRole } = useRoleTheme()

// Reactive data
const loading = ref(true)
const selectedPeriod = ref('12M')
const systemAlerts = ref([])

// KPIs
const kpis = ref({
  centres: 0,
  users: 0,
  students: 0,
  revenue: 0
})

// Centers data
const centres = ref([])
const centresColumns = [
  { key: 'name', label: 'Centre', sortable: true },
  { key: 'location', label: 'Ubicació', sortable: true },
  { key: 'students', label: 'Estudiants', sortable: true, align: 'right' },
  { key: 'services', label: 'Serveis', sortable: true, align: 'center' },
  { key: 'revenue', label: 'Ingressos', sortable: true, align: 'right', format: 'currency' },
  { key: 'status', label: 'Estat', badge: true, align: 'center' }
]

// Chart data
const revenueChartData = computed(() => ({
  labels: ['Gen', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Des'],
  datasets: [{
    label: 'Ingressos (€)',
    data: [65000, 72000, 68000, 78000, 82000, 85000, 88000, 75000, 92000, 89000, 94000, 98000],
    borderColor: theme.value.colors[600],
    backgroundColor: `${theme.value.colors[600]}20`,
    tension: 0.4
  }]
}))

const servicesChartData = computed(() => ({
  labels: ['Menjador', 'Acollida Matí', 'Acollida Tarda', 'Extraescolars', 'Colònies'],
  datasets: [{
    data: [45, 25, 18, 8, 4],
    backgroundColor: [
      theme.value.colors[600],
      theme.value.colors[500],
      theme.value.colors[400],
      theme.value.colors[300],
      theme.value.colors[200]
    ]
  }]
}))

// Quick actions
const quickActions = [
  { 
    label: 'Nou Centre', 
    icon: 'BuildingOffice2Icon', 
    action: 'create-center',
    shortcut: 'N'
  },
  { 
    label: 'Configuració Global', 
    icon: 'Cog6ToothIcon', 
    action: 'global-settings',
    shortcut: 'S'
  },
  { 
    label: 'Informes Analytics', 
    icon: 'ChartBarIcon', 
    action: 'analytics-reports',
    shortcut: 'A'
  },
  { 
    label: 'Gestió Usuaris', 
    icon: 'UsersIcon', 
    action: 'manage-users',
    shortcut: 'U'
  },
  { 
    label: 'Backups Sistema', 
    icon: 'ArchiveBoxIcon', 
    action: 'system-backups',
    shortcut: 'B'
  },
  { 
    label: 'Logs Auditoria', 
    icon: 'DocumentTextIcon', 
    action: 'audit-logs',
    shortcut: 'L'
  }
]

// Methods
const loadDashboardData = async () => {
  loading.value = true
  
  try {
    // TODO: Replace with real API calls
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock KPIs data
    kpis.value = {
      centres: 8,
      users: 1560,
      students: 4312,
      revenue: 94500
    }
    
    // Mock centers data
    centres.value = [
      {
        id: 1,
        name: 'CEIP Europa',
        location: 'Barcelona',
        students: 612,
        services: 5,
        revenue: 18500,
        status: { label: 'Actiu', color: 'green' }
      },
      {
        id: 2,
        name: 'Escola Maspujols',
        location: 'Tarragona',
        students: 410,
        services: 4,
        revenue: 12300,
        status: { label: 'Actiu', color: 'green' }
      },
      {
        id: 3,
        name: 'Col·legi Sant Pere',
        location: 'Girona',
        students: 523,
        services: 6,
        revenue: 16800,
        status: { label: 'Actiu', color: 'green' }
      },
      {
        id: 4,
        name: 'Escola Ponent',
        location: 'Lleida',
        students: 378,
        services: 3,
        revenue: 9200,
        status: { label: 'Manteniment', color: 'yellow' }
      },
      {
        id: 5,
        name: 'CEIP Mediterrani',
        location: 'Castelló',
        students: 445,
        services: 4,
        revenue: 13400,
        status: { label: 'Actiu', color: 'green' }
      }
    ]
    
    // Check for system alerts
    if (kpis.value.revenue < 50000) {
      systemAlerts.value.push({
        type: 'warning',
        title: 'Ingressos baixos detectats',
        description: 'Els ingressos del mes actual estan per sota de la mitjana. Revisa la facturació pendent.'
      })
    }
    
  } catch (error) {
    console.error('Error loading dashboard data:', error)
    systemAlerts.value.push({
      type: 'error',
      title: 'Error carregant dades',
      description: 'No s\'han pogut carregar les dades del dashboard. Torna-ho a intentar.'
    })
  } finally {
    loading.value = false
  }
}

const handleQuickAction = (action) => {
  console.log('Quick action:', action)
  // TODO: Implement action handlers
  switch (action) {
    case 'create-center':
      // Navigate to center creation
      break
    case 'global-settings':
      // Open global settings modal
      break
    case 'analytics-reports':
      // Navigate to analytics
      break
    case 'manage-users':
      // Navigate to user management
      break
    case 'system-backups':
      // Open backup management
      break
    case 'audit-logs':
      // Navigate to audit logs
      break
    default:
      console.warn('Unknown action:', action)
  }
}

const dismissAlert = (index) => {
  systemAlerts.value.splice(index, 1)
}

// Lifecycle
onMounted(() => {
  loadDashboardData()
})
</script>

<style scoped>
.btn-primary {
  background-color: #dc2626;
  color: white;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.btn-primary:hover {
  background-color: #b91c1c;
}

.btn-primary:focus {
  outline: 2px solid #dc2626;
  outline-offset: 2px;
}

.btn-sm {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}
</style>

