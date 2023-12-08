<script setup>
import { useBrainStore } from "@/stores/stats/brain";
import { useWalletStore } from "@/stores/stats/wallet";
import {useActionsStore} from "@/stores/actions.js";

const brain = useBrainStore();
const wallet = useWalletStore();
const actions = useActionsStore();

function doAction() {
  const diff = brain.modifyHealthSt(-175)
  console.log(diff)
}
</script>

<template>
  <div>Cash: {{ wallet.balance }}$</div>
  <div>Physical condition {{ brain.condition * 100 }}%</div>
  <div>Mental condition {{ brain.mentalCondition * 100 }}%</div>
  <button @click="doAction">Action</button>
  <div>
    <button v-for="action in actions.all">{{ action.title }}</button>
  </div>
</template>
