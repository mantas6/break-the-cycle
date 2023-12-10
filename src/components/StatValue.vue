<script setup>
  const props = defineProps(['title', 'value']);
</script>

<template>
  <div class="flex justify-between">
    <div class="text-zinc-300">{{ title }}</div>
    <div class="flex">
      <slot>
        <span>{{ value }}</span>
      </slot>
    </div>
  </div>
</template>
