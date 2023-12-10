<script setup>
import Panel from "@/components/Panels/Panel.vue";

import { useWalletStore } from "@/stores/stats/wallet";
import { useNutritionStore } from "@/stores/stats/nutrition";
import {usePassportStore} from "@/stores/stats/passport";

const wallet = useWalletStore();
const nutrition = useNutritionStore();
const passport = usePassportStore();
</script>

<template>
  <Panel>
    <div>Balance: {{ wallet.balance }}$</div>
    <div>Age: {{ passport.age }}</div>
    <div>Calories: {{ nutrition.calories.now }}</div>
  </Panel>
</template>
