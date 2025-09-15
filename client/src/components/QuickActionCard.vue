<template>
  <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition">
    <div class="text-3xl mb-2">{{ icon }}</div>
    <div class="font-semibold text-gray-700">{{ title }}</div>
  </div>
</template>
<script>
export default {
  name: 'QuickActionCard',
  props: {
    title: String,
    icon: String
  }
}
</script>
