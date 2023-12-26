import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { clamp } from "lodash/number";
import { storeName } from "@/stores";
import { Value } from "@/stats";

export const useWalletStore = defineStore(storeName('wallet'), () => {
    const balance = Value.create(0);

    function preTransaction(net, minBalance = 0) {
        if (balance.now + net <= 0) {
            if (balance.now < Math.abs(minBalance)) {
                return 0;
            }

            return balance.now * -1;
        }

        return net;
    }

    function transaction(net) {
        Value.affect(balance, net);
    }

    return {
        balance,

        preTransaction,
        transaction,
    };
})
