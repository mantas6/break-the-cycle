<script setup>
import { useTimeStore } from "@/stores/time.js";
import Panel from "@/components/Panels/Panel.vue";
import Logo from "@/components/Logo.vue";

const time = useTimeStore();
</script>

<template>
  <Panel class="flex justify-between">
    <Logo />
    <div class="w-24 text-center">{{ time.date }}</div>
  </Panel>
</template>
