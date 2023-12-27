<script setup>
import {useTimeStore} from "@/stores/time";
import {ChevronDoubleLeftIcon, ChevronDoubleRightIcon} from "@heroicons/vue/24/outline";

const time = useTimeStore();
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex gap-2 justify-center">
      <button @click="time.pause = !time.pause" v-hover>{{ time.pause ? 'Unpause' : 'Pause' }}</button>
      <button @click="time.clockInterval += 50" v-hover><ChevronDoubleLeftIcon class="w-6" /></button>
      <span>{{ time.clockInterval }}ms</span>
      <button @click="time.clockInterval -= 50" v-hover><ChevronDoubleRightIcon class="w-6" /></button>
    </div>
  </div>
</template>
