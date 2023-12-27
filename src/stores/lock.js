import {computed, ref, watchEffect} from 'vue'
import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import {useWalletStore} from "@/stores/stats/wallet.js";

export const useLockStore = defineStore(storeName('lock'), () => {
    const wallet = useWalletStore();

    const balance = ref();

    watchEffect(() => {
       if (balance.value) {
           return;
       }

       if (wallet.balance.now > 5) {
           balance.value = true;
       }
    });

    return {
        balance,
    }
})
