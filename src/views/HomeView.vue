<script setup>
import { useBrainStore } from "@/stores/stats/brain";
import { useWalletStore } from "@/stores/stats/wallet";
import {useActionsStore} from "@/stores/actions.js";

const brain = useBrainStore();
const wallet = useWalletStore();
const actions = useActionsStore();

</script>

<template>
  <div>Cash: {{ wallet.balance }}$</div>
  <div>Physical condition {{ brain.condition * 100 }}%</div>
  <div>Mental condition {{ brain.mentalCondition * 100 }}%</div>
  <div>
    <div v-for="(action, actionName) in actions.all" class="flex gap-3 p-3">
      <span class="w-5">x{{ actions.active[actionName] || 0 }}</span>
      <span>{{ action.title }}</span>
      <button @click="actions.increase(actionName)">+</button>
      <button @click="actions.decrease(actionName)">-</button>
    </div>
  </div>
</template>
