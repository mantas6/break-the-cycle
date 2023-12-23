<script setup>
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import NumberFormat from "@/components/NumberFormat.vue";

const props = defineProps({
  now: Number,
  loss: Number,
  gain: Number,
})
</script>

<template>
  <div class="flex flex-col">
    <div class="text-3xl text-center"><NumberFormat format="currency" :value="now" /></div>
    <div class="flex justify-between text-xs">
      <div class="flex gap-1">
        <ChevronUpIcon class="w-4 text-green-500" />
        <span><NumberFormat format="currency" :value="gain" /></span>
      </div>
      <div class="flex gap-1">
        <ChevronDownIcon class="w-4 text-red-500" />
        <span><NumberFormat format="currency" :value="loss" /></span>
      </div>
    </div>
  </div>
</template>