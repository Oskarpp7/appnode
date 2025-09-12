<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <PageHeader 
      title="Coordinació de Serveis" 
      subtitle="Gestió operativa i supervisió"
      :breadcrumbs="[
        { name: 'Inici', href: '/' },
        { name: 'Coordinador' }
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
          title="Grups Assignats" 
          :value="kpis.assignedGroups" 
          icon="UsersIcon"
          description="Serveis sota supervisió"
        />
        <StatCard 
          title="Incidències Avui" 
          :value="kpis.todayIncidents" 
          icon="ExclamationTriangleIcon"
          trend="-2"
          trend-type="positive"
          description="Incidents reportats"
        />
        <StatCard 
          title="Alertes Al·lèrgies" 
          :value="kpis.allergyAlerts" 
          icon="ShieldExclamationIcon"
          description="Estudiants amb restriccions"
        />
        <StatCard 
          title="Tasques Pendents" 
          :value="kpis.pendingTasks" 
          icon="ClipboardDocumentListIcon"
          description="Per completar avui"
        />
      </MetricGroup>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Quick Start Section -->
        <div class="lg:col-span-2 bg-white rounded-xl p-6 shadow-soft">
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Passar Llista Tàctil</h3>
            <p class="text-sm text-gray-500">Inicia ràpidament el control d'assistència</p>
          </div>
          
          <div class="mb-6">
            <button class="w-full bg-coordinador-600 hover:bg-coordinador-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors shadow-lg">
              <div class="flex items-center justify-center space-x-3">
                <ClipboardDocumentCheckIcon class="h-8 w-8" />
                <span class="text-lg">Iniciar Passa Llista Tàctil</span>
              </div>
            </button>
          </div>

          <!-- Service Occupancy -->
          <div class="mb-6">
            <h4 class="text-md font-medium text-gray-900 mb-4">Ocupació Serveis</h4>
            <DonutChart 
              :data="occupancyChartData" 
              height="200"
              :center-value="occupancyChartData.datasets[0].data.reduce((a, b) => a + b, 0)"
              center-label="Total Grups"
            />
          </div>
        </div>

        <!-- Today's Groups -->
        <div class="bg-white rounded-xl p-6 shadow-soft">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Grups d'Avui</h3>
            <span class="text-sm text-gray-500">{{ todayGroups.length }} actius</span>
          </div>
          
          <div class="space-y-4">
            <div 
              v-for="group in todayGroups" 
              :key="group.id"
              class="p-4 border-l-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              :class="`border-${group.color}-500 bg-${group.color}-50`"
              @click="handleGroupClick(group)"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">{{ group.name }}</h4>
                  <p class="text-xs text-gray-500">{{ group.time }} • {{ group.students }} estudiants</p>
                </div>
                <div class="flex items-center space-x-2">
                  <span :class="getGroupStatusClass(group.status)" 
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                    {{ group.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Incidents and Communications -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Incidents -->
        <div class="bg-white rounded-xl shadow-soft">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900">Incidències Recents</h3>
              <button class="text-coordinador-600 hover:text-coordinador-700 text-sm font-medium">
                Veure totes
              </button>
            </div>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div 
                v-for="incident in recentIncidents" 
                :key="incident.id"
                class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <div :class="getIncidentIconClass(incident.type)" class="p-2 rounded-full">
                  <component :is="incident.icon" class="h-4 w-4" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900">{{ incident.title }}</p>
                  <p class="text-sm text-gray-500">{{ incident.description }}</p>
                  <p class="text-xs text-gray-400 mt-1">{{ incident.time }}</p>
                </div>
                <span :class="getIncidentPriorityClass(incident.priority)" 
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                  {{ incident.priority }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Communications -->
        <div class="bg-white rounded-xl shadow-soft">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900">Comunicacions</h3>
              <button class="btn-primary btn-sm">
                <PlusIcon class="h-4 w-4 mr-2" />
                Nova
              </button>
            </div>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div 
                v-for="communication in communications" 
                :key="communication.id"
                class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 bg-coordinador-100 rounded-full flex items-center justify-center">
                    <ChatBubbleLeftRightIcon class="h-5 w-5 text-coordinador-600" />
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900">{{ communication.from }}</p>
                  <p class="text-sm text-gray-600 truncate">{{ communication.message }}</p>
                  <p class="text-xs text-gray-400 mt-1">{{ communication.time }}</p>
                </div>
                <button class="text-coordinador-600 hover:text-coordinador-700">
                  <ArrowTopRightOnSquareIcon class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <QuickActions 
        title="Coordinació Diària"
        :actions="quickActions"
        @action="handleQuickAction"
      />

      <!-- Alerts -->
      <InfoBanner 
        v-if="coordinatorAlerts.length > 0"
        :type="coordinatorAlerts[0].type"
        :title="coordinatorAlerts[0].title"
        :description="coordinatorAlerts[0].description"
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
import DonutChart from '@/components/ui/DonutChart.vue'
import QuickActions from '@/components/ui/QuickActions.vue'
import InfoBanner from '@/components/ui/InfoBanner.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import { 
  PlusIcon,
  UsersIcon,
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
  ClipboardDocumentListIcon,
  ClipboardDocumentCheckIcon,
  ChatBubbleLeftRightIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/vue/24/outline'

// Composables
const { theme } = useRoleTheme()

// Reactive data
const loading = ref(true)
const coordinatorAlerts = ref([])

// KPIs
const kpis = ref({
  assignedGroups: 0,
  todayIncidents: 0,
  allergyAlerts: 0,
  pendingTasks: 0
})

// Today's groups
const todayGroups = ref([])
const recentIncidents = ref([])
const communications = ref([])

// Chart data
const occupancyChartData = computed(() => ({
  labels: ['Menjador', 'Acollida Matí', 'Acollida Tarda', 'Extraescolars'],
  datasets: [{
    data: [25, 18, 22, 12],
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
    label: 'Planificar Sessió', 
    icon: 'CalendarIcon', 
    action: 'schedule-session',
    shortcut: 'P'
  },
  { 
    label: 'Gestió Monitors', 
    icon: 'UsersIcon', 
    action: 'manage-monitors',
    shortcut: 'M'
  },
  { 
    label: 'Revisar Incidents', 
    icon: 'ExclamationTriangleIcon', 
    action: 'review-incidents',
    shortcut: 'I'
  },
  { 
    label: 'Nova Comunicació', 
    icon: 'ChatBubbleLeftRightIcon', 
    action: 'new-communication',
    shortcut: 'C'
  },
  { 
    label: 'Informes Setmanals', 
    icon: 'DocumentTextIcon', 
    action: 'weekly-reports',
    shortcut: 'R'
  },
  { 
    label: 'Configurar Alertes', 
    icon: 'BellIcon', 
    action: 'configure-alerts',
    shortcut: 'A'
  }
]

// Methods
const loadDashboardData = async () => {
  loading.value = true
  
  try {
    // TODO: Replace with real API calls
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock data
    kpis.value = {
      assignedGroups: 6,
      todayIncidents: 2,
      allergyAlerts: 8,
      pendingTasks: 4
    }

    todayGroups.value = [
      { id: 1, name: 'Menjador P3-P4', time: '12:00-14:00', students: 25, status: 'Actiu', color: 'green' },
      { id: 2, name: 'Acollida Matí', time: '07:30-09:00', students: 18, status: 'Complet', color: 'blue' },
      { id: 3, name: 'Extraescolars', time: '16:00-17:00', students: 22, status: 'Actiu', color: 'orange' },
      { id: 4, name: 'Acollida Tarda', time: '17:00-18:30', students: 12, status: 'Pendent', color: 'yellow' }
    ]

    recentIncidents.value = [
      { 
        id: 1, 
        title: 'Al·lèrgia alimentària', 
        description: 'Maria P. - reacció lleu al menú', 
        time: '14:30', 
        type: 'allergy',
        priority: 'Alta',
        icon: 'ShieldExclamationIcon'
      },
      { 
        id: 2, 
        title: 'Absència monitor', 
        description: 'Joan M. no ha arribat a l\'extraescolar', 
        time: '16:15', 
        type: 'staff',
        priority: 'Mitjana',
        icon: 'UserMinusIcon'
      }
    ]

    communications.value = [
      { id: 1, from: 'Família García', message: 'Maria no vindrà demà a extraescolars', time: '15:45' },
      { id: 2, from: 'Monitor Pau', message: 'Necessito reforç per demà a informàtica', time: '14:20' },
      { id: 3, from: 'Direcció', message: 'Reunió coordinadors dimecres 16h', time: '12:10' }
    ]

    // Check for alerts
    if (kpis.value.todayIncidents > 3) {
      coordinatorAlerts.value.push({
        type: 'warning',
        title: 'Molts incidents avui',
        description: `S'han reportat ${kpis.value.todayIncidents} incidents. Revisa si cal prendre mesures.`
      })
    }
    
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  } finally {
    loading.value = false
  }
}

const getGroupStatusClass = (status) => {
  const classes = {
    'Actiu': 'bg-green-100 text-green-800',
    'Complet': 'bg-blue-100 text-blue-800',
    'Pendent': 'bg-yellow-100 text-yellow-800',
    'Inactiu': 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getIncidentIconClass = (type) => {
  const classes = {
    'allergy': 'bg-red-100 text-red-600',
    'staff': 'bg-yellow-100 text-yellow-600',
    'incident': 'bg-orange-100 text-orange-600'
  }
  return classes[type] || 'bg-gray-100 text-gray-600'
}

const getIncidentPriorityClass = (priority) => {
  const classes = {
    'Alta': 'bg-red-100 text-red-800',
    'Mitjana': 'bg-yellow-100 text-yellow-800',
    'Baixa': 'bg-green-100 text-green-800'
  }
  return classes[priority] || 'bg-gray-100 text-gray-800'
}

const handleGroupClick = (group) => {
  console.log('Group clicked:', group)
  // TODO: Navigate to group attendance
}

const handleQuickAction = (action) => {
  console.log('Quick action:', action)
  // TODO: Implement action handlers
}

const dismissAlert = (index) => {
  coordinatorAlerts.value.splice(index, 1)
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
