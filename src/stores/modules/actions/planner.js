import {defineActionStore} from "@/stores/modules/actions/index.js";
import {useWalletStore} from "@/stores/stats/wallet.js";
import {requireCost} from "@/helpers/actions/index.js";
import {computed, toValue} from "vue";
import {useSocialStore} from "@/stores/stats/social.js";

const options = {
    title: 'Planning course',
    subcategory: 'General',
    category: 'Upgrades',
    description: 'Learn to plan the daily schedule and live a more productive and satisfying life!',
    once: true,
};

export default defineActionStore(options, ({ revoked }) => {
    const baseBalance = computed(() => -200);
    const wallet = useWalletStore();
    const social = useSocialStore();

    function beforeUnlock() {
        return social.construction.now >= 25;
        return true;
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