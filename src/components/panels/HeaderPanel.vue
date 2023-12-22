<script setup>
import { useTimeStore } from "@/stores/time.js";
import PanelBlock from "@/components/Panels/PanelBlock.vue";
import Logo from "@/components/Logo.vue";

const time = useTimeStore();
</script>

<template>
  <PanelBlock class="flex justify-between">
    <Logo />
    <div class="w-24 text-center">{{ time.date }}</div>
  </PanelBlock>
</template>
