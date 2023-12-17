<script setup>
import {computed} from "vue";
import NumberFormat from "@/components/NumberFormat.vue";
import { ChevronDoubleUpIcon, ChevronUpIcon, ChevronDoubleDownIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

const props = defineProps([
  'title',

  'now',
  'gain',
  'loss',
  'min',
  'max',
  'center', // Unused
]);

const width = computed(() => {
  return Math.round(props.now / props.max * 100);
})

const diff = computed(() => props.gain - props.loss);
</script>

<template>
  <div class="text-xs flex flex-col gap-1">
    <div class="flex justify-between">
      <div class="flex gap-1">
        <span class="font-bold">{{ title }}</span>
        <span v-if="diff > 0" class="text-green-300">
          <ChevronDoubleUpIcon v-if="diff > 1" class="w-4" />
          <ChevronUpIcon v-else class="w-4" />
        </span>
        <span v-else-if="diff < 0" class="text-red-300">
          <ChevronDoubleDownIcon v-if="diff < -1" class="w-4" />
          <ChevronDownIcon v-else class="w-4" />
        </span>
      </div>
      <div><NumberFormat :value="diff" /></div>
    </div>
    <div class="w-full bg-gray-200 overflow-hidden relative h-4">
      <div class="absolute h-4 bg-yellow-400 bottom-0" :style="{ width: width + '%' }"></div>
      <div class="absolute w-full flex justify-center">
        <div class="border-dotted border-l border-zinc-600 h-4"></div>
      </div>
      <div class="absolute w-1/4 h-4 border-red-500 border-dotted border-r bottom-0"></div>
    </div>
  </div>
</template>
