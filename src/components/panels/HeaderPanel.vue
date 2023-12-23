<script setup>
import { useWalletStore } from "@/stores/stats/wallet";
import PanelBlock from "@/components/Panels/PanelBlock.vue";
import Logo from "@/components/Logo.vue";
import StatWalletBalance from "@/components/StatWalletBalance.vue";

const wallet = useWalletStore();
</script>

<template>
  <PanelBlock class="grid grid-cols-2">
    <Logo />
    <StatWalletBalance v-bind="wallet.balance" />
  </PanelBlock>
</template>
