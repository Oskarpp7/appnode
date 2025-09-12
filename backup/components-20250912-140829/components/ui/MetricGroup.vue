<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
    <StatCard
      v-for="(metric, index) in metrics"
      :key="index"
      v-bind="metric"
      :variant="variant"
      class="transform transition-all duration-200 hover:scale-105"
    />
  </div>
</template>

<script>
import StatCard from './StatCard.vue'

export default {
  name: 'MetricGroup',
  components: {
    StatCard
  },
  props: {
    metrics: {
      type: Array,
      required: true,
      validator: (metrics) => {
        return metrics.every(metric => 
          metric.title && 
          (metric.value !== undefined) &&
          metric.icon
        )
      }
    },
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'super-admin', 'admin-centre', 'coordinador', 'monitor', 'familia'].includes(value)
    }
  }
}
</script>
