<script setup>
import { useTimeStore } from "@/stores/time";
import Panel from "@/components/Panel.vue";

const time = useTimeStore();
</script>

<template>
  <Panel class="flex justify-between">
    <div class="flex gap-1">
      <span>Break</span>
      <span>the</span>
      <span>Cycle</span>
    </div>
    <div class="w-24 text-center">{{ time.date }}</div>
  </Panel>
</template>
