import {defineActionStore} from "@/stores/modules/actions";
import {computed} from "vue";
import {createChargeable, executeBasicJob} from "@/helpers/actions/job";
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

    const wallet = useWalletStore();

    const { charge, onCharge, onFull } = createChargeable({ max: 10 })

    function executeAction(count) {
        executeBasicJob(store, count, { energyCost: 0.5, capabilityUpper: 0.25 })

        // Move to global method
        const social = useSocialStore();
        Value.affect(social.construction, 1 * count * eff.value);

        onCharge(() => count * eff.value);
        onFull(() => wallet.transaction(baseBalance.value))
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