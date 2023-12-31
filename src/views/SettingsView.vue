<script setup>
import {hardResetGame, loadGame, resetGame, saveGame} from "@/routines/persistence";
import {useTimeStore} from "@/stores/time.js";
import {RouterLink, useRouter} from "vue-router";
import {computed} from "vue";

const time = useTimeStore();
const router = useRouter()

const showDevMenu = computed(() => import.meta.env.DEV)

function reset() {
  resetGame();
  router.push('/');
}

function hardReset() {
  hardResetGame();
  router.push('/');
}
</script>

<template>
  <div class="grid gap-3 text-center text-zinc-100 *:bg-zinc-700 hover:*:bg-zinc-800 active:*:bg-zinc-900 *:p-2 *:rounded">
    <button @click="saveGame" v-hover>Save</button>
    <button @click="loadGame" v-hover>Load</button>
    <button @click="reset" v-hover>Reset</button>
    <button @click="hardReset" v-hover>Hard Reset</button>
    <RouterLink v-if="showDevMenu" to="/settings/debug" v-hover>Debug menu</RouterLink>
  </div>
</template>
