import {defineActionStore} from "@/stores/modules/actions/index.js";
import {useWalletStore} from "@/stores/stats/wallet.js";
import {requireCost} from "@/helpers/actions/index.js";
import {toValue} from "vue";

export function defineTierUpgrade(options, baseBalance, jobFn, beforeUnlockFn) {
    return defineActionStore(options, ({ revoked }) => {
        const wallet = useWalletStore();

        const canExecute = requireCost(baseBalance);

        function executeAction() {
            const cost = toValue(baseBalance)

            wallet.transaction(cost);
            revoked.value = true;

            const job = jobFn();
            job.tier++;
        }

        return {
            baseBalance,

            canExecute,
            executeAction,
            beforeUnlock: beforeUnlockFn,
        };
    });
}