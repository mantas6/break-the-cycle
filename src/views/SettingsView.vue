<script setup>
import { loadGame, resetGame, saveGame } from "@/routines/persistence";
import {useTimeStore} from "@/stores/time.js";
import {ChevronDoubleLeftIcon, ChevronDoubleRightIcon} from "@heroicons/vue/24/outline";

const time = useTimeStore();
</script>

<template>
  <div class="grid gap-3">
    <div class="flex flex-col gap-3">
      <button @click="saveGame">Save</button>
      <button @click="loadGame">Load</button>
      <button @click="resetGame">Reset</button>
    </div>

    <div class="flex gap-2 justify-center">
      <button @click="time.pause = !time.pause">{{ time.pause ? 'Unpause' : 'Pause' }}</button>
      <button @click="time.clockInterval += 50"><ChevronDoubleLeftIcon class="w-6" /></button>
      <span>{{ time.clockInterval }}ms</span>
      <button @click="time.clockInterval -= 50"><ChevronDoubleRightIcon class="w-6" /></button>
    </div>
  </div>
</template>
