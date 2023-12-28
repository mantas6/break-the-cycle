import { computed } from 'vue'
import {interval, requireCost} from "@/helpers/actions";
import {executeBasicFood} from "@/helpers/actions/food.js";
import {defineActionStore} from "@/stores/modules/actions/index.js";
import {useSocialStore} from "@/stores/stats/social.js";

const options = {
    title: 'Fast Food',
    subcategory: 'Restaurants',
    category: 'Food',
    description: "Can't beat how fast it is.",
};

export default defineActionStore(options, store => {
    const social = useSocialStore();

    const durations = interval(0.5);
    const baseBalance = computed(() => -1);

    const canExecute = requireCost(baseBalance);

    function executeAction(count) {
        executeBasicFood(store, count, { baseBalance, energyGain: 1 });
    }

    function beforeUnlock() {
        return social.construction.now >= 50;
    }

    return {
        durations,
        baseBalance,

        canExecute,
        executeAction,
        beforeUnlock,
    };
})
