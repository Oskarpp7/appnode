<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <!-- Header de la Sessió -->
    <div class="max-w-7xl mx-auto">
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ session?.session_name || 'Sessió d\'Assistència' }}</h1>
            <div class="flex flex-wrap gap-4 text-sm text-gray-600">
              <span class="flex items-center gap-1">
                <CalendarIcon class="h-4 w-4" />
                {{ formatDate(session?.session_date) }}
              </span>
              <span class="flex items-center gap-1">
                <ClockIcon class="h-4 w-4" />
                {{ session?.start_time }} - {{ session?.end_time || 'En curs' }}
              </span>
              <span class="flex items-center gap-1">
                <MapPinIcon class="h-4 w-4" />
                {{ session?.location || 'Ubicació no especificada' }}
              </span>
              <span class="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                    :class="getStatusBadgeClass(session?.status)">
                {{ getStatusText(session?.status) }}
              </span>
            </div>
          </div>
          
          <!-- Controls de la Sessió -->
          <div class="flex gap-3">
            <button v-if="session?.status === 'scheduled'"
                    @click="startSession"
                    class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
              Iniciar Sessió
            </button>
            <button v-if="session?.status === 'in_progress'"
                    @click="completeSession"
                    class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              Completar Sessió
            </button>
            <button @click="syncData"
                    :disabled="isSyncing"
                    class="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2">
              <ArrowPathIcon class="h-4 w-4" :class="{ 'animate-spin': isSyncing }" />
              Sincronitzar
            </button>
          </div>
        </div>

        <!-- Estadístiques Ràpides -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div class="bg-blue-50 p-4 rounded-lg">
            <div class="text-2xl font-bold text-blue-600">{{ attendanceStats.total }}</div>
            <div class="text-sm text-blue-800">Total Inscrits</div>
          </div>
          <div class="bg-green-50 p-4 rounded-lg">
            <div class="text-2xl font-bold text-green-600">{{ attendanceStats.present }}</div>
            <div class="text-sm text-green-800">Presents</div>
          </div>
          <div class="bg-red-50 p-4 rounded-lg">
            <div class="text-2xl font-bold text-red-600">{{ attendanceStats.absent }}</div>
            <div class="text-sm text-red-800">Absents</div>
          </div>
          <div class="bg-yellow-50 p-4 rounded-lg">
            <div class="text-2xl font-bold text-yellow-600">{{ attendanceStats.pending }}</div>
            <div class="text-sm text-yellow-800">Pendents</div>
          </div>
        </div>
      </div>

      <!-- Filtres i Cerca -->
      <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div class="flex flex-wrap gap-4 items-center">
          <div class="flex-1 min-w-64">
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Cercar estudiant..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div class="flex gap-2">
            <button
              v-for="filter in statusFilters"
              :key="filter.value"
              @click="selectedFilter = filter.value"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors',
                selectedFilter === filter.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ filter.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Llista d'Estudiants -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="attendance in filteredAttendances"
          :key="attendance.id"
          class="bg-white rounded-lg shadow-sm border-l-4 transition-all duration-200 hover:shadow-md"
          :class="getAttendanceBorderClass(attendance.attendance_status)"
        >
          <div class="p-6">
            <!-- Info de l'Estudiant -->
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ attendance.student.nom }} {{ attendance.student.cognoms }}
                </h3>
                <p class="text-sm text-gray-600">
                  {{ attendance.student.curs }} - {{ attendance.student.grup }}
                </p>
                <p class="text-xs text-gray-500 mt-1">
                  Edat: {{ calculateAge(attendance.student.data_naixement) }} anys
                </p>
              </div>
              <div class="flex items-center gap-2">
                <span class="px-2 py-1 rounded-full text-xs font-medium"
                      :class="getStatusBadgeClass(attendance.attendance_status)">
                  {{ getAttendanceStatusText(attendance.attendance_status) }}
                </span>
                <button @click="openStudentDetails(attendance)"
                        class="p-1 text-gray-400 hover:text-gray-600">
                  <InformationCircleIcon class="h-4 w-4" />
                </button>
              </div>
            </div>

            <!-- Botons d'Acció Ràpida -->
            <div class="grid grid-cols-2 gap-2 mb-4">
              <button
                @click="markAttendance(attendance, 'present')"
                :disabled="attendance.attendance_status === 'present'"
                class="flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors"
                :class="attendance.attendance_status === 'present'
                  ? 'bg-green-100 text-green-800 cursor-not-allowed'
                  : 'bg-green-50 text-green-700 hover:bg-green-100'"
              >
                <CheckIcon class="h-4 w-4" />
                Present
              </button>
              <button
                @click="markAttendance(attendance, 'absent')"
                :disabled="attendance.attendance_status === 'absent'"
                class="flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors"
                :class="attendance.attendance_status === 'absent'
                  ? 'bg-red-100 text-red-800 cursor-not-allowed'
                  : 'bg-red-50 text-red-700 hover:bg-red-100'"
              >
                <XMarkIcon class="h-4 w-4" />
                Absent
              </button>
            </div>

            <!-- Horaris -->
            <div v-if="attendance.attendance_status === 'present'" class="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div>
                <span class="font-medium">Entrada:</span>
                {{ attendance.check_in_time || 'No registrada' }}
              </div>
              <div>
                <span class="font-medium">Sortida:</span>
                {{ attendance.check_out_time || 'Pendent' }}
              </div>
            </div>

            <!-- Indicadors Addicionals -->
            <div class="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
              <div class="flex gap-2">
                <span v-if="attendance.meal_taken" 
                      class="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                  🍽️ Menjador
                </span>
                <span v-if="attendance.medical_incident" 
                      class="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                  ⚕️ Incident
                </span>
                <span v-if="attendance.incident_report" 
                      class="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  ⚠️ Nota
                </span>
              </div>
              <button @click="openDetailModal(attendance)"
                      class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Detalls
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Detalls de l'Estudiant -->
    <AttendanceDetailModal
      v-if="showDetailModal"
      :attendance="selectedAttendance"
      :session="session"
      @close="closeDetailModal"
      @update="handleDetailUpdate"
    />

    <!-- Notificacions Toast -->
    <div v-if="notifications.length > 0" class="fixed top-4 right-4 z-50 space-y-2">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="px-4 py-3 rounded-lg shadow-lg text-white font-medium max-w-sm"
        :class="notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'"
      >
        {{ notification.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AttendanceDetailModal from './AttendanceDetailModal.vue'
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  CheckIcon,
  XMarkIcon,
  ArrowPathIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const authStore = useAuthStore()

// Refs reactives
const session = ref(null)
const attendances = ref([])
const searchTerm = ref('')
const selectedFilter = ref('all')
const showDetailModal = ref(false)
const selectedAttendance = ref(null)
const isSyncing = ref(false)
const notifications = ref([])

// Filtres disponibles
const statusFilters = [
  { value: 'all', label: 'Tots' },
  { value: 'present', label: 'Presents' },
  { value: 'absent', label: 'Absents' },
  { value: 'pending', label: 'Pendents' }
]

// Computed
const filteredAttendances = computed(() => {
  let filtered = attendances.value

  // Filtrar per terme de cerca
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    filtered = filtered.filter(attendance =>
      attendance.student.nom.toLowerCase().includes(term) ||
      attendance.student.cognoms.toLowerCase().includes(term)
    )
  }

  // Filtrar per estat
  if (selectedFilter.value !== 'all') {
    if (selectedFilter.value === 'pending') {
      filtered = filtered.filter(attendance => !attendance.attendance_status || attendance.attendance_status === 'absent')
    } else {
      filtered = filtered.filter(attendance => attendance.attendance_status === selectedFilter.value)
    }
  }

  return filtered
})

const attendanceStats = computed(() => {
  const stats = {
    total: attendances.value.length,
    present: 0,
    absent: 0,
    pending: 0
  }

  attendances.value.forEach(attendance => {
    if (attendance.attendance_status === 'present') {
      stats.present++
    } else if (attendance.attendance_status === 'absent') {
      stats.absent++
    } else {
      stats.pending++
    }
  })

  return stats
})

// Mètodes
const loadSessionData = async () => {
  try {
    const sessionId = route.params.sessionId
    const response = await fetch(`/api/attendance/sessions/${sessionId}`, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      session.value = data.data
      attendances.value = data.data.attendances || []
    }
  } catch (error) {
    console.error('Error carregant dades de la sessió:', error)
    showNotification('Error carregant dades de la sessió', 'error')
  }
}

const markAttendance = async (attendance, status) => {
  try {
    const response = await fetch(
      `/api/attendance/sessions/${session.value.id}/students/${attendance.student_id}/attendance`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authStore.token}`
        },
        body: JSON.stringify({
          attendance_status: status,
          check_in_time: status === 'present' ? new Date().toTimeString().slice(0, 8) : null
        })
      }
    )

    if (response.ok) {
      const data = await response.json()
      
      // Actualitzar localment
      const index = attendances.value.findIndex(a => a.id === attendance.id)
      if (index !== -1) {
        attendances.value[index] = { ...attendances.value[index], ...data.data }
      }

      showNotification(`${attendance.student.nom} marcat com ${status}`, 'success')
    }
  } catch (error) {
    console.error('Error marcant assistència:', error)
    showNotification('Error marcant assistència', 'error')
  }
}

const startSession = async () => {
  try {
    const response = await fetch(`/api/attendance/sessions/${session.value.id}/start`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    if (response.ok) {
      session.value.status = 'in_progress'
      showNotification('Sessió iniciada correctament', 'success')
    }
  } catch (error) {
    console.error('Error iniciant sessió:', error)
    showNotification('Error iniciant sessió', 'error')
  }
}

const completeSession = async () => {
  try {
    const response = await fetch(`/api/attendance/sessions/${session.value.id}/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    if (response.ok) {
      session.value.status = 'completed'
      showNotification('Sessió completada correctament', 'success')
    }
  } catch (error) {
    console.error('Error completant sessió:', error)
    showNotification('Error completant sessió', 'error')
  }
}

const syncData = async () => {
  isSyncing.value = true
  try {
    await loadSessionData()
    showNotification('Dades sincronitzades correctament', 'success')
  } catch (error) {
    showNotification('Error sincronitzant dades', 'error')
  } finally {
    isSyncing.value = false
  }
}

const openDetailModal = (attendance) => {
  selectedAttendance.value = attendance
  showDetailModal.value = true
}

const closeDetailModal = () => {
  showDetailModal.value = false
  selectedAttendance.value = null
}

const handleDetailUpdate = (updatedAttendance) => {
  const index = attendances.value.findIndex(a => a.id === updatedAttendance.id)
  if (index !== -1) {
    attendances.value[index] = updatedAttendance
  }
}

const showNotification = (message, type = 'success') => {
  const id = Date.now()
  notifications.value.push({ id, message, type })
  
  setTimeout(() => {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }, 3000)
}

// Utilitats
const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('ca-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const calculateAge = (birthDate) => {
  if (!birthDate) return ''
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

const getStatusBadgeClass = (status) => {
  const classes = {
    'scheduled': 'bg-blue-100 text-blue-800',
    'in_progress': 'bg-green-100 text-green-800',
    'completed': 'bg-gray-100 text-gray-800',
    'canceled': 'bg-red-100 text-red-800',
    'present': 'bg-green-100 text-green-800',
    'absent': 'bg-red-100 text-red-800',
    'late': 'bg-yellow-100 text-yellow-800',
    'excused': 'bg-blue-100 text-blue-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
  const texts = {
    'scheduled': 'Programada',
    'in_progress': 'En Curs',
    'completed': 'Completada',
    'canceled': 'Cancel·lada'
  }
  return texts[status] || status
}

const getAttendanceStatusText = (status) => {
  const texts = {
    'present': 'Present',
    'absent': 'Absent',
    'late': 'Tard',
    'excused': 'Justificat',
    'sick': 'Malalt'
  }
  return texts[status] || 'Pendent'
}

const getAttendanceBorderClass = (status) => {
  const classes = {
    'present': 'border-green-400',
    'absent': 'border-red-400',
    'late': 'border-yellow-400',
    'excused': 'border-blue-400'
  }
  return classes[status] || 'border-gray-200'
}

// Auto-sincronització cada 30 segons
const autoSync = setInterval(() => {
  if (!isSyncing.value) {
    syncData()
  }
}, 30000)

// Lifecycle
onMounted(() => {
  loadSessionData()
})

onUnmounted(() => {
  clearInterval(autoSync)
})
</script>

<style scoped>
/* Optimitzacions per a tablets */
@media (max-width: 1024px) {
  .grid-cols-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

/* Millores de touch per a tablets */
button {
  min-height: 44px;
  min-width: 44px;
}

input {
  min-height: 44px;
}
</style>
