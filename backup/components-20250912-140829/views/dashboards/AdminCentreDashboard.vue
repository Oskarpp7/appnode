<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <PageHeader 
      title="Centre Educatiu" 
      subtitle="Administració del Centre"
      :breadcrumbs="[
        { name: 'Inici', href: '/' },
        { name: 'Admin Centre' }
      ]"
    />

    <!-- Loading State -->
    <div v-if="loading" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Skeleton type="card" v-for="n in 4" :key="n" />
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton type="chart" class="lg:col-span-2" />
        <Skeleton type="list" />
      </div>
      <Skeleton type="table" />
    </div>

    <!-- Dashboard Content -->
    <div v-else class="space-y-6">
      <!-- KPI Cards -->
      <MetricGroup>
        <StatCard 
          title="Estudiants Actius" 
          :value="kpis.activeStudents" 
          icon="AcademicCapIcon"
          trend="+8"
          trend-type="positive"
          :progress="95"
          description="Matriculats aquest curs"
        />
        <StatCard 
          title="Assistència Avui" 
          :value="`${kpis.todayAttendance}%`" 
          icon="CalendarDaysIcon"
          trend="+2.3%"
          trend-type="positive"
          :progress="kpis.todayAttendance"
          description="Presents avui"
        />
        <StatCard 
          title="Facturació Pendent" 
          :value="`€${kpis.pendingBilling.toLocaleString()}`" 
          icon="CurrencyEuroIcon"
          trend="-15%"
          trend-type="positive"
          description="A cobrar aquest mes"
        />
        <StatCard 
          title="Serveis Actius" 
          :value="kpis.activeServices" 
          icon="CogIcon"
          description="Menjador, Matí, Tarda..."
        />
      </MetricGroup>

      <!-- Charts and Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Weekly Attendance Trend -->
        <div class="lg:col-span-2 bg-white rounded-xl p-6 shadow-soft">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Assistència Setmanal</h3>
              <p class="text-sm text-gray-500">Evolució dels últims 7 dies</p>
            </div>
            <div class="flex space-x-2">
              <button 
                v-for="service in ['Tots', 'Menjador', 'Acollida']"
                :key="service"
                :class="[
                  'px-3 py-1 text-xs font-medium rounded-md transition-colors',
                  selectedService === service 
                    ? 'bg-admin-centre-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                ]"
                @click="selectedService = service"
              >
                {{ service }}
              </button>
            </div>
          </div>
          <TrendLine :data="attendanceChartData" height="280" />
        </div>

        <!-- Recent Enrollments -->
        <div class="bg-white rounded-xl p-6 shadow-soft">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Inscripcions Recents</h3>
            <button class="text-admin-centre-600 hover:text-admin-centre-700 text-sm font-medium">
              Veure totes
            </button>
          </div>
          <div class="space-y-4">
            <div 
              v-for="enrollment in recentEnrollments" 
              :key="enrollment.id"
              class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div class="flex-shrink-0">
                <div class="h-10 w-10 bg-admin-centre-100 rounded-full flex items-center justify-center">
                  <AcademicCapIcon class="h-5 w-5 text-admin-centre-600" />
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ enrollment.studentName }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ enrollment.service }} • {{ enrollment.date }}
                </p>
              </div>
              <div class="flex-shrink-0">
                <span :class="getEnrollmentStatusClass(enrollment.status)" 
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                  {{ enrollment.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Services Overview -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Services Cards -->
        <div class="bg-white rounded-xl shadow-soft">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900">Serveis del Centre</h3>
              <button class="btn-primary btn-sm">
                <PlusIcon class="h-4 w-4 mr-2" />
                Nou Servei
              </button>
            </div>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div 
                v-for="service in services" 
                :key="service.id"
                class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-center space-x-3">
                  <div :class="`bg-${service.color}-100`" class="p-2 rounded-lg">
                    <component :is="service.icon" :class="`text-${service.color}-600`" class="h-5 w-5" />
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">{{ service.name }}</h4>
                    <p class="text-sm text-gray-500">{{ service.enrolled }} inscrits</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span :class="getServiceStatusClass(service.status)" 
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                    {{ service.status }}
                  </span>
                  <button class="text-gray-400 hover:text-gray-600">
                    <CogIcon class="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Billing Chart -->
        <div class="bg-white rounded-xl p-6 shadow-soft">
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Facturació Mensual</h3>
            <p class="text-sm text-gray-500">Ingressos per servei</p>
          </div>
          <DonutChart 
            :data="billingChartData" 
            height="300"
            :center-value="`€${billingChartData.datasets[0].data.reduce((a, b) => a + b, 0).toLocaleString()}`"
            center-label="Total Mes"
          />
        </div>
      </div>

      <!-- Quick Actions -->
      <QuickActions 
        title="Accions del Centre"
        :actions="quickActions"
        @action="handleQuickAction"
      />

      <!-- Alerts -->
      <InfoBanner 
        v-if="centreAlerts.length > 0"
        :type="centreAlerts[0].type"
        :title="centreAlerts[0].title"
        :description="centreAlerts[0].description"
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
import QuickActions from '@/components/ui/QuickActions.vue'
import InfoBanner from '@/components/ui/InfoBanner.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import { 
  PlusIcon, 
  AcademicCapIcon, 
  CalendarDaysIcon, 
  CurrencyEuroIcon,
  CogIcon
} from '@heroicons/vue/24/outline'

// Composables
const { theme } = useRoleTheme()

// Reactive data
const loading = ref(true)
const selectedService = ref('Tots')
const centreAlerts = ref([])

// KPIs
const kpis = ref({
  activeStudents: 0,
  todayAttendance: 0,
  pendingBilling: 0,
  activeServices: 0
})

// Services data
const services = ref([])
const recentEnrollments = ref([])

// Chart data
const attendanceChartData = computed(() => ({
  labels: ['Dill', 'Dim', 'Dim', 'Dij', 'Div', 'Dis', 'Diu'],
  datasets: [{
    label: 'Assistència (%)',
    data: [92, 88, 94, 87, 91, 85, 89],
    borderColor: theme.value.colors[600],
    backgroundColor: `${theme.value.colors[600]}20`,
    tension: 0.4
  }]
}))

const billingChartData = computed(() => ({
  labels: ['Menjador', 'Acollida Matí', 'Acollida Tarda', 'Extraescolars'],
  datasets: [{
    data: [8500, 3200, 2800, 1900],
    backgroundColor: [
      theme.value.colors[600],
      theme.value.colors[500],
      theme.value.colors[400],
      theme.value.colors[300]
    ]
  }]
}))

// Quick actions
const quickActions = [
  { 
    label: 'Passar Llista', 
    icon: 'ClipboardDocumentCheckIcon', 
    action: 'attendance',
    shortcut: 'L'
  },
  { 
    label: 'Nou Estudiant', 
    icon: 'UserPlusIcon', 
    action: 'new-student',
    shortcut: 'E'
  },
  { 
    label: 'Generar Factures', 
    icon: 'DocumentTextIcon', 
    action: 'generate-invoices',
    shortcut: 'F'
  },
  { 
    label: 'Informes', 
    icon: 'ChartBarIcon', 
    action: 'reports',
    shortcut: 'I'
  },
  { 
    label: 'Configurar Serveis', 
    icon: 'Cog6ToothIcon', 
    action: 'config-services',
    shortcut: 'S'
  },
  { 
    label: 'Comunicacions', 
    icon: 'ChatBubbleLeftRightIcon', 
    action: 'communications',
    shortcut: 'C'
  }
]

// Methods
const loadDashboardData = async () => {
  loading.value = true
  
  try {
    // TODO: Replace with real API calls
    await new Promise(resolve => setTimeout(resolve, 1200))
    
    // Mock data
    kpis.value = {
      activeStudents: 425,
      todayAttendance: 87,
      pendingBilling: 12450,
      activeServices: 6
    }

    services.value = [
      { id: 1, name: 'Menjador', enrolled: 380, status: 'Actiu', color: 'blue', icon: 'CakeIcon' },
      { id: 2, name: 'Acollida Matí', enrolled: 125, status: 'Actiu', color: 'green', icon: 'SunIcon' },
      { id: 3, name: 'Acollida Tarda', enrolled: 200, status: 'Actiu', color: 'orange', icon: 'MoonIcon' },
      { id: 4, name: 'Extraescolars', enrolled: 85, status: 'Actiu', color: 'purple', icon: 'AcademicCapIcon' },
      { id: 5, name: 'Colònies Estiu', enrolled: 45, status: 'Inactiu', color: 'gray', icon: 'MapIcon' },
      { id: 6, name: 'Transport', enrolled: 60, status: 'Actiu', color: 'yellow', icon: 'TruckIcon' }
    ]

    recentEnrollments.value = [
      { id: 1, studentName: 'Maria García', service: 'Menjador', date: '10 Set', status: 'Pendent' },
      { id: 2, studentName: 'Joan Martí', service: 'Acollida Matí', date: '9 Set', status: 'Confirmat' },
      { id: 3, studentName: 'Laura Puig', service: 'Extraescolars', date: '8 Set', status: 'Confirmat' },
      { id: 4, studentName: 'Marc López', service: 'Transport', date: '7 Set', status: 'Pendent' }
    ]

    // Check for alerts
    if (kpis.value.todayAttendance < 85) {
      centreAlerts.value.push({
        type: 'warning',
        title: 'Assistència baixa detectada',
        description: `L'assistència d'avui (${kpis.value.todayAttendance}%) està per sota del promig habitual.`
      })
    }
    
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  } finally {
    loading.value = false
  }
}

const getEnrollmentStatusClass = (status) => {
  const classes = {
    'Confirmat': 'bg-green-100 text-green-800',
    'Pendent': 'bg-yellow-100 text-yellow-800',
    'Rebutjat': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getServiceStatusClass = (status) => {
  const classes = {
    'Actiu': 'bg-green-100 text-green-800',
    'Inactiu': 'bg-gray-100 text-gray-800',
    'Manteniment': 'bg-yellow-100 text-yellow-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const handleQuickAction = (action) => {
  console.log('Quick action:', action)
  // TODO: Implement action handlers
}

const dismissAlert = (index) => {
  centreAlerts.value.splice(index, 1)
}

// Lifecycle
onMounted(() => {
  loadDashboardData()
})
</script>

<style scoped>
.btn-primary {
  background-color: #059669;
  color: white;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.btn-primary:hover {
  background-color: #047857;
}

.btn-primary:focus {
  outline: 2px solid #059669;
  outline-offset: 2px;
}

.btn-sm {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}
</style>

