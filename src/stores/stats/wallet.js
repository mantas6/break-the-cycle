import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { clamp } from "lodash/number";
import { storeName } from "@/stores";
import { Value } from "@/stats";

export const useWalletStore = defineStore(storeName(import.meta.url), () => {
    const balance = Value.create(0);

    function preTransaction(net) {
        if (balance.now + net <= 0) {
            return balance.now * -1;
        }

        return net;
    }

    function transaction(net) {
        balance.now += net;
    }

    return {
        balance,

        preTransaction,
        transaction,
    };
})
