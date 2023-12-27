<script setup>
import { loadGame, resetGame, saveGame } from "@/routines/persistence";
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
</script>

<template>
  <div class="flex flex-col gap-3 text-center">
    <button @click="saveGame" v-hover>Save</button>
    <button @click="loadGame" v-hover>Load</button>
    <button @click="reset" v-hover>Reset</button>
    <RouterLink v-if="showDevMenu" to="/dev" v-hover>Dev menu</RouterLink>
  </div>
</template>
