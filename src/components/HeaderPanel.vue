<script setup>
import { useTimeStore } from "@/stores/time.js";
import { RouterLink } from "vue-router";
import { resetGame, loadGame, saveGame } from "@/routines/persistence.js";

const time = useTimeStore();
</script>

<template>
  <nav class="w-full flex gap-3 p-3">
    <div>Break the Cycle</div>
    <div class="w-24 text-center">{{ time.date }}</div>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <button @click="resetGame">Reset</button>
    <button @click="saveGame">Save</button>
    <button @click="loadGame">Load</button>
  </nav>
</template>
