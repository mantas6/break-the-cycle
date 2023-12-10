<script setup>
import { RouterLink } from "vue-router";
import Panel from "@/components/Panels/Panel.vue";
</script>

<template>
  <Panel class="flex gap-3 items-start">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/settings">Settings</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </Panel>
</template>
