import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import { Value } from "@/stats";
import {orderBy, round} from "lodash";

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

    // Only supports negative transactions
    function preTransactionArr(baseBalance, durations = [1], count = 1) {
        const durationsAmounts = durations
            .filter(duration => duration <= count)
            .map(duration => duration * baseBalance);

        for (const amount of orderBy(durationsAmounts)) {
            if (balance.now + amount >= 0) {
                return amount;
            }
        }

        return 0;
    }

    function transaction(net) {
        Value.affect(balance, net);
        balance.now = round(balance.now, 2)
    }

    return {
        balance,

        preTransaction,
        preTransactionArr,
        transaction,
    };
})
