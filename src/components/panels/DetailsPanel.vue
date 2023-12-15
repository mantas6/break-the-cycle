<script setup>
import Panel from "@/components/Panels/Panel.vue";

import { useWalletStore } from "@/stores/stats/wallet";
import { useNutritionStore } from "@/stores/stats/nutrition";
import { usePassportStore } from "@/stores/stats/passport";
import { useMuscleStore } from "@/stores/stats/muscle";
import StatValue from "@/components/StatValue.vue";

const wallet = useWalletStore();
const nutrition = useNutritionStore();
const passport = usePassportStore();
const muscle = useMuscleStore();
</script>

<template>
  <Panel>
    <div class="grid grid-cols-2 gap-3">
      <div>
        <StatValue title="Balance" :value="wallet.balance.now + '$'" />
        <StatValue title="Age" :value="passport.age" />
        <StatValue title="Calories" :value="nutrition.calories.now" />
      </div>
      <div>
        <StatValue title="Endurance" :value="muscle.endurance.now" />
      </div>
    </div>
  </Panel>
</template>
