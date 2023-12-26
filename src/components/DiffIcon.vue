<script setup>
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@heroicons/vue/24/outline";

defineProps({
  diff: Number,
  // TODO: create definitions for icon type to use (or to use at all)
})
</script>

<template>
  <span v-if="diff > 0" class="text-green-300">
    <ChevronDoubleUpIcon v-if="diff > 1" class="w-4" />
    <ChevronUpIcon v-else class="w-4" />
  </span>
  <span v-else-if="diff < 0" class="text-red-300">
    <ChevronDoubleDownIcon v-if="diff < -1" class="w-4" />
    <ChevronDownIcon v-else class="w-4" />
  </span>
</template>
