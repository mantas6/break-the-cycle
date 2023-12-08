<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import { useTimeStore } from "@/stores/time.js";

const time = useTimeStore();
</script>

<template>
  <main>
    <span>{{ time.date }}</span>
    <TheWelcome />
  </main>
</template>
