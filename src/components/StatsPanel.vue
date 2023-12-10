<script setup>
import Panel from "@/components/Panel.vue";

import { useWalletStore } from "@/stores/stats/wallet";
import { useNutritionStore } from "@/stores/stats/nutrition";

const wallet = useWalletStore();
const nutrition = useNutritionStore();
</script>

<template>
  <Panel>
    <div>Balance: {{ wallet.balance }}$</div>
    <div>Calories: {{ nutrition.calories.now }}</div>
  </Panel>
</template>
