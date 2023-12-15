<script setup>
const props = defineProps(['title', 'now']);
</script>

<template>
  <div class="flex justify-between">
    <div class="text-zinc-300">{{ title }}</div>
    <div class="flex">
      <slot>
        <span>{{ now }}</span>
      </slot>
    </div>
  </div>
</template>
