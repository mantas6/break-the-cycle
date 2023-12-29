import {defineActionStore} from "@/stores/modules/actions/index.js";
import {useWalletStore} from "@/stores/stats/wallet.js";
import {requireCost} from "@/helpers/actions/index.js";
import {computed, toValue} from "vue";
import {useSocialStore} from "@/stores/stats/social.js";

const options = {
    title: 'Concentration learning',
    subcategory: 'General',
    category: 'Upgrades',
    description: 'Hold the mouse button on the action to bulk execute.',
    once: true,
};

export default defineActionStore(options, ({ revoked }) => {
    const baseBalance = computed(() => -100);
    const wallet = useWalletStore();
    const social = useSocialStore();

    function beforeUnlock() {
        return social.construction.now >= 25;
    }

    function executeAction() {
        const cost = toValue(baseBalance)

        wallet.transaction(cost);
        revoked.value = true;
    }

    return {
        baseBalance,

        beforeUnlock,
        executeAction,
    };
});