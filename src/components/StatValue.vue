<script setup>
import {computed} from "vue";
import DiffIcon from "@/components/DiffIcon.vue";

const props = defineProps({
  title: String,
  now: Number,
  item: Object,
  format: String,
  valueClass: [String, Array, Object],
  diffLow: Number,
  diffHigh: Number,
});

const current = computed(() => props.item ? props.item.now : props.now)
const diff = computed(() => props.item.gain - props.item.loss);
</script>

<template>
  <div class="flex justify-between">
    <div class="text-zinc-300">{{ title }}</div>
    <div class="flex justify-center">
      <slot>
        <div class="flex items-center" :class="valueClass">
          <DiffIcon v-if="item" :diff="diff" :high="diffHigh" :low="diffLow" />
          <span v-if="item && format === 'percent'" v-format:percent="item.now / item.max"></span>
          <span v-else v-format:[format]="current"></span>
        </div>
      </slot>
    </div>
  </div>
</template>
