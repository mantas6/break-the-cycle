<script setup>
  const props = defineProps(['title', 'value', 'unit']);
</script>

<template>
  <div class="flex justify-between">
    <div class="text-zinc-300">{{ title }}</div>
    <div class="flex">
      <slot>
        <span>{{ value }}</span>
      </slot>
      <span v-if="unit">{{ unit }}</span>
    </div>
  </div>
</template>
