<script setup>
import { RouterLink } from "vue-router";
import { loadGame, resetGame, saveGame } from "@/routines/persistence";
import Panel from "@/components/Panel.vue";
</script>

<template>
  <Panel class="flex gap-3 items-start">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <button @click="resetGame">Reset</button>
    <button @click="saveGame">Save</button>
    <button @click="loadGame">Load</button>
  </Panel>
</template>
