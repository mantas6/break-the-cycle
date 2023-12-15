<script setup>
import Panel from "@/components/Panels/Panel.vue";

import { useWalletStore } from "@/stores/stats/wallet";
import { useNutritionStore } from "@/stores/stats/nutrition";
import { usePassportStore } from "@/stores/stats/passport";
import { useMuscleStore } from "@/stores/stats/muscle";
import { usePhysicalStore } from "@/stores/stats/physical";
import StatValue from "@/components/StatValue.vue";
import StatBalance from "@/components/StatBalance.vue";

const wallet = useWalletStore();
const nutrition = useNutritionStore();
const passport = usePassportStore();
const muscle = useMuscleStore();
const physical = usePhysicalStore();
</script>

<template>
  <Panel>
    <div class="grid grid-cols-2 gap-3">
      <div>
        <StatValue title="Balance" v-bind="wallet.balance" />
      </div>
      <div>
        <StatBalance title="Physical" title-min="Lazy" title-max="Tired" v-bind="physical.balance" :now="0" />
      </div>
    </div>
  </Panel>
</template>
