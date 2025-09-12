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

        <!-- Informació Mèdica -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center">
            <HeartIcon class="w-5 h-5 mr-2 text-red-600" />
            Informació Mèdica
          </h2>
          
          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Número de Targeta Sanitària
                </label>
                <input
                  v-model="medicalData.numero_targeta_sanitaria"
                  type="text"
                  maxlength="50"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Centre de Salut / Metge de Capçalera
                </label>
                <input
                  v-model="medicalData.centre_salut"
                  type="text"
                  maxlength="200"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Al·lèrgies (separades per comes)
              </label>
              <input
                v-model="allergiesInput"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Fruits secs, làcteos, polen..."
                @blur="updateAllergies"
              />
              <div v-if="medicalData.allergies?.length" class="mt-2 flex flex-wrap gap-2">
                <span 
                  v-for="allergy in medicalData.allergies" 
                  :key="allergy"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
                >
                  {{ allergy }}
                  <button 
                    @click="removeAllergy(allergy)"
                    class="ml-1 text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </span>
              </div>
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Medicaments Habituals
              </label>
              <textarea
                v-model="medicalData.medicaments"
                rows="2"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Descriu els medicaments que pren habitualment..."
              ></textarea>
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Condicions Cròniques
              </label>
              <textarea
                v-model="medicalData.condicions_croniques"
                rows="2"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Asma, diabetis, epilèpsia..."
              ></textarea>
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Contacte d'Emergència Mèdica
              </label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  v-model="medicalData.contacte_emergencia_nom"
                  type="text"
                  placeholder="Nom del contacte d'emergència"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  v-model="medicalData.contacte_emergencia_telefon"
                  type="tel"
                  placeholder="Telèfon d'emergència"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div class="mt-4">
              <label class="flex items-center space-x-2">
                <input
                  v-model="medicalData.necessita_atencio_especial"
                  type="checkbox"
                  class="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span class="text-sm text-gray-700">Necessita atenció mèdica especial</span>
              </label>
            </div>

            <div v-if="medicalData.necessita_atencio_especial" class="mt-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Descripció Atenció Especial
              </label>
              <textarea
                v-model="medicalData.detalls_atencio_especial"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Descriu l'atenció mèdica especial que necessita..."
              ></textarea>
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Observacions Mèdiques Addicionals
              </label>
              <textarea
                v-model="medicalData.observacions_mediques"
                rows="2"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Qualsevol altra informació mèdica rellevant..."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Gestió de Documents -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center">
            <DocumentIcon class="w-5 h-5 mr-2 text-blue-600" />
            Documents de l'Estudiant
            <span class="ml-2 text-sm font-normal text-gray-500">({{ documents.length }} documents)</span>
          </h2>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <!-- Documents existents -->
            <div v-if="documents.length > 0" class="space-y-3 mb-4">
              <div 
                v-for="(doc, index) in documents" 
                :key="index"
                class="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between"
              >
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0">
                    <DocumentIcon class="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">{{ doc.nom_document }}</h4>
                    <p class="text-sm text-gray-600">{{ getDocumentTypeLabel(doc.tipus_document) }}</p>
                    <p v-if="doc.data_expiracio" class="text-xs text-gray-500">
                      Expira: {{ formatDate(doc.data_expiracio) }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span :class="getDocumentStatusClass(doc.estat_verificacio)">
                    {{ doc.estat_verificacio }}
                  </span>
                  <button
                    @click="removeDocument(index)"
                    class="p-1 text-red-600 hover:bg-red-50 rounded"
                    title="Eliminar document"
                  >
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Formulari per afegir document -->
            <div v-if="showDocumentForm" class="bg-white border border-gray-200 rounded-lg p-4 mb-4">
              <h4 class="text-md font-semibold text-gray-900 mb-4">Afegir Nou Document</h4>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Nom del Document *
                  </label>
                  <input
                    v-model="currentDocument.nom_document"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Tipus de Document *
                  </label>
                  <select
                    v-model="currentDocument.tipus_document"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona tipus...</option>
                    <option value="dni">DNI/NIE</option>
                    <option value="llibre_familia">Llibre de Família</option>
                    <option value="targeta_sanitaria">Targeta Sanitària</option>
                    <option value="informe_medic">Informe Mèdic</option>
                    <option value="certificat_escolar">Certificat Escolar</option>
                    <option value="autorizacio">Autorització</option>
                    <option value="altres">Altres</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Data d'Expiració
                  </label>
                  <input
                    v-model="currentDocument.data_expiracio"
                    type="date"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Seleccionar Fitxer *
                  </label>
                  <input
                    @change="handleFileSelect"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p class="text-xs text-gray-500 mt-1">
                    Formats permesos: PDF, JPG, PNG, DOC, DOCX (màx. 10MB)
                  </p>
                </div>

                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Observacions
                  </label>
                  <textarea
                    v-model="currentDocument.observacions"
                    rows="2"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Informació addicional sobre el document..."
                  ></textarea>
                </div>
              </div>

              <div class="flex justify-end space-x-3 mt-4">
                <button
                  @click="cancelDocumentForm"
                  type="button"
                  class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel·lar
                </button>
                <button
                  @click="addDocument"
                  type="button"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Afegir Document
                </button>
              </div>
            </div>

            <!-- Botó per afegir document -->
            <button
              v-if="!showDocumentForm"
              @click="showAddDocumentForm"
              type="button"
              class="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
            >
              <PlusIcon class="w-5 h-5 inline mr-2" />
              Afegir Document
            </button>
          </div>
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
            <span v-else">Desar Estudiant</span>
          </button>
        </div>

        <!-- Debug Info (temporal) -->
        <div v-if="showDebug" class="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 class="font-semibold mb-2">Debug Info:</h3>
          <pre class="text-xs text-gray-600 overflow-auto">{{ JSON.stringify({ student, tutors, medicalData, documents }, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
          </div>

          <div>
            <label for="birth_date" class="block text-sm font-medium text-gray-700 mb-1">
              Data de Naixement *
            </label>
            <input
              id="birth_date"
              v-model="form.birth_date"
              type="date"
              required
              :max="maxBirthDate"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.birth_date }"
            />
            <p v-if="errors.birth_date" class="text-sm text-red-600 mt-1">{{ errors.birth_date }}</p>
          </div>

          <div>
            <label for="dni_nie" class="block text-sm font-medium text-gray-700 mb-1">
              DNI/NIE
            </label>
            <input
              id="dni_nie"
              v-model="form.dni_nie"
              type="text"
              pattern="^([0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]|[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE])$"
              placeholder="12345678A o X1234567A"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.dni_nie }"
            />
            <p v-if="errors.dni_nie" class="text-sm text-red-600 mt-1">{{ errors.dni_nie }}</p>
          </div>

          <div>
            <label for="class_group" class="block text-sm font-medium text-gray-700 mb-1">
              Grup Classe *
            </label>
            <select
              id="class_group"
              v-model="form.class_group"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.class_group }"
            >
              <option value="">Selecciona grup...</option>
              <option v-for="group in classGroups" :key="group" :value="group">{{ group }}</option>
            </select>
            <p v-if="errors.class_group" class="text-sm text-red-600 mt-1">{{ errors.class_group }}</p>
          </div>

          <div>
            <label for="nacionalitat" class="block text-sm font-medium text-gray-700 mb-1">
              Nacionalitat
            </label>
            <input
              id="nacionalitat"
              v-model="form.nacionalitat"
              type="text"
              maxlength="100"
              placeholder="Espanyola"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <!-- Informació Acadèmica -->
      <div class="bg-gray-50 p-6 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <AcademicCapIcon class="w-5 h-5 mr-2 text-green-600" />
          Informació Acadèmica
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="curs_actual" class="block text-sm font-medium text-gray-700 mb-1">
              Curs Actual
            </label>
            <select
              id="curs_actual"
              v-model="form.curs_actual"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Selecciona curs...</option>
              <option v-for="course in courses" :key="course" :value="course">{{ course }}</option>
            </select>
          </div>

          <div class="flex items-center space-x-2">
            <input
              id="necessitats_educatives_especials"
              v-model="form.necessitats_educatives_especials"
              type="checkbox"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label for="necessitats_educatives_especials" class="text-sm font-medium text-gray-700">
              Necessitats Educatives Especials
            </label>
          </div>

          <div class="md:col-span-2">
            <label for="observacions_academiques" class="block text-sm font-medium text-gray-700 mb-1">
              Observacions Acadèmiques
            </label>
            <textarea
              id="observacions_academiques"
              v-model="form.observacions_academiques"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Informació rellevant sobre l'estudiant..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Beques i Ajudes -->
      <div class="bg-gray-50 p-6 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <CurrencyEuroIcon class="w-5 h-5 mr-2 text-yellow-600" />
          Beques i Ajudes
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="flex items-center space-x-2">
            <input
              id="te_beca"
              v-model="form.te_beca"
              type="checkbox"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label for="te_beca" class="text-sm font-medium text-gray-700">
              Té Beca
            </label>
          </div>

          <div v-if="form.te_beca">
            <label for="tipus_beca" class="block text-sm font-medium text-gray-700 mb-1">
              Tipus de Beca
            </label>
            <select
              id="tipus_beca"
              v-model="form.tipus_beca"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Selecciona tipus...</option>
              <option value="BC70">BC70 (70%)</option>
              <option value="BC100">BC100 (100%)</option>
              <option value="altres">Altres</option>
            </select>
          </div>

          <div v-if="form.te_beca">
            <label for="percentatge_beca" class="block text-sm font-medium text-gray-700 mb-1">
              Percentatge Beca (%)
            </label>
            <input
              id="percentatge_beca"
              v-model.number="form.percentatge_beca"
              type="number"
              min="0"
              max="100"
              step="0.01"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <!-- Tutors -->
      <TutorManager v-model="form.tutors" :errors="errors.tutors" />

      <!-- Botons d'Acció -->
      <div class="flex justify-end space-x-4 pt-6 border-t">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel·lar
        </button>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isSubmitting" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Guardant...
          </span>
          <span v-else>
            {{ isEditing ? 'Actualitzar' : 'Crear' }} Estudiant
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { UserIcon, AcademicCapIcon, CurrencyEuroIcon } from '@heroicons/vue/24/outline'
import TutorManager from './TutorManager.vue'

const props = defineProps({
  student: {
    type: Object,
    default: () => ({})
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

const isSubmitting = ref(false)
const errors = reactive({})

// Formulari reactiu
const form = reactive({
  first_name: '',
  last_name: '',
  birth_date: '',
  dni_nie: '',
  class_group: '',
  nacionalitat: 'Espanyola',
  lloc_naixement: '',
  adreca_completa: '',
  codi_postal: '',
  poblacio: '',
  provincia: '',
  curs_actual: '',
  grup_classe: '',
  necessitats_educatives_especials: false,
  observacions_academiques: '',
  te_beca: false,
  tipus_beca: '',
  percentatge_beca: 0,
  tutors: []
})

// Opcions de selecció
const classGroups = ['P3A', 'P3B', 'P4A', 'P4B', 'P5A', 'P5B', '1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B']
const courses = ['P3', 'P4', 'P5', '1r Primària', '2n Primària', '3r Primària', '4t Primària', '5è Primària', '6è Primària']

// Data màxima per naixement (avui)
const maxBirthDate = computed(() => {
  return new Date().toISOString().split('T')[0]
})

// Inicialitzar formulari si estem editant
watch(() => props.student, (newStudent) => {
  if (newStudent && Object.keys(newStudent).length > 0) {
    Object.assign(form, {
      ...newStudent,
      birth_date: newStudent.birth_date ? new Date(newStudent.birth_date).toISOString().split('T')[0] : '',
      tutors: newStudent.personesAutoritzades || []
    })
  }
}, { immediate: true })

// Validació client-side
const validateForm = () => {
  const newErrors = {}

  if (!form.first_name?.trim()) {
    newErrors.first_name = 'El nom és obligatori'
  } else if (form.first_name.length > 50) {
    newErrors.first_name = 'El nom no pot superar els 50 caràcters'
  }

  if (!form.last_name?.trim()) {
<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { 
  HeartIcon, 
  DocumentIcon,
  TrashIcon,
  PlusIcon 
} from '@heroicons/vue/24/outline'
import TutorManager from '@/components/TutorManager.vue'

const router = useRouter()

// État reactiu
const isLoading = ref(false)
const showDebug = ref(true) // Per desenvolupament
const showDocumentForm = ref(false)
const allergiesInput = ref('')

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
const medicalData = reactive({
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
const currentDocument = reactive({
  nom_document: '',
  tipus_document: '',
  data_expiracio: '',
  file: null,
  observacions: ''
})

// Errors
const errors = reactive({})

// Mètodes per gestionar al·lèrgies
const updateAllergies = () => {
  if (allergiesInput.value) {
    const newAllergies = allergiesInput.value
      .split(',')
      .map(allergy => allergy.trim())
      .filter(allergy => allergy.length > 0)
    
    // Afegir noves al·lèrgies sense duplicats
    newAllergies.forEach(allergy => {
      if (!medicalData.allergies.includes(allergy)) {
        medicalData.allergies.push(allergy)
      }
    })
    
    allergiesInput.value = ''
  }
}

const removeAllergy = (allergy) => {
  const index = medicalData.allergies.indexOf(allergy)
  if (index > -1) {
    medicalData.allergies.splice(index, 1)
  }
}

// Mètodes per gestionar documents
const getDocumentTypeLabel = (type) => {
  const labels = {
    dni: 'DNI/NIE',
    llibre_familia: 'Llibre de Família',
    targeta_sanitaria: 'Targeta Sanitària',
    informe_medic: 'Informe Mèdic',
    certificat_escolar: 'Certificat Escolar',
    autorizacio: 'Autorització',
    altres: 'Altres'
  }
  return labels[type] || type
}

const getDocumentStatusClass = (status) => {
  const classes = {
    'pendent': 'text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800',
    'verificat': 'text-xs px-2 py-1 rounded-full bg-green-100 text-green-800',
    'rebutjat': 'text-xs px-2 py-1 rounded-full bg-red-100 text-red-800'
  }
  return classes[status] || classes['pendent']
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('ca-ES')
}

const showAddDocumentForm = () => {
  resetCurrentDocument()
  showDocumentForm.value = true
}

const cancelDocumentForm = () => {
  resetCurrentDocument()
  showDocumentForm.value = false
}

const resetCurrentDocument = () => {
  Object.assign(currentDocument, {
    nom_document: '',
    tipus_document: '',
    data_expiracio: '',
    file: null,
    observacions: ''
  })
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validar mida del fitxer (10MB màxim)
    if (file.size > 10 * 1024 * 1024) {
      alert('El fitxer és massa gran. Mida màxima: 10MB')
      event.target.value = ''
      return
    }
    
    currentDocument.file = file
    
    // Si no hi ha nom de document, usar el nom del fitxer
    if (!currentDocument.nom_document) {
      currentDocument.nom_document = file.name.split('.')[0]
    }
  }
}

const addDocument = () => {
  if (!currentDocument.nom_document || !currentDocument.tipus_document || !currentDocument.file) {
    alert('Omple tots els camps obligatoris')
    return
  }
  
  // Crear objecte document
  const documentData = {
    nom_document: currentDocument.nom_document,
    tipus_document: currentDocument.tipus_document,
    data_expiracio: currentDocument.data_expiracio || null,
    observacions: currentDocument.observacions,
    estat_verificacio: 'pendent',
    file: currentDocument.file,
    fileName: currentDocument.file.name,
    fileSize: currentDocument.file.size,
    mimeType: currentDocument.file.type
  }
  
  documents.value.push(documentData)
  cancelDocumentForm()
}

const removeDocument = (index) => {
  if (confirm('Estàs segur que vols eliminar aquest document?')) {
    documents.value.splice(index, 1)
  }
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
      if (student[key] !== null && student[key] !== undefined) {
        formData.append(key, student[key])
      }
    })
    
    // Tutors
    formData.append('tutors', JSON.stringify(tutors.value))
    
    // Dades mèdiques
    formData.append('medicalData', JSON.stringify(medicalData))
    
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
      tutors: tutors.value,
      medicalData,
      documents: documents.value.length
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
