import {defineActionStore} from "@/stores/modules/actions";
import {useWalletStore} from "@/stores/stats/wallet";
import {computed} from "vue";

const options = {
    title: 'Collect Empty Bottles',
    subcategory: 'Homeless',
    category: 'Jobs',
};

export default defineActionStore(options, ({ eff }) => {
    const walletBalance = computed(() => 0.5);

    function executeAction(count) {
        const wallet = useWalletStore();

        wallet.transaction(walletBalance * count);
        eff.value = 1;
    }

    return {
        walletBalance,

        executeAction,
    };
});