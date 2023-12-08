<script setup>
import { RouterView } from 'vue-router'
import HeaderPanel from "@/components/HeaderPanel.vue";
</script>

<template>
  <header>
    <HeaderPanel />
  </header>
  <main>
    <RouterView />
  </main>
</template>

