import {defineActionStore} from "@/stores/modules/actions";
import {useWalletStore} from "@/stores/stats/wallet";
import {computed} from "vue";
import {useSocialStore} from "@/stores/stats/social";
import {Value} from "@/stats";

const options = {
    title: 'Collect Empty Bottles',
    subcategory: 'Homeless',
    category: 'Jobs',
};

export default defineActionStore(options, ({ eff }) => {
    const baseBalance = computed(() => 0.5);
    const unlocked = computed(() => true);

    function executeAction(count) {
        const wallet = useWalletStore();
        const social = useSocialStore();

        Value.affect(social.construction, 1 * count);
        wallet.transaction(baseBalance.value * count);
        eff.value = 1;
    }

    return {
        baseBalance,
        unlocked,

        executeAction,
    };
});