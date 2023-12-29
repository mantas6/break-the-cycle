import {defineActionStore} from "@/stores/modules/actions/index.js";
import {useWalletStore} from "@/stores/stats/wallet.js";
import {toValue} from "vue";

export function defineTierUpgrade(options, baseBalance, jobFn, beforeUnlockFn) {
    return defineActionStore(options, ({ executionCount }) => {
        const wallet = useWalletStore();

        function executeAction() {
            const cost = toValue(baseBalance)

            wallet.transaction(cost);

            const job = jobFn();
            job.tier++;
        }

        function beforeRevoke() {
            return executionCount.value > 0;
        }

        return {
            baseBalance,

            executeAction,
            beforeRevoke,

            beforeUnlock: beforeUnlockFn,
        };
    });
}