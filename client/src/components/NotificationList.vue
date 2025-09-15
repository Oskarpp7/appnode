<template>
  <div>
    <h4 class="font-semibold mb-2">Notificacions Globals</h4>
    <ul class="divide-y divide-gray-200">
      <li v-for="notif in notifications" :key="notif.id" class="py-2 text-sm text-gray-600">
        <span class="font-bold">{{ notif.title }}:</span> {{ notif.message }} <span class="text-gray-400">({{ notif.date }})</span>
      </li>
    </ul>
  </div>
</template>
<script setup>
// Mockup
</script>
