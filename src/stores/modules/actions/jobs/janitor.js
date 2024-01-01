import {computed} from 'vue'
import {defineActionStore} from "@/stores/modules/actions/index.js";
import {useSocialStore} from "@/stores/stats/social.js";
import {executeBasicJob} from "@/helpers/actions/job.js";
import {defineAction} from "@/helpers/actions/definition/index.js";
import {beforeUnlock, defineRaw} from "@/helpers/actions/definition/hooks.js";
import {executeAction} from "@/helpers/actions/definition/execution.js";

const titles = {
    title: 'Janitor',
    subcategory: 'Education-less',
    category: 'Jobs',
    description: 'The contract states that the toilet cleaning is included in the daily routine.',
};

export default defineAction(titles, () => {
    const social = useSocialStore();

    defineRaw('durations', [4, 8, 12]);
    defineRaw('baseBalance', 1)

    beforeUnlock(() => social.construction.now >= 250);

    executeAction(() => executeBasicJob({ energyCost: 1 }));

})
