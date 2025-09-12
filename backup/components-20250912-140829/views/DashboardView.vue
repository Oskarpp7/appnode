<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">
              Gestió Escolar - Dashboard Família
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-700">
              Hola, {{ authStore.userName }}
            </span>
            <button
              @click="handleLogout"
              class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Tancar sessió
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Welcome Section -->
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">
              Benvinguts al portal de famílies
            </h2>
            <p class="text-gray-600">
              Des d'aquí podeu consultar tota la informació dels vostres fills: assistència, menjador, 
              activitats extraescolars i comunicacions del centre.
            </p>
          </div>
        </div>
      </div>

      <!-- Students Section -->
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              Els vostres fills
            </h3>
            
            <div v-if="studentsStore.isLoading" class="text-center py-4">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
            
            <div v-else-if="studentsStore.error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {{ studentsStore.error }}
            </div>
            
            <div v-else-if="studentsStore.students.length === 0" class="text-center py-8">
              <p class="text-gray-500">No s'han trobat estudiants associats al vostre compte.</p>
            </div>
            
            <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div
                v-for="student in studentsStore.activeStudents"
                :key="student.id"
                class="bg-gray-50 overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                @click="selectStudent(student)"
              >
                <div class="px-4 py-5 sm:p-6">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span class="text-primary-600 font-medium text-sm">
                          {{ student.first_name.charAt(0) }}{{ student.last_name.charAt(0) }}
                        </span>
                      </div>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">
                          Estudiant
                        </dt>
                        <dd class="text-lg font-medium text-gray-900">
                          {{ student.first_name }} {{ student.last_name }}
                        </dd>
                        <dd class="text-sm text-gray-600">
                          {{ student.class_group }} - {{ student.academic_year }}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Selected Student Details -->
      <div v-if="selectedStudent" class="px-4 py-6 sm:px-0">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              Detalls de {{ selectedStudent.first_name }} {{ selectedStudent.last_name }}
            </h3>
            
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <!-- Assistència -->
              <div class="bg-green-50 overflow-hidden shadow rounded-lg">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span class="text-green-600 text-sm font-bold">✓</span>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">Assistència</dt>
                        <dd class="text-lg font-medium text-gray-900">95%</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Menjador -->
              <div class="bg-blue-50 overflow-hidden shadow rounded-lg">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span class="text-blue-600 font-medium text-xs">🍽️</span>
                      </div>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">Menjador</dt>
                        <dd class="text-lg font-medium text-gray-900">Actiu</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Activitats -->
              <div class="bg-purple-50 overflow-hidden shadow rounded-lg">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div class="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <span class="text-purple-600 font-medium text-xs">⚽</span>
                      </div>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">Activitats</dt>
                        <dd class="text-lg font-medium text-gray-900">2 actives</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Pagaments -->
              <div class="bg-yellow-50 overflow-hidden shadow rounded-lg">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div class="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                        <span class="text-yellow-600 font-medium text-xs">💰</span>
                      </div>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">Pagaments</dt>
                        <dd class="text-lg font-medium text-gray-900">Al dia</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Student Info -->
            <div class="mt-6 border-t border-gray-200 pt-6">
              <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt class="text-sm font-medium text-gray-500">Codi d'estudiant</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ selectedStudent.student_code }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Data de naixement</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ formatDate(selectedStudent.birth_date) }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Classe</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ selectedStudent.class_group }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Curs acadèmic</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ selectedStudent.academic_year }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useStudentsStore } from '@/stores/students'

const router = useRouter()
const authStore = useAuthStore()
const studentsStore = useStudentsStore()

const selectedStudent = ref(null)

const handleLogout = async () => {
  await authStore.logout()
  studentsStore.resetStore()
  router.push('/login')
}

const selectStudent = (student) => {
  selectedStudent.value = student
  studentsStore.selectStudent(student)
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('ca-ES')
}

onMounted(async () => {
  await studentsStore.fetchStudents()
  if (studentsStore.students.length > 0) {
    selectStudent(studentsStore.students[0])
  }
})
</script>
