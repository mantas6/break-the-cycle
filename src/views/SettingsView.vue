<script setup>

import { loadGame, resetGame, saveGame } from "@/routines/persistence";
</script>

<template>
  <div class="flex flex-col gap-3">
    <button @click="saveGame">Save</button>
    <button @click="loadGame">Load</button>
    <button @click="resetGame">Reset</button>
  </div>
</template>
