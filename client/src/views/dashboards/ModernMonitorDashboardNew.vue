<template>
  <ModernLayoutNew>
    <template #title>
      <div class="flex items-center gap-3">
        <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">MO</span>
        <div>
          <h1 class="text-xl font-bold">Monitor</h1>
          <p class="text-sm text-slate-500">Gestió diària</p>
        </div>
      </div>
    </template>

    <!-- Accions ràpides -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="card bg-gradient-to-r from-amber-500 to-amber-600 text-white">
        <div class="card-body">
          <h3 class="text-lg font-semibold mb-2">Passar Llista</h3>
          <p class="text-amber-100 text-sm mb-4">Registra assistència ràpida</p>
          <button class="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg">
            Iniciar
          </button>
        </div>
      </div>
      
      <div class="card bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div class="card-body">
          <h3 class="text-lg font-semibold mb-2">Nova Activitat</h3>
          <p class="text-blue-100 text-sm mb-4">Planifica sessions</p>
          <button class="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg">
            Crear
          </button>
        </div>
      </div>
      
      <div class="card bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div class="card-body">
          <h3 class="text-lg font-semibold mb-2">Informe</h3>
          <p class="text-green-100 text-sm mb-4">Resum setmanal</p>
          <button class="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg">
            Generar
          </button>
        </div>
      </div>
    </section>

    <!-- Resum d'avui -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      <div class="card"><div class="card-body">
        <p class="text-sm text-slate-500">Presents</p>
        <p class="text-3xl font-bold text-green-600">{{ daily.present }}</p>
      </div></div>
      <div class="card"><div class="card-body">
        <p class="text-sm text-slate-500">Absents</p>
        <p class="text-3xl font-bold text-red-600">{{ daily.absent }}</p>
      </div></div>
      <div class="card"><div class="card-body">
        <p class="text-sm text-slate-500">Activitats</p>
        <p class="text-3xl font-bold text-blue-600">{{ daily.activities }}</p>
      </div></div>
      <div class="card"><div class="card-body">
        <p class="text-sm text-slate-500">Assistència</p>
        <p class="text-3xl font-bold text-purple-600">{{ daily.attendance }}%</p>
      </div></div>
    </section>

    <!-- Grup d'estudiants i horari -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
      <div class="card"><div class="card-body">
        <h3 class="text-lg font-semibold mb-4">El Meu Grup (31 estudiants)</h3>
        <div class="space-y-2 max-h-80 overflow-y-auto">
          <div v-for="student in students" :key="student.name" 
               class="flex items-center justify-between p-2 rounded-lg"
               :class="student.present ? 'bg-green-50 border-l-4 border-green-400' : 'bg-red-50 border-l-4 border-red-400'">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 rounded-full flex items-center justify-center"
                   :class="student.present ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'">
                {{ student.present ? '✓' : '✗' }}
              </div>
              <div>
                <p class="font-medium text-sm">{{ student.name }}</p>
                <p class="text-xs text-slate-500">{{ student.grade }}</p>
              </div>
            </div>
            <span class="text-xs font-medium" :class="student.present ? 'text-green-600' : 'text-red-600'">
              {{ student.present ? 'Present' : 'Absent' }}
            </span>
          </div>
        </div>
      </div></div>

      <div class="card"><div class="card-body">
        <h3 class="text-lg font-semibold mb-4">Horari d'Avui</h3>
        <div class="space-y-3">
          <div class="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span class="text-blue-600 font-bold text-xs">15:00</span>
            </div>
            <div>
              <h4 class="font-semibold text-sm">Recollida i Berenar</h4>
              <p class="text-xs text-slate-600">Supervisió arribades</p>
              <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mt-1 inline-block">En curs</span>
            </div>
          </div>
          
          <div class="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
            <div class="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
              <span class="text-slate-600 font-bold text-xs">16:00</span>
            </div>
            <div>
              <h4 class="font-semibold text-sm">Futbol Iniciació</h4>
              <p class="text-xs text-slate-600">Camp - Grup A</p>
              <span class="text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded-full mt-1 inline-block">Programat</span>
            </div>
          </div>
        </div>
      </div></div>
    </section>
  </ModernLayoutNew>
</template>

<script setup>
import { ref } from 'vue'
import ModernLayoutNew from '@/components/layout/ModernLayoutNew.vue'

const daily = ref({ present: 28, absent: 3, activities: 5, attendance: 90 })
const students = ref([
  { name: 'Marc Fernández', grade: '6è Primària', present: true },
  { name: 'Laura Martínez', grade: '5è Primària', present: true },
  { name: 'Pol Sánchez', grade: '4t Primària', present: false },
  { name: 'Anna Vila', grade: '6è Primària', present: true }
])
</script>