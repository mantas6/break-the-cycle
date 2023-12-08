<script setup>
import { useTimeStore } from "@/stores/time.js";
import { RouterLink } from "vue-router";

const time = useTimeStore();
</script>

<template>
  <nav class="w-full flex gap-3 p-3">
    <div>Break the Cycle</div>
    <span>|</span>
    <div class="w-24 text-center">{{ time.date }}</div>
    <span>|</span>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
</template>
