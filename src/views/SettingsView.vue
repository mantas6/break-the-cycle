<script setup>
import { loadGame, resetGame, saveGame } from "@/routines/persistence";
import {useTimeStore} from "@/stores/time.js";
import {ChevronDoubleLeftIcon, ChevronDoubleRightIcon} from "@heroicons/vue/24/outline";
import {useRouter} from "vue-router";

const time = useTimeStore();
const router = useRouter()

function reset() {
  resetGame();
  router.push('/');
}
</script>

<template>
  <div class="grid gap-3">
    <div class="flex flex-col gap-3">
      <button @click="saveGame" v-hover>Save</button>
      <button @click="loadGame" v-hover>Load</button>
      <button @click="reset" v-hover>Reset</button>
    </div>

    <div class="flex gap-2 justify-center">
      <button @click="time.pause = !time.pause" v-hover>{{ time.pause ? 'Unpause' : 'Pause' }}</button>
      <button @click="time.clockInterval += 50" v-hover><ChevronDoubleLeftIcon class="w-6" /></button>
      <span>{{ time.clockInterval }}ms</span>
      <button @click="time.clockInterval -= 50" v-hover><ChevronDoubleRightIcon class="w-6" /></button>
    </div>
  </div>
</template>
