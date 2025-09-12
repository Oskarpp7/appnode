<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-6xl mx-auto px-4">
      <div class="bg-white rounded-lg shadow p-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">Formulari d'Estudiant Complet</h1>
        
        <!-- Informació Bàsica -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Informació Personal
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Nom *
              </label>
              <input
                v-model="student.nom"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                :class="{ 'border-red-500': errors.nom }"
              />
              <p v-if="errors.nom" class="text-sm text-red-600 mt-1">{{ errors.nom }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Cognoms *
              </label>
              <input
                v-model="student.cognoms"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                :class="{ 'border-red-500': errors.cognoms }"
              />
              <p v-if="errors.cognoms" class="text-sm text-red-600 mt-1">{{ errors.cognoms }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Data de Naixement *
              </label>
              <input
                v-model="student.data_naixement"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                :class="{ 'border-red-500': errors.data_naixement }"
              />
              <p v-if="errors.data_naixement" class="text-sm text-red-600 mt-1">{{ errors.data_naixement }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Gènere
              </label>
              <select
                v-model="student.genere"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona...</option>
                <option value="masculí">Masculí</option>
                <option value="femení">Femení</option>
                <option value="no_binari">No binari</option>
                <option value="prefere_no_dir">Prefere no dir</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Tutors i Persones Autoritzades -->
        <div class="mb-8">
          <TutorManager 
            v-model="tutors" 
            :errors="errors.tutors"
          />
        </div>

        <!-- Informació Acadèmica -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Informació Acadèmica
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Curs *
              </label>
              <select
                v-model="student.curs"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                :class="{ 'border-red-500': errors.curs }"
              >
                <option value="">Selecciona curs...</option>
                <option value="infantil-3">Infantil 3 anys</option>
                <option value="infantil-4">Infantil 4 anys</option>
                <option value="infantil-5">Infantil 5 anys</option>
                <option value="primaria-1">1r Primària</option>
                <option value="primaria-2">2n Primària</option>
                <option value="primaria-3">3r Primària</option>
                <option value="primaria-4">4t Primària</option>
                <option value="primaria-5">5è Primària</option>
                <option value="primaria-6">6è Primària</option>
                <option value="eso-1">1r ESO</option>
                <option value="eso-2">2n ESO</option>
                <option value="eso-3">3r ESO</option>
                <option value="eso-4">4t ESO</option>
              </select>
              <p v-if="errors.curs" class="text-sm text-red-600 mt-1">{{ errors.curs }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Grup/Classe
              </label>
              <input
                v-model="student.grup_classe"
                type="text"
                maxlength="10"
                placeholder="A, B, C..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Centre Procedència
              </label>
              <input
                v-model="student.centre_procedencia"
                type="text"
                maxlength="200"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Data d'Inscripció
              </label>
              <input
                v-model="student.data_inscripcio"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="flex items-center space-x-2 mt-6">
                <input
                  v-model="student.necessitats_especials"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span class="text-sm text-gray-700">Té necessitats educatives especials</span>
              </label>
            </div>
          </div>

          <div v-if="student.necessitats_especials" class="mt-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Descripció Necessitats Especials
            </label>
            <textarea
              v-model="student.descripcio_necessitats"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descriu les necessitats educatives especials..."
            ></textarea>
          </div>
        </div>

        <!-- Informació de Contacte -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Informació de Contacte
          </h2>
          
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Adreça Completa
              </label>
              <textarea
                v-model="student.adreca"
                rows="2"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Carrer, número, pis, porta..."
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Codi Postal
                </label>
                <input
                  v-model="student.codi_postal"
                  type="text"
                  maxlength="10"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Població
                </label>
                <input
                  v-model="student.poblacio"
                  type="text"
                  maxlength="100"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Província
                </label>
                <input
                  v-model="student.provincia"
                  type="text"
                  maxlength="100"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Informació Mèdica -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Informació Mèdica
          </h2>
          
          <MedicalDataForm 
            v-model="medicalData"
            :errors="errors.medicalData"
          />
        </div>

        <!-- Gestió de Documents -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Documents
          </h2>
          
          <DocumentUpload 
            v-model="documents"
            :errors="errors.documents"
          />
        </div>

        <!-- Observacions Generals -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Observacions Generals
          </h2>
          
          <textarea
            v-model="student.observacions"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Informació addicional sobre l'estudiant..."
          ></textarea>
        </div>

        <!-- Notificació d'èxit -->
        <div v-if="showSuccessMessage" class="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-green-800">
                {{ successMessage }}
              </p>
            </div>
          </div>
        </div>

        <!-- Botons d'Acció -->
        <div class="flex justify-between items-center space-x-4">
          <div class="text-sm text-gray-500">
            <p>Les dades es guarden automàticament cada 30 segons</p>
          </div>
          <div class="flex space-x-4">
            <button
              type="button"
              class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              @click="restoreFromLocalStorage"
            >
              Restaurar Draft
            </button>
            <button
              @click="saveStudent"
              type="button"
              class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Desant...
              </span>
              <span v-else>Desar Estudiant</span>
            </button>
          </div>
        </div>

        <!-- Debug Info (temporal) -->
        <div v-if="showDebug" class="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 class="font-semibold mb-2">Debug Info:</h3>
          <pre class="text-xs text-gray-600 overflow-auto">{{ JSON.stringify({ 
            student, 
            tutors, 
            medicalData, 
            documents: documents.length + ' documents'
          }, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import TutorManager from '@/components/TutorManager.vue'
import MedicalDataForm from '@/components/MedicalDataForm.vue'
import DocumentUpload from '@/components/DocumentUpload.vue'

const router = useRouter()
const authStore = useAuthStore()

// États reactius
const isLoading = ref(false)
const showDebug = ref(true) // Per desenvolupament
const showSuccessMessage = ref(false)
const successMessage = ref('')

// Dades de l'estudiant
const student = reactive({
  nom: '',
  cognoms: '',
  data_naixement: '',
  genere: '',
  curs: '',
  grup_classe: '',
  centre_procedencia: '',
  data_inscripcio: '',
  necessitats_especials: false,
  descripcio_necessitats: '',
  adreca: '',
  codi_postal: '',
  poblacio: '',
  provincia: '',
  observacions: ''
})

// Tutors
const tutors = ref([])

// Dades mèdiques
const medicalData = ref({
  numero_targeta_sanitaria: '',
  centre_salut: '',
  allergies: [],
  medicaments: '',
  condicions_croniques: '',
  contacte_emergencia_nom: '',
  contacte_emergencia_telefon: '',
  necessita_atencio_especial: false,
  detalls_atencio_especial: '',
  observacions_mediques: ''
})

// Documents
const documents = ref([])

// Errors
const errors = reactive({})

// Pre-omplir dades del tutor autenticat
onMounted(() => {
  // Auto-save/restore des de localStorage
  restoreFromLocalStorage()
  
  // Pre-omplir primer tutor amb dades de l'usuari autenticat
  if (authStore.user && tutors.value.length === 0) {
    const primaryTutor = {
      nom: authStore.user.first_name || authStore.user.name || '',
      cognoms: authStore.user.last_name || '',
      dni_nie: authStore.user.dni_nie || '',
      telefon_principal: authStore.user.phone || '',
      telefon_secundari: '',
      email: authStore.user.email || '',
      relacio_familiar: 'tutor_legal',
      prioritat_contacte: 1,
      autoritzat_recollir: true,
      autoritzat_decisio_medica: true,
      observacions: 'Tutor principal (usuari autenticat)',
      is_primary: true // Marcar com a tutor principal
    }
    
    tutors.value.push(primaryTutor)
  }
  
  // Auto-save cada 30 segons
  setInterval(saveToLocalStorage, 30000)
})

// Auto-save al localStorage
const saveToLocalStorage = () => {
  const formData = {
    student: student,
    tutors: tutors.value,
    medicalData: medicalData.value,
    timestamp: new Date().toISOString()
  }
  localStorage.setItem('student_form_draft', JSON.stringify(formData))
}

// Restore des de localStorage
const restoreFromLocalStorage = () => {
  const saved = localStorage.getItem('student_form_draft')
  if (saved) {
    try {
      const formData = JSON.parse(saved)
      const savedTime = new Date(formData.timestamp)
      const now = new Date()
      
      // Només restore si és menys de 24h antic
      if (now - savedTime < 24 * 60 * 60 * 1000) {
        if (confirm('S\'ha trobat un formulari guardat automàticament. Vols restaurar les dades?')) {
          Object.assign(student, formData.student)
          tutors.value = formData.tutors || []
          medicalData.value = formData.medicalData || medicalData.value
        }
      } else {
        // Eliminar dades antigues
        localStorage.removeItem('student_form_draft')
      }
    } catch (error) {
      console.error('Error restaurant dades:', error)
    }
  }
}

const showSuccessNotification = (message) => {
  successMessage.value = message
  showSuccessMessage.value = true
  setTimeout(() => {
    showSuccessMessage.value = false
  }, 5000)
}

// Validació i desar estudiant
const validateForm = () => {
  const newErrors = {}
  
  if (!student.nom?.trim()) {
    newErrors.nom = 'El nom és obligatori'
  }
  
  if (!student.cognoms?.trim()) {
    newErrors.cognoms = 'Els cognoms són obligatoris'
  }
  
  if (!student.data_naixement) {
    newErrors.data_naixement = 'La data de naixement és obligatòria'
  }
  
  if (!student.curs) {
    newErrors.curs = 'El curs és obligatori'
  }
  
  if (tutors.value.length === 0) {
    newErrors.tutors = 'Cal afegir almenys un tutor'
  }
  
  Object.assign(errors, newErrors)
  return Object.keys(newErrors).length === 0
}

const saveStudent = async () => {
  // Netejar errors previs
  Object.keys(errors).forEach(key => delete errors[key])
  
  if (!validateForm()) {
    alert('Comprova els errors del formulari')
    return
  }
  
  isLoading.value = true
  
  try {
    // Preparar dades per enviar
    const formData = new FormData()
    
    // Dades bàsiques de l'estudiant
    Object.keys(student).forEach(key => {
      if (student[key] !== null && student[key] !== undefined && student[key] !== '') {
        formData.append(key, student[key])
      }
    })
    
    // Tutors
    formData.append('tutors', JSON.stringify(tutors.value))
    
    // Dades mèdiques
    formData.append('medicalData', JSON.stringify(medicalData.value))
    
    // Documents
    documents.value.forEach((doc, index) => {
      if (doc.file) {
        formData.append(`document_${index}`, doc.file)
        formData.append(`document_${index}_data`, JSON.stringify({
          nom_document: doc.nom_document,
          tipus_document: doc.tipus_document,
          data_expiracio: doc.data_expiracio,
          observacions: doc.observacions
        }))
      }
    })
    
    console.log('Dades preparades per enviar:', {
      student,
      tutors: tutors.value.length + ' tutors',
      medicalData: medicalData.value,
      documents: documents.value.length + ' documents'
    })
    
    // Aquí faries la crida a l'API
    // const response = await fetch('/api/students', {
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    
    // Simulació de resposta exitosa
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Eliminar draft després de guardar
    localStorage.removeItem('student_form_draft')
    
    showSuccessNotification('Estudiant creat correctament! Totes les dades han estat guardades.')
    
    // Opcional: navegar a la llista d'estudiants
    // router.push('/students')
    
  } catch (error) {
    console.error('Error desant estudiant:', error)
    alert('Error desant l\'estudiant. Torna-ho a provar.')
  } finally {
    isLoading.value = false
  }
}
</script>
