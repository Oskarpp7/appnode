<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Sistema d'Assistència</h1>
            <p class="text-gray-600 mt-2">Gestió d'assistència optimitzada per tablets</p>
          </div>
          <button
            @click="createNewSession"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Nova Sessió
          </button>
        </div>
      </div>

      <!-- Filtres -->
      <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Servei</label>
            <select
              v-model="filters.service_type"
              @change="loadSessions"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tots els serveis</option>
              <option value="menjador">Menjador</option>
              <option value="extraescolars">Extraescolars</option>
              <option value="acollida_matinal">Acollida Matinal</option>
              <option value="acollida_tarda">Acollida Tarda</option>
              <option value="sortides_pedagogiques">Sortides Pedagògiques</option>
              <option value="colònies">Colònies</option>
              <option value="casals_estiu">Casals d'Estiu</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <input
              v-model="filters.session_date"
              @change="loadSessions"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Estat</label>
            <select
              v-model="filters.status"
              @change="loadSessions"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tots els estats</option>
              <option value="scheduled">Programades</option>
              <option value="in_progress">En Curs</option>
              <option value="completed">Completades</option>
              <option value="canceled">Cancel·lades</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Monitor</label>
            <select
              v-model="filters.monitor_id"
              @change="loadSessions"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tots els monitors</option>
              <option
                v-for="monitor in monitors"
                :key="monitor.id"
                :value="monitor.id"
              >
                {{ monitor.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Llista de Sessions -->
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div
          v-for="session in sessions"
          :key="session.id"
          class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          @click="openSession(session.id)"
        >
          <div class="p-6">
            <!-- Header de la Sessió -->
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ session.session_name }}</h3>
                <p class="text-sm text-gray-600">{{ getServiceTypeLabel(session.service_type) }}</p>
              </div>
              <span
                class="px-3 py-1 rounded-full text-xs font-medium"
                :class="getStatusBadgeClass(session.status)"
              >
                {{ getStatusText(session.status) }}
              </span>
            </div>

            <!-- Detalls de la Sessió -->
            <div class="space-y-2 mb-4">
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <CalendarIcon class="h-4 w-4" />
                {{ formatDate(session.session_date) }}
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <ClockIcon class="h-4 w-4" />
                {{ session.start_time }} - {{ session.end_time || 'En curs' }}
              </div>
              <div v-if="session.location" class="flex items-center gap-2 text-sm text-gray-600">
                <MapPinIcon class="h-4 w-4" />
                {{ session.location }}
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <UserIcon class="h-4 w-4" />
                {{ session.monitor?.name }}
              </div>
            </div>

            <!-- Estadístiques d'Assistència -->
            <div class="grid grid-cols-3 gap-4 py-3 border-t border-gray-100">
              <div class="text-center">
                <div class="text-lg font-semibold text-blue-600">{{ session.total_enrolled }}</div>
                <div class="text-xs text-gray-600">Inscrits</div>
              </div>
              <div class="text-center">
                <div class="text-lg font-semibold text-green-600">{{ session.total_present }}</div>
                <div class="text-xs text-gray-600">Presents</div>
              </div>
              <div class="text-center">
                <div class="text-lg font-semibold text-red-600">{{ session.total_absent }}</div>
                <div class="text-xs text-gray-600">Absents</div>
              </div>
            </div>

            <!-- Accions Ràpides -->
            <div class="flex gap-2 mt-4">
              <button
                v-if="session.status === 'scheduled'"
                @click.stop="startSession(session.id)"
                class="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
              >
                Iniciar
              </button>
              <button
                v-if="session.status === 'in_progress'"
                @click.stop="openSession(session.id)"
                class="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                Continuar
              </button>
              <button
                v-if="session.status === 'completed'"
                @click.stop="viewReport(session.id)"
                class="flex-1 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm font-medium"
              >
                Veure Informe
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Estat buit -->
      <div v-if="sessions.length === 0 && !isLoading" class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <CalendarIcon class="h-16 w-16 mx-auto" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No hi ha sessions</h3>
        <p class="text-gray-600 mb-4">Comença creant una nova sessió d'assistència</p>
        <button
          @click="createNewSession"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          Crear Primera Sessió
        </button>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p class="text-gray-600 mt-4">Carregant sessions...</p>
      </div>
    </div>

    <!-- Modal per crear nova sessió -->
    <CreateSessionModal
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @created="handleSessionCreated"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import CreateSessionModal from '@/components/CreateSessionModal.vue'
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()

// Refs reactives
const sessions = ref([])
const monitors = ref([])
const isLoading = ref(false)
const showCreateModal = ref(false)

// Filtres
const filters = reactive({
  service_type: '',
  session_date: '',
  status: '',
  monitor_id: ''
})

// Mètodes
const loadSessions = async () => {
  isLoading.value = true
  try {
    const params = new URLSearchParams()
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params.append(key, filters[key])
      }
    })

    const response = await fetch(`/api/attendance/sessions?${params}`, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      sessions.value = data.data
    }
  } catch (error) {
    console.error('Error carregant sessions:', error)
  } finally {
    isLoading.value = false
  }
}

const loadMonitors = async () => {
  try {
    // Carregar llista de monitors/usuaris
    const response = await fetch('/api/users?role=monitor', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      monitors.value = data.data || []
    }
  } catch (error) {
    console.error('Error carregant monitors:', error)
  }
}

const openSession = (sessionId) => {
  router.push(`/attendance/session/${sessionId}`)
}

const startSession = async (sessionId) => {
  try {
    const response = await fetch(`/api/attendance/sessions/${sessionId}/start`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    if (response.ok) {
      // Recarregar sessions per actualitzar l'estat
      await loadSessions()
      // Obrir la sessió
      openSession(sessionId)
    }
  } catch (error) {
    console.error('Error iniciant sessió:', error)
  }
}

const viewReport = (sessionId) => {
  router.push(`/attendance/session/${sessionId}/report`)
}

const createNewSession = () => {
  showCreateModal.value = true
}

const handleSessionCreated = (newSession) => {
  showCreateModal.value = false
  loadSessions()
  // Obrir directament la nova sessió
  openSession(newSession.id)
}

// Utilitats
const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('ca-ES', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
}

const getServiceTypeLabel = (serviceType) => {
  const labels = {
    'menjador': 'Menjador',
    'extraescolars': 'Extraescolars',
    'acollida_matinal': 'Acollida Matinal',
    'acollida_tarda': 'Acollida Tarda',
    'sortides_pedagogiques': 'Sortides Pedagògiques',
    'colònies': 'Colònies',
    'casals_estiu': 'Casals d\'Estiu'
  }
  return labels[serviceType] || serviceType
}

const getStatusBadgeClass = (status) => {
  const classes = {
    'scheduled': 'bg-blue-100 text-blue-800',
    'in_progress': 'bg-green-100 text-green-800',
    'completed': 'bg-gray-100 text-gray-800',
    'canceled': 'bg-red-100 text-red-800'
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

// Lifecycle
onMounted(() => {
  // Establir data d'avui per defecte
  filters.session_date = new Date().toISOString().split('T')[0]
  
  loadSessions()
  loadMonitors()
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
  
  .grid-cols-4 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
