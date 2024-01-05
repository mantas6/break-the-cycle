<script setup>
import {computed} from "vue";
import DiffIcon from "@/components/DiffIcon.vue";
import StatBalanceBox from "@/components/StatBalanceBox.vue";

const props = defineProps({
  title: String,
  now: Number,
  gain: Number,
  loss: Number,
  min: Number,
  max: Number,
  upperLimit: Number,
  barColor: { type: String, default: 'bg-yellow-400' },
  borders: Boolean,
})

const width = computed(() => {
  return Math.round(props.now / props.max * 100);
})

const limitWidth = computed(() => {
  return Math.round((1 - props.upperLimit / props.max) * 100);
});

const diff = computed(() => props.gain - props.loss);
</script>

<template>
  <StatBalanceBox v-bind="$props">
    <div class="absolute h-4 bottom-0" :class="barColor" :style="{ width: width + '%' }"></div>
    <template v-if="borders">
      <div class="absolute w-full flex justify-center">
        <div class="border-dotted border-l border-zinc-600 h-4"></div>
      </div>
      <div class="absolute w-1/4 h-4 border-red-500 border-dotted border-r bottom-0"></div>
    </template>
    <div class="absolute h-4 bottom-0 right-0 bg-red-400" :style="{ width: limitWidth + '%' }"></div>
  </StatBalanceBox>
</template>
