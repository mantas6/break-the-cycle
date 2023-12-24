<script setup>
import {computed} from "vue";
import { ChevronDoubleUpIcon, ChevronUpIcon, ChevronDoubleDownIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

const props = defineProps([
  'title',
  'titleMin',
  'titleMax',

  'now',
  'gain',
  'loss',
  'min',
  'max',
  'center',
]);

const left = computed(() => {
  const minBoundAbs = Math.abs(props.min);
  const normalized = props.now + minBoundAbs;
  return Math.round(normalized / (props.max + minBoundAbs) * 100);
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
      <div v-format="gain - loss"></div>
    </div>

    <div class="w-full bg-zinc-200 overflow-hidden relative h-4">
      <div class="absolute w-1/6 h-4 bg-red-200 bottom-0"></div>
      <div class="absolute w-1/6 h-4 bg-red-200 bottom-0 right-0"></div>

      <div class="absolute w-full flex justify-center bottom-0"><div class="bg-green-200 h-4 w-1/4"></div></div>

      <div class="absolute w-full flex justify-center">
        <div class="border-dotted border-l border-zinc-600 h-4"></div>
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
