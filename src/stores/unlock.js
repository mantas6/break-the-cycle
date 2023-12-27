import {computed, ref, watchEffect} from 'vue'
import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import {useWalletStore} from "@/stores/stats/wallet.js";

export const useUnlockStore = defineStore(storeName('unlock'), () => {
    const wallet = useWalletStore();

    const balance = ref();
    const planner = ref();

    watchEffect(() => {
       if (balance.value) return;
       if (wallet.balance.now > 5) balance.value = true;
    });

    watchEffect(() => {
        if (planner.value) return;
        if (wallet.balance.now > 25) planner.value = true;
    });

    return {
        balance,
        planner,
    }
})
