<script setup>
import {useTimeStore} from "@/stores/time";
import {ChevronDoubleLeftIcon, ChevronDoubleRightIcon} from "@heroicons/vue/24/outline";
import {useUnlockStore} from "@/stores/unlock.js";

const time = useTimeStore();
const unlock = useUnlockStore();
</script>

<template>
  <div class="flex flex-col gap-3">
    <button @click="unlock.unlockAll" v-hover>Unlock All</button>
    <div class="flex gap-2 justify-center">
      <button @click="time.clockInterval += 50" v-hover><ChevronDoubleLeftIcon class="w-6" /></button>
      <span>{{ time.clockInterval }}ms</span>
      <button @click="time.clockInterval -= 50" v-hover><ChevronDoubleRightIcon class="w-6" /></button>
    </div>
  </div>
</template>
