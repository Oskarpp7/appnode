<template>
  <div class="dashboard-container">
    <!-- Header -->
    <PageHeader 
      title="Dashboard Família"
      subtitle="Seguiment dels meus fills"
      icon="UsersIcon"
      :theme="theme"
    />

    <!-- Loading State -->
    <div v-if="loading" class="dashboard-content">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <Skeleton class="h-32" v-for="i in 4" :key="i" />
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <Skeleton class="h-96" />
        </div>
        <div>
          <Skeleton class="h-96" />
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="dashboard-content">
      <!-- Els Meus Fills - Quick Overview -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Els Meus Fills</h2>
          <QuickActions 
            :actions="quickActions"
            :theme="theme"
            @action="handleQuickAction"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div 
            v-for="child in children" 
            :key="child.id"
            class="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-lg font-medium text-gray-900">{{ child.name }}</h3>
                <p class="text-sm text-gray-500">{{ child.class }} · {{ child.center }}</p>
              </div>
              <div class="flex items-center space-x-2">
                <CheckCircleIcon 
                  v-if="child.todayStatus === 'present'" 
                  class="h-5 w-5 text-green-500"
                />
                <XCircleIcon 
                  v-else-if="child.todayStatus === 'absent'" 
                  class="h-5 w-5 text-red-500"
                />
                <ClockIcon 
                  v-else 
                  class="h-5 w-5 text-yellow-500"
                />
              </div>
            </div>
            
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Assistència Setmana</span>
                <span class="text-sm font-medium" :class="child.weeklyAttendance >= 90 ? 'text-green-600' : 'text-yellow-600'">
                  {{ child.weeklyAttendance }}%
                </span>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Serveis Actius</span>
                <span class="text-sm font-medium text-gray-900">{{ child.activeServices }}</span>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Últim Missatge</span>
                <span class="text-xs text-gray-500">{{ child.lastMessage }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- KPIs Grid -->
      <MetricGroup title="Resum Aquesta Setmana" :theme="theme" class="mb-8">
        <StatCard
          title="Assistència Global"
          :value="kpis.totalAttendance"
          unit="%"
          :icon="CheckCircleIcon"
          :theme="theme"
          :trend="{ value: 2, direction: 'up' }"
        />
        <StatCard
          title="Dies Menjador"
          :value="kpis.lunchDays"
          unit="dies"
          :icon="BuildingStorefrontIcon"
          :theme="theme"
          :trend="{ value: 5, direction: 'neutral' }"
        />
        <StatCard
          title="Import Pendent"
          :value="kpis.pendingAmount"
          unit="€"
          :icon="CreditCardIcon"
          :theme="theme"
          :trend="{ value: 25, direction: 'down' }"
        />
        <StatCard
          title="Missatges Nous"
          :value="kpis.newMessages"
          :icon="BellIcon"
          :theme="theme"
          :trend="{ value: 3, direction: 'up' }"
        />
      </MetricGroup>

      <!-- Main Dashboard Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - Charts and Activity -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Attendance Trend -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Assistència Últimes 4 Setmanes</h3>
            </div>
            <div class="p-6">
              <TrendLine 
                :data="attendanceTrendData"
                :theme="theme"
                height="300"
                label="Assistència"
              />
            </div>
          </div>

          <!-- Services Overview -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Serveis Contractats</h3>
            </div>
            <div class="p-6">
              <DonutChart 
                :data="servicesData"
                :theme="theme"
                :show-legend="true"
              />
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Activitat Recent</h3>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div 
                  v-for="activity in recentActivity" 
                  :key="activity.id"
                  class="flex items-start space-x-3"
                >
                  <div class="flex-shrink-0">
                    <CheckCircleIcon 
                      v-if="activity.type === 'attendance'" 
                      class="h-5 w-5 text-green-500"
                    />
                    <CreditCardIcon 
                      v-else-if="activity.type === 'payment'" 
                      class="h-5 w-5 text-blue-500"
                    />
                    <BellIcon 
                      v-else 
                      class="h-5 w-5 text-yellow-500"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm text-gray-900">{{ activity.description }}</p>
                    <p class="text-xs text-gray-500">{{ activity.time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Messages and Billing -->
        <div class="space-y-6">
          <!-- Urgent Messages -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium text-gray-900">Missatges Importants</h3>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  {{ urgentMessages.length }}
                </span>
              </div>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div 
                  v-for="message in urgentMessages" 
                  :key="message.id"
                  class="border border-amber-200 bg-amber-50 rounded-lg p-4"
                >
                  <div class="flex justify-between items-start mb-2">
                    <h4 class="text-sm font-medium text-amber-800">{{ message.title }}</h4>
                    <button 
                      @click="markMessageAsRead(message.id)"
                      class="text-amber-600 hover:text-amber-800"
                    >
                      <XMarkIcon class="h-4 w-4" />
                    </button>
                  </div>
                  <p class="text-sm text-amber-700 mb-2">{{ message.description }}</p>
                  <p class="text-xs text-amber-600">{{ message.time }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Billing Summary -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Resum Facturació</h3>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">Pendent de pagament</span>
                  <span class="text-sm font-medium text-red-600">€{{ billing.pending }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">Pagat aquest mes</span>
                  <span class="text-sm font-medium text-green-600">€{{ billing.paidThisMonth }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">Previst aquest mes</span>
                  <span class="text-sm font-medium text-gray-900">€{{ billing.expectedThisMonth }}</span>
                </div>
                <hr class="my-3">
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-gray-900">Total anual</span>
                  <span class="text-sm font-medium text-gray-900">€{{ billing.yearlyTotal }}</span>
                </div>
              </div>
              
              <button class="w-full mt-4 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700">
                Veure Detall Facturació
              </button>
            </div>
          </div>

          <!-- Calendar Widget -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Calendari Setmana</h3>
            </div>
            <div class="p-6">
              <div class="space-y-2">
                <div 
                  v-for="day in weekCalendar" 
                  :key="day.date"
                  class="flex items-center justify-between py-2 px-3 rounded-md"
                  :class="day.isToday ? 'bg-purple-50 border border-purple-200' : 'hover:bg-gray-50'"
                >
                  <div>
                    <span class="text-sm font-medium text-gray-900">{{ day.name }}</span>
                    <span class="text-xs text-gray-500 ml-2">{{ day.date }}</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span 
                      v-for="service in day.services" 
                      :key="service"
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                      :class="getServiceClass(service)"
                    >
                      {{ service }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoleTheme } from '@/composables/useRoleTheme'
import PageHeader from '@/components/ui/PageHeader.vue'
import MetricGroup from '@/components/ui/MetricGroup.vue'
import StatCard from '@/components/ui/StatCard.vue'
import TrendLine from '@/components/ui/TrendLine.vue'
import DonutChart from '@/components/ui/DonutChart.vue'
import QuickActions from '@/components/ui/QuickActions.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import { 
  UsersIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  BuildingStorefrontIcon,
  CreditCardIcon,
  BellIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

// Composables
const { theme } = useRoleTheme()

// Reactive data
const loading = ref(true)

// Children data
const children = ref([])

// KPIs
const kpis = ref({
  totalAttendance: 0,
  lunchDays: 0,
  pendingAmount: 0,
  newMessages: 0
})

// Charts data
const attendanceTrendData = ref({
  labels: ['Setmana 1', 'Setmana 2', 'Setmana 3', 'Setmana 4'],
  datasets: [{
    label: 'Assistència %',
    data: [92, 88, 95, 90],
    borderColor: 'rgb(147, 51, 234)',
    backgroundColor: 'rgba(147, 51, 234, 0.1)',
    tension: 0.4
  }]
})

const servicesData = ref({
  labels: ['Menjador', 'Extraescolars', 'Acollida', 'Transport'],
  datasets: [{
    data: [85, 60, 40, 25],
    backgroundColor: [
      'rgba(147, 51, 234, 0.8)',
      'rgba(147, 51, 234, 0.6)',
      'rgba(147, 51, 234, 0.4)',
      'rgba(147, 51, 234, 0.2)'
    ]
  }]
})

// Activity and messages
const recentActivity = ref([])
const urgentMessages = ref([])

// Billing
const billing = ref({
  pending: 0,
  paidThisMonth: 0,
  expectedThisMonth: 0,
  yearlyTotal: 0
})

// Calendar
const weekCalendar = ref([])

// Quick actions
const quickActions = [
  { 
    label: 'Justificar Absència', 
    icon: 'DocumentTextIcon', 
    action: 'justify-absence',
    shortcut: 'J'
  },
  { 
    label: 'Consultar Menú', 
    icon: 'BuildingStorefrontIcon', 
    action: 'view-menu',
    shortcut: 'M'
  },
  { 
    label: 'Contactar Centre', 
    icon: 'ChatBubbleLeftRightIcon', 
    action: 'contact-center',
    shortcut: 'C'
  },
  { 
    label: 'Veure Rebuts', 
    icon: 'CreditCardIcon', 
    action: 'view-bills',
    shortcut: 'R'
  }
]

// Methods
const loadDashboardData = async () => {
  loading.value = true
  
  try {
    // TODO: Replace with real API calls
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock data
    children.value = [
      {
        id: 1,
        name: 'Anna Puig',
        class: 'P4',
        center: 'CEIP Montjuïc',
        todayStatus: 'present',
        weeklyAttendance: 95,
        activeServices: 3,
        lastMessage: 'Ahir 14:30'
      },
      {
        id: 2,
        name: 'Marc Puig',
        class: '2n Primària',
        center: 'CEIP Montjuïc',
        todayStatus: 'present',
        weeklyAttendance: 88,
        activeServices: 2,
        lastMessage: 'Dilluns 16:45'
      }
    ]

    kpis.value = {
      totalAttendance: 92,
      lunchDays: 8,
      pendingAmount: 125,
      newMessages: 3
    }

    recentActivity.value = [
      {
        id: 1,
        type: 'attendance',
        description: 'Anna ha assistit al menjador',
        time: 'Avui 13:30'
      },
      {
        id: 2,
        type: 'payment',
        description: 'Pagament rebut gener processat',
        time: 'Ahir 10:15'
      },
      {
        id: 3,
        type: 'message',
        description: 'Nou missatge sobre excursió',
        time: 'Dilluns 08:45'
      }
    ]

    urgentMessages.value = [
      {
        id: 1,
        title: 'Excursió Divendres',
        description: 'Recordatori: Les classes de P4 i P5 aniran d\'excursió. Portar esmorzar.',
        time: 'Dimarts 09:00'
      },
      {
        id: 2,
        title: 'Canvi Menú Demà',
        description: 'El menú de demà canvia per al·lèrgies. Consulteu el detall.',
        time: 'Avui 11:30'
      }
    ]

    billing.value = {
      pending: 125,
      paidThisMonth: 340,
      expectedThisMonth: 465,
      yearlyTotal: 4200
    }

    // Generate week calendar
    const today = new Date()
    const currentDay = today.getDay()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - currentDay + 1) // Monday

    weekCalendar.value = Array.from({ length: 5 }, (_, i) => {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      
      const dayNames = ['Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres']
      const services = i === 0 ? ['M', 'A'] : i === 2 ? ['M'] : i === 4 ? ['M', 'E'] : ['M']
      
      return {
        name: dayNames[i],
        date: date.getDate() + '/' + (date.getMonth() + 1),
        services,
        isToday: date.toDateString() === today.toDateString()
      }
    })
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  } finally {
    loading.value = false
  }
}

const getServiceClass = (service) => {
  const classes = {
    'M': 'bg-purple-100 text-purple-800', // Menjador
    'E': 'bg-blue-100 text-blue-800',      // Extraescolars  
    'A': 'bg-green-100 text-green-800',    // Acollida
    'T': 'bg-yellow-100 text-yellow-800'   // Transport
  }
  return classes[service] || 'bg-gray-100 text-gray-800'
}

const markMessageAsRead = (messageId) => {
  urgentMessages.value = urgentMessages.value.filter(msg => msg.id !== messageId)
  kpis.value.newMessages = Math.max(0, kpis.value.newMessages - 1)
}

const handleQuickAction = (action) => {
  console.log('Family quick action:', action)
  // TODO: Implement action handlers
  switch (action) {
    case 'justify-absence':
      console.log('Opening absence justification form')
      break
    case 'view-menu':
      console.log('Opening weekly menu')
      break
    case 'contact-center':
      console.log('Opening contact form')
      break
    case 'view-bills':
      console.log('Opening billing section')
      break
  }
}

// Lifecycle
onMounted(() => {
  loadDashboardData()
})
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background-color: #f9fafb;
}

.dashboard-content {
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1rem;
}

@media (min-width: 640px) {
  .dashboard-content {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .dashboard-content {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

.bg-gradient-to-r {
  background: linear-gradient(90deg, var(--tw-gradient-stops));
}
</style>
