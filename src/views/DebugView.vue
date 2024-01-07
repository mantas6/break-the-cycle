<script setup>
import {useTimeStore} from "@/stores/time";
import {ChevronDoubleLeftIcon, ChevronDoubleRightIcon} from "@heroicons/vue/24/outline";
import {useUnlockStore} from "@/stores/unlock.js";
import {useDebugStore} from "@/stores/debug.js";

const time = useTimeStore();
const debug = useDebugStore();
</script>

<template>
  <div class="grid gap-3 text-center text-zinc-100 *:bg-zinc-700 hover:*:bg-zinc-800 active:*:bg-zinc-900 *:p-2 *:rounded">
    <button @click="debug.unlockAll" v-hover>Unlock All</button>
    <button @click="debug.unlockAllActions = true" v-hover>Unlock All Actions</button>
    <div class="flex gap-2 justify-center">
      <button @click="time.clockInterval += 50" v-hover><ChevronDoubleLeftIcon class="w-6" /></button>
      <span>{{ time.clockInterval }}ms</span>
      <button @click="time.clockInterval -= 50" v-hover><ChevronDoubleRightIcon class="w-6" /></button>
    </div>
  </div>
</template>
