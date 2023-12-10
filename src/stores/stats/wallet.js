import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { clamp } from "lodash/number";
import { storeName } from "@/stores";

export const useWalletStore = defineStore(storeName(import.meta.url), () => {
    const balance = ref(0);

    function preTransaction(net) {
        if (balance.value - net < 0) {
            return balance.value + net;
        }

        return net;
    }

    function transaction(net) {
        balance.value += net;
    }

    return {
        balance,

        preTransaction,
        transaction,
    };
})
