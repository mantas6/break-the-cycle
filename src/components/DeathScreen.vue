<script setup>
 import {useDeathStore} from "@/stores/death.js";

 const death = useDeathStore();
</script>

<template>
  <div class="w-full text-center p-10">
    <div class="text-2xl text-red-200">You're dead</div>
    <div class="text-sm"><span class="text-zinc-300">Reason:</span> {{ death.reason }}</div>
  </div>
</template>
