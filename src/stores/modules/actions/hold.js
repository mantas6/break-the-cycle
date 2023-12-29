import {defineActionStore} from "@/stores/modules/actions/index.js";
import {useWalletStore} from "@/stores/stats/wallet.js";
import {requireCost} from "@/helpers/actions/index.js";
import {computed, toValue} from "vue";
import {useSocialStore} from "@/stores/stats/social.js";
import {useUnlockStore} from "@/stores/unlock.js";

const options = {
    title: 'Concentration learning',
    subcategory: 'General',
    category: 'Upgrades',
    description: 'Hold the mouse button on the action to bulk execute.',
    once: true,
};

export default defineActionStore(options, ({ executionCount }) => {
    const baseBalance = computed(() => -100);
    const wallet = useWalletStore();
    const social = useSocialStore();
    const unlock = useUnlockStore();

    function beforeUnlock() {
        return social.construction.now >= 25;
    }

    function executeAction() {
        wallet.transaction(toValue(baseBalance));
    }

    function beforeRevoke() {
        return executionCount.value > 0 || unlock.hold;
    }

    return {
        baseBalance,

        beforeUnlock,
        executeAction,
        beforeRevoke,
    };
});