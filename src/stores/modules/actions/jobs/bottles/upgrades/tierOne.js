import {defineActionStore} from "@/stores/modules/actions";
import {computed, toValue} from "vue";
import { useWalletStore } from "@/stores/stats/wallet";
import {useSocialStore} from "@/stores/stats/social";
import useJob from '../bottles';

const options = {
    title: 'Wheelbarrow',
    subcategory: 'Job - Collect Empty Bottles',
    category: 'Upgrades',
    description: 'Load up all the bottles at once',
    once: true,
};

export default defineActionStore(options, ({ revoked }) => {
    const baseBalance = computed(() => -10);

    const wallet = useWalletStore();

    function executeAction(count) {
        const cost = toValue(baseBalance)
        if (wallet.preTransaction(cost, cost)) {
            wallet.transaction(cost);
            revoked.value = true;

            const job = useJob();
            job.tier++;
        }
    }

    function beforeUnlock() {
        const social = useSocialStore();
        return social.construction.now >= 50;
    }

    return {
        baseBalance,

        executeAction,
        beforeUnlock,
    };
});