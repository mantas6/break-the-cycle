import {defineActionStore} from "@/stores/modules/actions";
import {computed} from "vue";
import {executeBasicJob} from "@/helpers/actions/job";
import {useSocialStore} from "@/stores/stats/social";
import {Balance, Value} from "@/stats/index.js";
import {useWalletStore} from "@/stores/stats/wallet.js";

const options = {
    title: 'Collect Empty Bottles',
    subcategory: 'Homeless',
    category: 'Jobs',
};

export default defineActionStore(options, store => {
    const { eff } = store;
    const baseBalance = computed(() => 0.5);

    const charge = Balance.create(0, 10, 0);

    function executeAction(count) {
        executeBasicJob(store, count, { energyCost: 0.5, capabilityUpper: 0.25 })

        const social = useSocialStore();
        Value.affect(social.construction, 1 * count * eff.value);

        Balance.affect(charge, 1 * eff.value);

        if (Balance.percentage(charge) === 1) {
            charge.now = 0;
            const wallet = useWalletStore();
            wallet.transaction(baseBalance.value)
        }
    }

    function beforeUnlock() {
        return true;
    }

    return {
        baseBalance,
        charge,

        executeAction,
        beforeUnlock,
    };
});