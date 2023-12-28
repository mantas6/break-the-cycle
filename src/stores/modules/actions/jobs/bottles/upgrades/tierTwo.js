import {defineActionStore} from "@/stores/modules/actions";
import {computed, toValue} from "vue";
import { useWalletStore } from "@/stores/stats/wallet";
import {useSocialStore} from "@/stores/stats/social";
import useJob from '../bottles';
import {requireCost} from "@/helpers/actions/index.js";

const options = {
    title: 'Wheelbarrow',
    subcategory: 'Job - Collect Empty Bottles',
    category: 'Upgrades',
    description: 'Load up more bottles at once. No need to carry them in a backpack.',
    once: true,
};

export default defineActionStore(options, ({ revoked }) => {
    const baseBalance = computed(() => -10);

    const wallet = useWalletStore();

    const canExecute = requireCost(baseBalance);

    function executeAction() {
        const cost = toValue(baseBalance)

        wallet.transaction(cost);
        revoked.value = true;

        const job = useJob();
        job.tier++;
    }

    function beforeUnlock() {
        const social = useSocialStore();
        return social.construction.now >= 50;
    }

    return {
        baseBalance,

        canExecute,
        executeAction,
        beforeUnlock,
    };
});