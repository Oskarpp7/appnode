<template>
  <ModernLayoutNew>
    <template #title>
      <div class="flex items-center gap-3">
        <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">CO</span>
        <div>
          <h1 class="text-xl font-bold">Coordinador</h1>
          <p class="text-sm text-slate-500">Gestió d'activitats</p>
        </div>
      </div>
    </template>

    <!-- KPIs -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card"><div class="card-body">
        <p class="text-sm text-slate-500">Estudiants</p>
        <p class="text-3xl font-bold text-primary-600">{{ kpis.students }}</p>
      </div></div>
      <div class="card"><div class="card-body">
        <p class="text-sm text-slate-500">Activitats</p>
        <p class="text-3xl font-bold text-emerald-600">{{ kpis.activities }}</p>
      </div></div>
      <div class="card"><div class="card-body">
        <p class="text-sm text-slate-500">Monitors</p>
        <p class="text-3xl font-bold text-indigo-600">{{ kpis.monitors }}</p>
      </div></div>
      <div class="card"><div class="card-body">
        <p class="text-sm text-slate-500">Ocupació</p>
        <p class="text-3xl font-bold text-rose-600">{{ kpis.occupancy }}%</p>
      </div></div>
    </section>

    <!-- Planificació -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
      <div class="card"><div class="card-body">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">Planificació Setmanal</h3>
          <button class="btn-primary text-sm">Nova Activitat</button>
        </div>
        <div class="space-y-3">
          <div class="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
            <div class="flex justify-between items-start">
              <div>
                <p class="font-medium">Futbol Iniciació</p>
                <p class="text-sm text-slate-600">Dilluns 16:00 - 17:30</p>
                <p class="text-sm text-green-600">Monitor: Joan Pérez</p>
              </div>
              <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">24/25</span>
            </div>
          </div>
          
          <div class="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <div class="flex justify-between items-start">
              <div>
                <p class="font-medium">Taller d'Art</p>
                <p class="text-sm text-slate-600">Dimarts 15:30 - 17:00</p>
                <p class="text-sm text-blue-600">Monitor: Maria Soler</p>
              </div>
              <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">18/20</span>
            </div>
          </div>
        </div>
      </div></div>

      <div class="card"><div class="card-body">
        <h3 class="text-lg font-semibold mb-4">Monitors</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span class="text-green-600 text-sm font-bold">JP</span>
              </div>
              <div>
                <p class="font-medium">Joan Pérez</p>
                <p class="text-sm text-slate-600">Esports</p>
              </div>
            </div>
            <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Disponible</span>
          </div>
          
          <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-blue-600 text-sm font-bold">MS</span>
              </div>
              <div>
                <p class="font-medium">Maria Soler</p>
                <p class="text-sm text-slate-600">Arts</p>
              </div>
            </div>
            <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Disponible</span>
          </div>
        </div>
      </div></div>
    </section>
  </ModernLayoutNew>
</template>

<script setup>
import { ref } from 'vue'
import ModernLayoutNew from '@/components/layout/ModernLayoutNew.vue'

const kpis = ref({ students: 342, activities: 18, monitors: 12, occupancy: 87 })
</script>