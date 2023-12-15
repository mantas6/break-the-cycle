<script setup>
import {computed} from "vue";

const props = defineProps([
  'title',
  'titleMin',
  'titleMax',

  'now',
  'min',
  'max',
  'center',
]);

const left = computed(() => {
  const minBoundAbs = Math.abs(props.min);
  const normalized = props.now + minBoundAbs;
  return Math.round(normalized / (props.max + minBoundAbs) * 100);
})
</script>

<template>
  <div class="text-xs flex flex-col gap-1">
    <div class="text-center font-bold">{{ title }}</div>

    <div class="w-full bg-gray-200 overflow-hidden relative h-4">
      <div class="absolute w-1/6 h-2 bg-red-300 bottom-0"></div>
      <div class="absolute w-1/6 h-2 bg-red-300 bottom-0 right-0"></div>

      <div class="absolute w-full flex justify-center bottom-0"><div class="bg-green-300 h-2 w-1/4"></div></div>

      <div class="absolute w-full flex justify-center">
        <div class="border-dotted border-l border-zinc-600 h-2"></div>
      </div>

      <div class="absolute bg-red-500 h-4 w-1" :style="{ left: `calc(${left}% - 2px)` }"></div>
    </div>

    <div class="flex justify-between">
      <span class="border-l pl-1 border-dotted">{{ titleMin }}</span>
      <span>OK</span>
      <span class="border-r pr-1 border-dotted">{{ titleMax }}</span>
    </div>
  </div>
</template>
