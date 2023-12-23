<script setup>
import PanelBlock from "@/components/Panels/PanelBlock.vue";

import { useWalletStore } from "@/stores/stats/wallet";
import { usePassportStore } from "@/stores/stats/passport";
import { usePhysicalStore } from "@/stores/stats/physical";
import { useNutritionStore } from "@/stores/stats/nutrition";
import StatValue from "@/components/StatValue.vue";
import StatBalance from "@/components/StatBalance.vue";
import StatBalanceFill from "@/components/StatBalanceFill.vue";

const wallet = useWalletStore();
const passport = usePassportStore();
const physical = usePhysicalStore();
const nutrition = useNutritionStore();
</script>

<template>
  <PanelBlock>
    <div class="grid gap-3">
      <div>
        <StatValue title="Age" :now="passport.age" />
        <StatValue title="Income" format="currency" :value-class="{ 'text-red-300': wallet.balance.gain < wallet.balance.loss }" :now="wallet.balance.gain" />
        <StatValue title="Outcome" format="currency" :now="wallet.balance.loss" />
        <StatValue title="Balance" format="currency" :now="wallet.balance.now" />
      </div>
      <div class="flex flex-col gap-3">
        <StatBalance title="Physical" title-min="Tired" title-max="Lazy" v-bind="physical.energy" />
        <StatBalanceFill title="Nutrition" v-bind="nutrition.energy" />
      </div>
    </div>
  </PanelBlock>
</template>
