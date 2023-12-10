<script setup>
  const props = defineProps(['title', 'value', 'unit']);
</script>

<template>
  <div class="flex justify-between">
    <div>{{ title }}</div>
    <div class="flex">
      <span>{{ value }}</span>
      <span v-if="unit">{{ unit }}</span>
    </div>
  </div>
</template>
