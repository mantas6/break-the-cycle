import {range} from "lodash/util.js";
import {computed, toValue} from "vue";
import {useWalletStore} from "@/stores/stats/wallet.js";

export function interval(hours) {
    return computed(() => range(hours, 25, hours));
}

export function requireCost(cb) {
    return computed(() => {
        const wallet = useWalletStore();
        const cost = toValue(cb instanceof Function ? cb() : cb);

        return !!wallet.preTransaction(cost, cost);
    });
}