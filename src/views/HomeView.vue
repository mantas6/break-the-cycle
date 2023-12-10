<script setup>
import {useActionsStore} from "@/stores/actions.js";

const actions = useActionsStore();

</script>

<template>
  <div>
    <div v-for="(action, actionName) in actions.all" class="flex gap-3 p-3">
      <span class="w-5">x{{ actions.active[actionName] || 0 }}</span>
      <span>{{ action.title }}</span>
      <button @click="actions.increase(actionName)">+</button>
      <button @click="actions.decrease(actionName)">-</button>
    </div>
  </div>
</template>
