<script setup>
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/vue/24/outline'
import { RouterLink } from "vue-router";
import Panel from "@/components/Panels/Panel.vue";
import {useTimeStore} from "@/stores/time.js";

const time = useTimeStore();
</script>

<template>
  <Panel class="flex justify-between">
    <div class="flex gap-3">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/settings">Settings</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </div>
    <div class="flex gap-2 items-start">
      <button @click="time.clockInterval += 50"><ChevronDoubleLeftIcon class="w-6" /></button>
      <span>{{ time.clockInterval }}ms</span>
      <button @click="time.clockInterval -= 50"><ChevronDoubleRightIcon class="w-6" /></button>
    </div>
  </Panel>
</template>
