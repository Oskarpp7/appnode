<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-6xl mx-auto px-4">
      <div class="bg-white rounded-lg shadow p-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">Formulari d'Estudiant Avançat</h1>
        
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

        <!-- Botons d'Acció -->
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel·lar
          </button>
          <button
            @click="saveStudent"
            type="button"
            class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Desant...</span>
            <span v-else>Desar Estudiant</span>
          </button>
        </div>

        <!-- Debug Info (temporal) -->
        <div v-if="showDebug" class="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 class="font-semibold mb-2">Debug Info:</h3>
          <pre class="text-xs text-gray-600 overflow-auto">{{ JSON.stringify({ student, tutors }, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import TutorManager from '@/components/TutorManager.vue'

const router = useRouter()

// États reactius
const isLoading = ref(false)
const showDebug = ref(true) // Per desenvolupament

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

// Errors
const errors = reactive({})

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
    console.log('Dades preparades per enviar:', {
      student,
      tutors: tutors.value
    })
    
    // Simulació de resposta exitosa
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert('Estudiant creat correctament!')
    // router.push('/students')
    
  } catch (error) {
    console.error('Error desant estudiant:', error)
    alert('Error desant l\'estudiant. Torna-ho a provar.')
  } finally {
    isLoading.value = false
  }
}
</script>
