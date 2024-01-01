import {useWalletStore} from "@/stores/stats/wallet.js";
import {requireCost} from "@/helpers/actions/index.js";
import {computed, toValue} from "vue";
import {useSocialStore} from "@/stores/stats/social.js";
import {useUnlockStore} from "@/stores/unlock.js";
import {useIntellectStore} from "@/stores/stats/intellect.js";
import {defineAction} from "@/helpers/actions/definition/index.js";
import {revokeWhen, unlockWhen, declareOnce, defineComputed} from "@/helpers/actions/definition/hooks.js";
import {executeAction} from "@/helpers/actions/definition/execution.js";

const titles = {
    title: 'Planning course',
    subcategory: 'General',
    category: 'Upgrades',
    description: 'Learn to plan the daily schedule and live a more productive and satisfying life!',
};

export default defineAction(titles, ({ executionCount }) => {
    const wallet = useWalletStore();
    const intellect = useIntellectStore();
    const unlock = useUnlockStore();

    const baseBalance = defineComputed('baseBalance', -200)
    declareOnce();

    unlockWhen(() => intellect.overall >= 1)
    executeAction(() => wallet.transaction(toValue(baseBalance)))
    revokeWhen(() => executionCount.value > 0 || unlock.planner)
})
