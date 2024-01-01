import {useWalletStore} from "@/stores/stats/wallet.js";
import {toValue} from "vue";
import {defineAction} from "@/helpers/actions/definition/index.js";
import {revokeWhen, unlockWhen, declareOnce, defineComputed} from "@/helpers/actions/definition/hooks.js";
import {executeAction} from "@/helpers/actions/definition/execution.js";

/**
 *
 * @param {ActionTitlesOptions} titles - titles of the action
 * @param {number} cost - otherwise what is baseAmount
 * @param jobFn - job reference so that the tier can be updated
 * @param {CallableFunction} unlockWhenFn - unlockWhen custom conditions
 */
export function defineTierUpgrade(titles, cost, jobFn, unlockWhenFn) {
    return defineAction(titles, ({ executionCount }) => {
        const wallet = useWalletStore();

        defineComputed('baseBalance', cost)
        declareOnce();

        unlockWhen(unlockWhenFn)

        executeAction(() => {
            wallet.transaction(cost);

            const job = jobFn();
            job.tier++;
        })

        revokeWhen(() => executionCount.value > 0);
    })
}