<script setup>
import { ClockIcon } from "@heroicons/vue/16/solid";
import DiffIcon from "@/components/DiffIcon.vue";
import {computed} from "vue";

const props = defineProps([
  'title',

  'gain',
  'loss',
]);

const diff = computed(() => props.gain - props.loss);
</script>

<template>
  <div class="text-xs flex flex-col gap-1">
    <div class="flex justify-between">
      <div class="flex gap-1">
        <span class="font-bold">{{ title }}</span>
        <DiffIcon :diff="diff" />
      </div>
      <div v-if="diff" class="flex gap-1">
        <span v-format.plus="diff"></span>
        <ClockIcon class="w-3 text-zinc-300" />
      </div>
    </div>

    <div class="w-full bg-zinc-200 overflow-hidden relative h-4 rounded">
      <slot/>
    </div>
  </div>
</template>
