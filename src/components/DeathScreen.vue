<script setup>
 import {useDeathStore} from "@/stores/death.js";
 import SettingsView from "@/views/SettingsView.vue";

 const death = useDeathStore();
</script>

<template>
  <div class="w-full text-center p-10">
    <div class="text-2xl text-red-200">You're dead</div>
    <div class="text-sm"><span class="text-zinc-300">Reason:</span> {{ death.reason || 'Unknown' }}</div>
    <SettingsView class="mt-10" />
  </div>
</template>
