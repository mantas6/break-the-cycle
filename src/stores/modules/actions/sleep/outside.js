import {defineActionStore} from "@/stores/modules/actions";
import {useWalletStore} from "@/stores/stats/wallet";
import {computed} from "vue";
import {useMuscularStore} from "@/stores/stats/muscular.js";
import {Balance} from "@/stats/index.js";

const options = {
    title: 'Outside',
    subcategory: 'Homeless',
    category: 'Sleep',
};

export default defineActionStore(options, ({ eff }) => {
    const muscular = useMuscularStore();

    function executeAction(count) {
        const recoveryRate = 0.25 * count;
        eff.value = Balance.reserve(muscular.health, recoveryRate) / recoveryRate;
        Balance.affect(muscular.health, recoveryRate * eff.value)
    }

    function beforeUnlock() {
        const healthPercent = Balance.percentage(muscular.health);

        return healthPercent < 0.95;
    }

    return {
        executeAction,

        beforeUnlock,
    };
});