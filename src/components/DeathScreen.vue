<script setup>
 import {useDeathStore} from "@/stores/death.js";

 const death = useDeathStore();
</script>

<template>
  <div>
    <div class="text-lg">You're dead</div>
    <div>{{ death.reason }}</div>
  </div>
</template>
