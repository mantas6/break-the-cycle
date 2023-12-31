<script setup>
import {computed} from "vue";
import DiffIcon from "@/components/DiffIcon.vue";
import StatBalanceBox from "@/components/StatBalanceBox.vue";

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
  <StatBalanceBox v-bind="$props">
    <div class="absolute w-1/6 h-4 bg-red-200 bottom-0">
      <div class="text-zinc-600 text-center">{{ titleMin }}</div>
    </div>
    <div class="absolute w-1/6 h-4 bg-red-200 bottom-0 right-0">
      <div class="text-zinc-600 text-center">{{ titleMax }}</div>
    </div>

    <div class="absolute w-full flex justify-center bottom-0"><div class="bg-green-200 h-4 w-1/4"></div></div>

    <div class="absolute w-full flex justify-center">
      <div class="border-dotted border-l border-zinc-600 h-4"></div>
    </div>

    <div class="absolute bg-red-500 h-4 w-1" :style="{ left: `calc(${left}% - 2px)` }"></div>
  </StatBalanceBox>
</template>
