<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MetricGroup',
  props: {
    metrics: {
      type: Array,
      default: () => []
    },
    variant: {
      type: String,
      default: 'default'
    }
  }
}
</script>
