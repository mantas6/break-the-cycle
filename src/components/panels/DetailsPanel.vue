<script setup>
import Panel from "@/components/Panels/Panel.vue";

import { useWalletStore } from "@/stores/stats/wallet";
import { useNutritionStore } from "@/stores/stats/nutrition";
import { usePassportStore } from "@/stores/stats/passport";
import StatValue from "@/components/StatValue.vue";

const wallet = useWalletStore();
const nutrition = useNutritionStore();
const passport = usePassportStore();
</script>

<template>
  <Panel>
    <div class="grid grid-cols-2 gap-3">
      <div>
        <StatValue title="Balance" :value="wallet.balance" unit="$" />
        <StatValue title="Age" :value="passport.age" />
        <StatValue title="Calories" :value="nutrition.calories.now" />
      </div>
      <div>Test</div>
    </div>
  </Panel>
</template>
