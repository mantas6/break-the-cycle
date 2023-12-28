import {computed} from 'vue'
import {defineActionStore} from "@/stores/modules/actions/index.js";
import {useSocialStore} from "@/stores/stats/social.js";
import {executeBasicJob} from "@/helpers/actions/job.js";

const options = {
    title: 'Janitor',
    subcategory: 'Education-less',
    category: 'Jobs',
    description: 'The contract states that the toilet cleaning is included in the daily routine.',
};

export default defineActionStore(options, store => {
    const durations = computed(() => [4, 8, 12]);

    const baseBalance = computed(() => 1);

    function executeAction(count) {
        executeBasicJob(store, count, { baseBalance, energyCost: 1 });
    }

    function beforeUnlock() {
        const social = useSocialStore();
        return social.construction.now >= 250;
    }

    return {
        durations,

        baseBalance,

        executeAction,
        beforeUnlock,
    };
})
