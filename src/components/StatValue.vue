<script setup>
defineProps(['title', 'now', 'format', 'valueClass']);
</script>

<template>
  <div class="flex justify-between">
    <div class="text-zinc-300">{{ title }}</div>
    <div class="flex">
      <slot>
        <span :class="valueClass" v-format:[format]="now"></span>
      </slot>
    </div>
  </div>
</template>
