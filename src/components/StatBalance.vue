<script setup>
import {computed} from "vue";

const props = defineProps(['title', 'now', 'min', 'max', 'center']);

const width = computed(() => 20)
</script>

<template>
  <div class="text-xs flex flex-col gap-1">
    <div class="text-center font-bold">{{ title }}</div>
    <div class="w-full bg-gray-200 overflow-hidden relative h-4">
      <div class="bg-blue-500 h-4 absolute" :style="{ width: width + '%', left: '50%' }"></div>
      <div class="absolute w-full flex justify-center">
        <div class="bg-red-500 h-4 w-1"></div>
      </div>
    </div>
    <div class="flex justify-between">
      <span>Lazy</span>
      <span>OK</span>
      <span>Tired</span>
    </div>
  </div>
</template>
