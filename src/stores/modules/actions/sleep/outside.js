import {defineActionStore} from "@/stores/modules/actions";
import {useWalletStore} from "@/stores/stats/wallet";
import {computed} from "vue";

const options = {
    title: 'Outside',
    subcategory: 'Homeless',
    category: 'Sleep',
};

export default defineActionStore(options, ({ eff }) => {
    function executeAction(count) {

    }

    return {
        executeAction,
    };
});