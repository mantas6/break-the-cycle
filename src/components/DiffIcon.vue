<script setup>
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@heroicons/vue/16/solid";

const props = defineProps({
  diff: Number,
  low: { type: Number, default: 0 },
  high: { type: Number, default: 1 },
})

</script>

<template>
  <span v-if="diff > low" class="text-green-300">
    <ChevronDoubleUpIcon v-if="diff > high" class="w-4" />
    <ChevronUpIcon v-else class="w-4" />
  </span>
  <span v-else-if="diff < -low" class="text-red-300">
    <ChevronDoubleDownIcon v-if="diff < -high" class="w-4" />
    <ChevronDownIcon v-else class="w-4" />
  </span>
</template>
