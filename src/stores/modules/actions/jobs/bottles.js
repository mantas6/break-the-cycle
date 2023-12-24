import {defineActionStore} from "@/stores/modules/actions";
import {computed} from "vue";
import {executeBasicJob} from "@/helpers/actions/job";
import {useSocialStore} from "@/stores/stats/social";
import {Value} from "@/stats/index.js";

const options = {
    title: 'Collect Empty Bottles',
    subcategory: 'Homeless',
    category: 'Jobs',
};

export default defineActionStore(options, ({ eff }) => {
    const baseBalance = computed(() => 0.5);
    const unlocked = computed(() => true);

    function executeAction(count) {
        executeBasicJob({ eff, count }, { baseBalance, energyCost: 0.5, energyActualStart: 0.75 })

        const social = useSocialStore();
        Value.affect(social.construction, 1 * count * eff.value);
    }

    return {
        baseBalance,
        unlocked,

        executeAction,
    };
});