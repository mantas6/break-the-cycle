<script setup>
import {computed} from "vue";

const props = defineProps([
  'title',

  'now',
  'min',
  'max',
  'center', // Unused
]);

const width = computed(() => {
  return Math.round(props.now / props.max * 100);
})
</script>

<template>
  <div class="text-xs flex flex-col gap-1">
    <div class="text-center font-bold">{{ title }}</div>
    <div class="w-full bg-gray-200 overflow-hidden relative h-4">
      <div class="absolute h-4 bg-yellow-400 bottom-0" :style="{ width: width + '%' }"></div>
      <div class="absolute w-full flex justify-center">
        <div class="border-dotted border-l border-zinc-600 h-4"></div>
      </div>
    </div>
  </div>
</template>
