<template>
  <aside :class="['h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all',
                 collapsed ? 'w-16' : 'w-64']" aria-label="Barra de navegació">
    <div class="h-16 flex items-center justify-center border-b border-slate-200 dark:border-slate-800">
      <button @click="$emit('toggle')" class="btn-ghost" aria-label="Plegar/Desplegar sidebar">
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>
    <nav class="p-3 space-y-1">
      <RouterLink v-for="item in items" :key="item.to" :to="item.to"
        class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
        :class="$route.path.startsWith(item.to) ? 'bg-slate-100 dark:bg-slate-800 font-semibold' : ''">
        <component :is="item.icon" class="h-5 w-5" />
        <span v-if="!collapsed">{{ item.label }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
const $route = useRoute()
defineProps({
  collapsed: { type: Boolean, default: false },
  items: { type: Array, default: () => [] }
})
defineEmits(['toggle'])
</script>