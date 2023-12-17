<script setup>
import NumberFormat from "@/components/NumberFormat.vue";

const props = defineProps(['title', 'now', 'type']);
</script>

<template>
  <div class="flex justify-between">
    <div class="text-zinc-300">{{ title }}</div>
    <div class="flex">
      <slot>
        <span><NumberFormat :type="type" :value="now" /></span>
      </slot>
    </div>
  </div>
</template>
