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
    title: 'Concentration learning',
    subcategory: 'General',
    category: 'Upgrades',
    description: 'Hold the mouse button on the action to bulk execute.',
};

export default defineAction(titles, ({ executionCount }) => {
    const wallet = useWalletStore();
    const intellect = useIntellectStore();
    const unlock = useUnlockStore();

    declareOnce();
    const baseBalance = defineComputed('baseBalance', -25);

    unlockWhen(() => intellect.overall > 0);
    executeAction(() => wallet.transaction(toValue(baseBalance)))
    revokeWhen(() => executionCount.value > 0 || unlock.hold)
})