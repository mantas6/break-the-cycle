<script setup>
import { useWalletStore } from "@/stores/stats/wallet";
import PanelBlock from "@/components/Panels/PanelBlock.vue";
import Logo from "@/components/Logo.vue";
import StatWalletBalance from "@/components/StatWalletBalance.vue";
import { useTimeStore } from "@/stores/time.js";

const wallet = useWalletStore();
const time = useTimeStore();
</script>

<template>
  <PanelBlock class="grid grid-cols-2">
    <div class="flex flex-col justify-between">
      <Logo />
      <span class="text-sm text-zinc-300">{{ time.date }}</span>
    </div>
    <StatWalletBalance v-bind="wallet.balance" />
  </PanelBlock>
</template>
