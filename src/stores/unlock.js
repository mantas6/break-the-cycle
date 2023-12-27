import {computed, ref, watchEffect} from 'vue'
import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import {useWalletStore} from "@/stores/stats/wallet.js";
import {usePhysicalStore} from "@/stores/stats/physical.js";
import {Balance} from "@/stats/index.js";

export const useUnlockStore = defineStore(storeName('unlock'), () => {
    const wallet = useWalletStore();
    const physicalStore = usePhysicalStore();

    const balance = ref();
    watchEffect(() => {
       if (balance.value) return;
       if (wallet.balance.now > 5) balance.value = true;
    });

    const planner = ref();
    watchEffect(() => {
        if (planner.value) return;
        if (wallet.balance.now > 25) planner.value = true;
    });

    const physical = ref();
    watchEffect(() => {
        if (physical.value) return;
        if (Balance.actualCenter(physicalStore.energy) < 0.5) physical.value = true;
    })

    return {
        balance,
        planner,
        physical,
    }
})
