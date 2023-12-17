<script setup>
import NumberFormat from "@/components/NumberFormat.vue";

const props = defineProps(['title', 'now', 'format', 'valueClass']);
</script>

<template>
  <div class="flex justify-between">
    <div class="text-zinc-300">{{ title }}</div>
    <div class="flex">
      <slot>
        <span :class="valueClass"><NumberFormat :format="format" :value="now" /></span>
      </slot>
    </div>
  </div>
</template>
