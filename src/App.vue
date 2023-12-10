<script setup>
import { RouterView } from 'vue-router'
import HeaderPanel from "@/components/HeaderPanel.vue";
</script>

<template>
  <header class="bg-zinc-600">
    <HeaderPanel />
  </header>
  <main>
    <RouterView />
  </main>
</template>

