<script setup>
import Panel from "@/components/Panels/Panel.vue";

import { useWalletStore } from "@/stores/stats/wallet.js";
import { useNutritionStore } from "@/stores/stats/nutrition.js";

const wallet = useWalletStore();
const nutrition = useNutritionStore();
</script>

<template>
  <Panel>
    <div>Balance: {{ wallet.balance }}$</div>
    <div>Calories: {{ nutrition.calories.now }}</div>
  </Panel>
</template>
