<template>
  <ModernLayoutNew>
    <template #title>
      <div class="flex items-center gap-3">
        <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">AD</span>
        <div>
          <h1 class="text-xl font-bold">Admin</h1>
          <p class="text-sm text-slate-500">Gestió del centre</p>
        </div>
      </div>
    </template>

    <!-- KPIs -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card"><div class="card-body">
        <p class="text-sm text-slate-500">Estudiants Actius</p>
        <p class="text-3xl font-bold text-primary-600">{{ kpis.students }}</p>
      </div></div>
      <div class="card"><div class="card-body">
        <p class="text-sm text-slate-500">Personal</p>
        <p class="text-3xl font-bold text-emerald-600">{{ kpis.staff }}</p>
      </div></div>
      <div class="card"><div class="card-body">
        <p class="text-sm text-slate-500">Activitats</p>
        <p class="text-3xl font-bold text-indigo-600">{{ kpis.activities }}</p>
      </div></div>
      <div class="card"><div class="card-body">
        <p class="text-sm text-slate-500">Assistència Mitjana</p>
        <p class="text-3xl font-bold text-rose-600">{{ kpis.attendance }}%</p>
      </div></div>
    </section>

    <!-- Contingut principal -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
      <div class="card"><div class="card-body">
        <h3 class="text-lg font-semibold mb-4">Resum Setmanal</h3>
        <div class="space-y-3">
          <div class="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
            <span class="text-sm font-medium">Inscripcions noves</span>
            <span class="text-lg font-bold text-green-600">+12</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
            <span class="text-sm font-medium">Pagaments pendents</span>
            <span class="text-lg font-bold text-amber-600">€2.450</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
            <span class="text-sm font-medium">Comunicacions enviades</span>
            <span class="text-lg font-bold text-blue-600">24</span>
          </div>
        </div>
      </div></div>

      <div class="card"><div class="card-body">
        <h3 class="text-lg font-semibold mb-4">Accions Ràpides</h3>
        <div class="grid grid-cols-2 gap-3">
          <button class="btn-primary">Gestionar Usuaris</button>
          <button class="btn-primary">Configuració</button>
          <button class="btn-primary">Informes</button>
          <button class="btn-primary">Comunicacions</button>
        </div>
      </div></div>
    </section>

    <!-- Activitat recent -->
    <section class="card mt-6"><div class="card-body">
      <h3 class="text-lg font-semibold mb-4">Activitat Recent</h3>
      <div class="space-y-3">
        <div class="flex items-center gap-3 p-3 border-l-4 border-green-400 bg-green-50">
          <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <span class="text-green-600 text-sm">✓</span>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium">Nova inscripció processada</p>
            <p class="text-xs text-slate-500">Marc Fernández - 6è Primària</p>
          </div>
          <span class="text-xs text-slate-400">Fa 2h</span>
        </div>
        
        <div class="flex items-center gap-3 p-3 border-l-4 border-blue-400 bg-blue-50">
          <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span class="text-blue-600 text-sm">€</span>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium">Pagament rebut</p>
            <p class="text-xs text-slate-500">Família González - €48.00</p>
          </div>
          <span class="text-xs text-slate-400">Fa 4h</span>
        </div>
      </div>
    </div></section>
  </ModernLayoutNew>
</template>

<script setup>
import { ref } from 'vue'
import ModernLayoutNew from '@/components/layout/ModernLayoutNew.vue'

const kpis = ref({ students: 342, staff: 28, activities: 15, attendance: 94 })
</script>