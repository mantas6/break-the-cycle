<script setup>
import {computed} from "vue";
import DiffIcon from "@/components/DiffIcon.vue";
import StatBalanceBox from "@/components/StatBalanceBox.vue";

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
  <StatBalanceBox v-bind="$props">
    <div class="absolute h-4 bg-yellow-400 bottom-0" :style="{ width: width + '%' }"></div>
    <div class="absolute w-full flex justify-center">
      <div class="border-dotted border-l border-zinc-600 h-4"></div>
    </div>
    <div class="absolute w-1/4 h-4 border-red-500 border-dotted border-r bottom-0"></div>
  </StatBalanceBox>
</template>
