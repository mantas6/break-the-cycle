<script setup>
import { LockClosedIcon } from '@heroicons/vue/16/solid'
import { useWalletStore } from "@/stores/stats/wallet";
import PanelBlock from "@/components/panels/PanelBlock.vue";
import Logo from "@/components/Logo.vue";
import StatWalletBalance from "@/components/StatWalletBalance.vue";
import { useTimeStore } from "@/stores/time.js";
import {useUnlockStore} from "@/stores/unlock.js";

const wallet = useWalletStore();
const time = useTimeStore();
const unlock = useUnlockStore();
</script>

<template>
  <PanelBlock class="grid grid-cols-2 min-h-20">
    <div class="flex flex-col justify-between">
      <Logo />
      <span class="text-sm text-zinc-300">{{ time.date }}</span>
    </div>
    <StatWalletBalance v-bind="wallet.balance" v-if="unlock.balance" />
    <div v-else class="flex justify-center"><LockClosedIcon class="w-4" /></div>
  </PanelBlock>
</template>
