<template>
  <div class="attendance-tracker min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <!-- Header Optimitzat per Tablets -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">🎯 Sistema Assistència Avançat</h1>
          <p class="text-lg text-gray-600 mt-2">Interfície optimitzada per tablets - Phase 2</p>
        </div>
        <div class="flex items-center space-x-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">{{ attendanceCount }}</div>
            <div class="text-sm text-gray-500">Presents Avui</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">{{ totalStudents }}</div>
            <div class="text-sm text-gray-500">Total Estudiants</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Estat Connexió i Sync -->
    <div class="bg-white rounded-xl shadow-lg p-4 mb-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div :class="connectionStatusClass" class="w-4 h-4 rounded-full"></div>
          <span class="font-medium">{{ connectionStatus }}</span>
        </div>
        <div class="text-sm text-gray-500">
          Última sync: {{ lastSyncTime }}
        </div>
      </div>
    </div>

    <!-- QR Scanner (Phase 2 Feature) -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4">📱 Scanner QR Assistència</h2>
      <div class="bg-gray-100 rounded-lg p-8 text-center">
        <div class="text-6xl mb-4">📷</div>
        <p class="text-lg text-gray-600">TODO: Implementar QR Scanner</p>
        <p class="text-sm text-gray-500 mt-2">Identificació en &lt;2 segons</p>
      </div>
    </div>

    <!-- Llista Estudiants Assistència -->
    <div class="bg-white rounded-xl shadow-lg p-6">
      <h2 class="text-xl font-semibold mb-4">👥 Assistència d'Avui</h2>
      
      <!-- Filtres Ràpids -->
      <div class="flex space-x-2 mb-6">
        <button 
          v-for="filter in attendanceFilters" 
          :key="filter.key"
          @click="currentFilter = filter.key"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-colors',
            currentFilter === filter.key 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
        >
          {{ filter.label }} ({{ getFilterCount(filter.key) }})
        </button>
      </div>

      <!-- Students Grid (Optimitzat per Touch) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="student in filteredStudents" 
          :key="student.id"
          class="border-2 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          :class="getStudentCardClass(student.status)"
          @click="toggleAttendance(student)"
        >
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-semibold text-lg">{{ student.nom }} {{ student.cognoms }}</h3>
              <p class="text-sm text-gray-600">{{ student.classe }}</p>
            </div>
            <div class="text-right">
              <div class="text-2xl mb-1">{{ getStatusIcon(student.status) }}</div>
              <div class="text-xs font-medium">{{ getStatusLabel(student.status) }}</div>
            </div>
          </div>
          
          <!-- Hora Assistència -->
          <div class="mt-3 text-sm text-gray-500">
            <span v-if="student.attendance_time">
              ⏰ {{ formatTime(student.attendance_time) }}
            </span>
            <span v-else class="text-gray-400">
              Pendent registre
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- TODO Phase 2: WebSockets Integration -->
    <!-- TODO Phase 2: Offline Mode with Service Workers -->
    <!-- TODO Phase 2: Multi-device Sync -->
    <!-- TODO Phase 2: QR Code Generation & Scanning -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// TODO: Integrar amb API real Phase 2
const attendanceCount = ref(0)
const totalStudents = ref(0)
const connectionStatus = ref('Online')
const lastSyncTime = ref('Fa 1 minut')
const currentFilter = ref('all')

// Estados de assistência para Phase 2
const attendanceFilters = [
  { key: 'all', label: 'Tots' },
  { key: 'present', label: 'Presents' },
  { key: 'absent', label: 'Absents' },
  { key: 'late', label: 'Retards' },
  { key: 'justified', label: 'Justificats' }
]

// Mock data - TODO: Reemplazar por API Phase 2
const students = ref([
  {
    id: 1,
    nom: 'Maria',
    cognoms: 'García López',
    classe: 'Piano Inicial',
    status: 'present',
    attendance_time: new Date()
  },
  {
    id: 2,
    nom: 'João',
    cognoms: 'Silva Santos',
    classe: 'Guitarra Intermedi',
    status: 'absent',
    attendance_time: null
  },
  {
    id: 3,
    nom: 'Emma',
    cognoms: 'Johnson',
    classe: 'Violí Avançat',
    status: 'late',
    attendance_time: new Date(Date.now() - 900000) // 15 min ago
  }
])

const connectionStatusClass = computed(() => {
  return {
    'bg-green-500': connectionStatus.value === 'Online',
    'bg-yellow-500': connectionStatus.value === 'Syncing',
    'bg-red-500': connectionStatus.value === 'Offline'
  }
})

const filteredStudents = computed(() => {
  if (currentFilter.value === 'all') return students.value
  return students.value.filter(student => student.status === currentFilter.value)
})

const getFilterCount = (filter) => {
  if (filter === 'all') return students.value.length
  return students.value.filter(student => student.status === filter).length
}

const getStudentCardClass = (status) => {
  const classes = {
    present: 'border-green-500 bg-green-50',
    absent: 'border-red-500 bg-red-50',
    late: 'border-yellow-500 bg-yellow-50',
    justified: 'border-blue-500 bg-blue-50'
  }
  return classes[status] || 'border-gray-300 bg-gray-50'
}

const getStatusIcon = (status) => {
  const icons = {
    present: '✅',
    absent: '❌',
    late: '⏰',
    justified: '📝'
  }
  return icons[status] || '❓'
}

const getStatusLabel = (status) => {
  const labels = {
    present: 'Present',
    absent: 'Absent',
    late: 'Retard',
    justified: 'Justificat'
  }
  return labels[status] || 'Pendent'
}

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('ca-ES', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const toggleAttendance = (student) => {
  // TODO Phase 2: Implementar lògica canvi estat
  console.log('Toggle attendance for:', student.nom)
  
  // Cycle through states for demo
  const states = ['present', 'absent', 'late', 'justified']
  const currentIndex = states.indexOf(student.status)
  const nextIndex = (currentIndex + 1) % states.length
  student.status = states[nextIndex]
  
  if (student.status === 'present' && !student.attendance_time) {
    student.attendance_time = new Date()
  }
}

onMounted(() => {
  // TODO Phase 2: Inicialitzar WebSockets
  console.log('AttendanceTracker carregat - Phase 2')
  console.log('TODO: Implementar funcionalitats temps real')
  
  // Mock data initialization
  attendanceCount.value = students.value.filter(s => s.status === 'present').length
  totalStudents.value = students.value.length
})
</script>

<style scoped>
/* Optimitzacions per tablets */
@media (max-width: 768px) {
  .attendance-tracker {
    padding: 16px 8px;
  }
  
  .grid {
    grid-template-columns: 1fr;
  }
}

/* Touch-friendly buttons */
button, .cursor-pointer {
  touch-action: manipulation;
  min-height: 44px;
}
</style>
