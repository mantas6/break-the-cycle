import {defineActionStore} from "@/stores/modules/actions";
import {computed, ref} from "vue";
import {executeBasicJob} from "@/helpers/actions/job";
import {useSocialStore} from "@/stores/stats/social";
import { Value } from "@/stats";
import { useWalletStore } from "@/stores/stats/wallet";

const options = {
    title: 'Collect Empty Bottles',
    subcategory: 'Homeless',
    category: 'Jobs',
};

export default defineActionStore(options, store => {
    const { eff } = store;
    const tier = ref(1);

    const baseBalance = computed(() => tier.value * 0.1);

    const wallet = useWalletStore();

    function executeAction(count) {
        executeBasicJob(store, count, { energyCost: 0.5, capabilityUpper: 0.25, baseBalance })

        // Move to global method
        const social = useSocialStore();
        Value.affect(social.construction, 1 * count * eff.value);
    }

    function beforeUnlock() {
        return true;
    }

    return {
        baseBalance,
        tier,

        executeAction,
        beforeUnlock,
    };
});