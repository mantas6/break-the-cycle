<script setup>
import Panel from "@/components/Panels/Panel.vue";

import { useWalletStore } from "@/stores/stats/wallet";
import { usePassportStore } from "@/stores/stats/passport";
import { usePhysicalStore } from "@/stores/stats/physical";
import StatValue from "@/components/StatValue.vue";
import StatBalance from "@/components/StatBalance.vue";

const wallet = useWalletStore();
const passport = usePassportStore();
const physical = usePhysicalStore();
</script>

<template>
  <Panel>
    <div class="grid grid-cols-2 gap-3">
      <div>
        <StatValue title="Age" :now="passport.age" />
        <StatValue title="Balance" format="currency" :now="wallet.balance.now" />
      </div>
      <div>
        <StatBalance title="Physical" title-min="Lazy" title-max="Tired" v-bind="physical.energy" />
      </div>
    </div>
  </Panel>
</template>
