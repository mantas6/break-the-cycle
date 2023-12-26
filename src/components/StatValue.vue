<script setup>
defineProps(['title', 'now', 'format', 'valueClass']);
</script>

<template>
  <div class="flex justify-between">
    <div class="text-zinc-300">{{ title }}</div>
    <div class="flex justify-center">
      <slot>
        <div :class="valueClass" v-format:[format]="now"></div>
      </slot>
    </div>
  </div>
</template>
