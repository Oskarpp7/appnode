<template>
  <div>
    <h4 class="font-semibold mb-2">Logs i Monitorització</h4>
    <ul class="divide-y divide-gray-200">
      <li v-for="log in logs" :key="log.id" class="py-2 text-sm text-gray-600">
        <span class="font-bold">{{ log.type }}:</span> {{ log.message }} <span class="text-gray-400">({{ log.date }})</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LogList',
  props: {
    logs: {
      type: Array,
      default: () => [
        { id: 1, type: 'INFO', message: 'Sistema inicialitzat', date: '15/09/2025' },
        { id: 2, type: 'ERROR', message: 'Error facturació', date: '14/09/2025' }
      ]
    }
  }
}
</script>
