import {defineActionStore} from "@/stores/modules/actions/index.js";
import {useWalletStore} from "@/stores/stats/wallet.js";
import {requireCost} from "@/helpers/actions/index.js";
import {computed, toValue} from "vue";
import {useSocialStore} from "@/stores/stats/social.js";
import {useUnlockStore} from "@/stores/unlock.js";
import {useIntellectStore} from "@/stores/stats/intellect.js";

const options = {
    title: 'Planning course',
    subcategory: 'General',
    category: 'Upgrades',
    description: 'Learn to plan the daily schedule and live a more productive and satisfying life!',
    once: true,
};

export default defineActionStore(options, ({ executionCount }) => {
    const baseBalance = computed(() => -200);
    const wallet = useWalletStore();
    const intellect = useIntellectStore();
    const unlock = useUnlockStore();

    function beforeUnlock() {
        return intellect.overall >= 1;
    }

    function executeAction() {
        wallet.transaction(toValue(baseBalance));
    }

    function beforeRevoke() {
        return executionCount.value > 0 || unlock.planner;
    }

    return {
        baseBalance,

        beforeUnlock,
        executeAction,
        beforeRevoke,
    };
});