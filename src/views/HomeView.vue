<script setup>
import { useBrainStore } from "@/stores/stats/brain";
import { useWalletStore } from "@/stores/stats/wallet";
import {useActionsStore} from "@/stores/actions.js";
import {useNutritionStore} from "@/stores/stats/nutrition.js";

const nutrition = useNutritionStore();
const wallet = useWalletStore();
const actions = useActionsStore();

</script>

<template>
  <div>Cash: {{ wallet.balance }}$</div>
  <div>Calories {{ nutrition.calories.now }}</div>
  <div>
    <div v-for="(action, actionName) in actions.all" class="flex gap-3 p-3">
      <span class="w-5">x{{ actions.active[actionName] || 0 }}</span>
      <span>{{ action.title }}</span>
      <button @click="actions.increase(actionName)">+</button>
      <button @click="actions.decrease(actionName)">-</button>
    </div>
  </div>
</template>
