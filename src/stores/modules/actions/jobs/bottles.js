import {defineActionStore} from "@/stores/modules/actions";
import {useWalletStore} from "@/stores/stats/wallet";
import {computed} from "vue";

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

        wallet.transaction(baseBalance.value * count);
        eff.value = 1;
    }

    return {
        baseBalance,
        unlocked,

        executeAction,
    };
});