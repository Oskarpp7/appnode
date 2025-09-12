<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <PageHeader 
      title="Monitor Dashboard" 
      subtitle="Gestió dels meus grups"
      :breadcrumbs="[
        { name: 'Inici', href: '/' },
        { name: 'Monitor' }
      ]"
    />

    <!-- Loading State -->
    <div v-if="loading" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Skeleton type="card" v-for="n in 4" :key="n" />
      </div>
      <Skeleton type="chart" />
      <Skeleton type="table" />
    </div>

    <!-- Dashboard Content -->
    <div v-else class="space-y-6">
      <!-- Quick Start Section -->
      <div class="bg-gradient-to-r from-monitor-500 to-monitor-600 rounded-xl p-8 text-white shadow-lg">
        <div class="text-center">
          <h2 class="text-2xl font-bold mb-2">Passa Llista Tàctil</h2>
          <p class="text-monitor-100 mb-6">Inicia ràpidament el control d'assistència dels teus grups</p>
          <button 
            @click="startAttendance"
            class="bg-white text-monitor-600 hover:bg-monitor-50 font-bold py-4 px-8 rounded-xl text-lg shadow-lg transition-colors"
          >
            <ClipboardDocumentCheckIcon class="h-8 w-8 inline mr-3" />
            Iniciar Passa Llista Tàctil
          </button>
        </div>
      </div>

      <!-- Today's Summary -->
      <MetricGroup>
        <StatCard 
          title="Grups Avui" 
          :value="kpis.todaysGroups" 
          icon="UsersIcon"
          description="Grups assignats per avui"
        />
        <StatCard 
          title="Presents" 
          :value="kpis.presentStudents" 
          icon="CheckCircleIcon"
          trend="+3"
          trend-type="positive"
          description="Estudiants presents"
        />
        <StatCard 
          title="Absents" 
          :value="kpis.absentStudents" 
          icon="XCircleIcon"
          description="Absències sense justificar"
        />
        <StatCard 
          title="Justificats" 
          :value="kpis.justifiedAbsent" 
          icon="DocumentCheckIcon"
          description="Absències justificades"
        />
      </MetricGroup>

      <!-- Today's Groups Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="group in todaysGroups" 
          :key="group.id"
          class="bg-white rounded-xl p-6 shadow-soft hover:shadow-md transition-shadow cursor-pointer"
          @click="openGroupAttendance(group)"
        >
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ group.name }}</h3>
              <p class="text-sm text-gray-500">{{ group.schedule }}</p>
            </div>
            <span :class="getGroupStatusClass(group.status)" 
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
              {{ group.status }}
            </span>
          </div>
          
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Estudiants:</span>
              <span class="font-medium">{{ group.students }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Presents:</span>
              <span class="font-medium text-green-600">{{ group.present }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Absents:</span>
              <span class="font-medium text-red-600">{{ group.absent }}</span>
            </div>
          </div>
          
          <div class="mt-4">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-monitor-500 h-2 rounded-full transition-all" 
                :style="`width: ${(group.present / group.students) * 100}%`"
              ></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">
              {{ Math.round((group.present / group.students) * 100) }}% assistència
            </p>
          </div>
          
          <button 
            v-if="group.status === 'Pendent'"
            @click.stop="startGroupAttendance(group)"
            class="w-full mt-4 bg-monitor-600 hover:bg-monitor-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Passar Llista
          </button>
          <button 
            v-else-if="group.status === 'Actiu'"
            @click.stop="continueGroupAttendance(group)"
            class="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Continuar Llista
          </button>
          <button 
            v-else
            @click.stop="viewGroupSummary(group)"
            class="w-full mt-4 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Veure Resum
          </button>
        </div>
      </div>

      <!-- Urgent Messages -->
      <div v-if="urgentMessages.length > 0" class="bg-white rounded-xl shadow-soft">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center">
            <ExclamationTriangleIcon class="h-5 w-5 text-yellow-500 mr-2" />
            Missatges Urgents
          </h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div 
              v-for="message in urgentMessages" 
              :key="message.id"
              class="flex items-start space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
            >
              <div class="flex-shrink-0">
                <div class="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <BellIcon class="h-5 w-5 text-yellow-600" />
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">{{ message.title }}</p>
                <p class="text-sm text-gray-600">{{ message.description }}</p>
                <p class="text-xs text-gray-400 mt-1">{{ message.time }}</p>
              </div>
              <button 
                @click="markMessageAsRead(message.id)"
                class="text-yellow-600 hover:text-yellow-700"
              >
                <XMarkIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <QuickActions 
        title="Accions Ràpides"
        :actions="quickActions"
        @action="handleQuickAction"
      />
    </div>
      </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoleTheme } from '@/composables/useRoleTheme'
import PageHeader from '@/components/ui/PageHeader.vue'
import MetricGroup from '@/components/ui/MetricGroup.vue'
import StatCard from '@/components/ui/StatCard.vue'
import QuickActions from '@/components/ui/QuickActions.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import { 
  ClipboardDocumentCheckIcon,
  UsersIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentCheckIcon,
  ExclamationTriangleIcon,
  BellIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

// Composables
const { theme } = useRoleTheme()

// Reactive data
const loading = ref(true)

// KPIs
const kpis = ref({
  todaysGroups: 0,
  presentStudents: 0,
  absentStudents: 0,
  justifiedAbsent: 0
})

// Groups and messages
const todaysGroups = ref([])
const urgentMessages = ref([])

// Quick actions
const quickActions = [
  { 
    label: 'Passar Llista Grup', 
    icon: 'ClipboardDocumentCheckIcon', 
    action: 'group-attendance',
    shortcut: 'L'
  },
  { 
    label: 'Registrar Incident', 
    icon: 'ExclamationTriangleIcon', 
    action: 'report-incident',
    shortcut: 'I'
  },
  { 
    label: 'Consultar Historial', 
    icon: 'DocumentTextIcon', 
    action: 'view-history',
    shortcut: 'H'
  },
  { 
    label: 'Contactar Coordinador', 
    icon: 'ChatBubbleLeftRightIcon', 
    action: 'contact-coordinator',
    shortcut: 'C'
  }
]

// Methods
const loadDashboardData = async () => {
  loading.value = true
  
  try {
    // TODO: Replace with real API calls
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Mock data
    kpis.value = {
      todaysGroups: 3,
      presentStudents: 28,
      absentStudents: 4,
      justifiedAbsent: 2
    }

    todaysGroups.value = [
      {
        id: 1,
        name: 'Menjador P3-P4',
        schedule: '12:00 - 14:00',
        students: 15,
        present: 12,
        absent: 3,
        status: 'Completat'
      },
      {
        id: 2,
        name: 'Extraescolars Esport',
        schedule: '16:00 - 17:00',
        students: 22,
        present: 16,
        absent: 1,
        status: 'Actiu'
      },
      {
        id: 3,
        name: 'Acollida Tarda',
        schedule: '17:00 - 18:30',
        students: 18,
        present: 0,
        absent: 0,
        status: 'Pendent'
      }
    ]

    urgentMessages.value = [
      {
        id: 1,
        title: 'Al·lèrgia alimentària - Maria P.',
        description: 'Atenció especial al menú d\'avui. Evitar fruits secs.',
        time: '08:30'
      },
      {
        id: 2,
        title: 'Canvi d\'horari - Extraescolars',
        description: 'L\'extraescolar d\'anglès s\'avança 15 minuts.',
        time: '14:45'
      }
    ]
    
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  } finally {
    loading.value = false
  }
}

const getGroupStatusClass = (status) => {
  const classes = {
    'Pendent': 'bg-yellow-100 text-yellow-800',
    'Actiu': 'bg-green-100 text-green-800',
    'Completat': 'bg-blue-100 text-blue-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const startAttendance = () => {
  console.log('Starting tactical attendance')
  // TODO: Navigate to tactical attendance interface
}

const openGroupAttendance = (group) => {
  console.log('Opening group attendance:', group.name)
  // TODO: Navigate to group-specific attendance
}

const startGroupAttendance = (group) => {
  console.log('Starting attendance for group:', group.name)
  // TODO: Start attendance for specific group
}

const continueGroupAttendance = (group) => {
  console.log('Continuing attendance for group:', group.name)
  // TODO: Continue attendance for specific group
}

const viewGroupSummary = (group) => {
  console.log('Viewing summary for group:', group.name)
  // TODO: Show group summary
}

const markMessageAsRead = (messageId) => {
  urgentMessages.value = urgentMessages.value.filter(msg => msg.id !== messageId)
}

const handleQuickAction = (action) => {
  console.log('Quick action:', action)
  // TODO: Implement action handlers
}

// Lifecycle
onMounted(() => {
  loadDashboardData()
})
</script>

<style scoped>
.bg-gradient-to-r {
  background: linear-gradient(90deg, var(--tw-gradient-stops));
}
</style>
