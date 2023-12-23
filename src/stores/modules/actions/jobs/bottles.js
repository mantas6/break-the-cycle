import {defineActionStore} from "@/stores/modules/actions";
import {useWalletStore} from "@/stores/stats/wallet";

const options = {
    title: 'Collect Empty Bottles',
    subcategory: 'Homeless',
    category: 'Jobs',
};

export default defineActionStore(options, ({ meta }) => {
    function executeAction(count) {
        const wallet = useWalletStore();

        wallet.transaction(0.5 * count);
        meta.eff = 1;
    }

    return {
        executeAction,
    };
});