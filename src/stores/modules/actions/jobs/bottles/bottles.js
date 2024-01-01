import {executeBasicJob} from "@/helpers/actions/job";
import {useSocialStore} from "@/stores/stats/social";
import { Value } from "@/stats";
import {defineAction} from "@/helpers/actions/definition/index.js";
import {unlockWhen, defineComputed, defineRaw, defineRef} from "@/helpers/actions/definition/hooks.js";
import {executeAction} from "@/helpers/actions/definition/execution.js";

const titles = {
    title: 'Collect Empty Bottles',
    subcategory: 'Homeless',
    category: 'Jobs',
    description: "Trash cans might have an empty bottle or two. There's other places to look as well.",
};

export default defineAction(titles, ({ eff }) => {
    const social = useSocialStore();

    const tier = defineRef('tier', 1)

    defineComputed('baseBalance', () => tier.value * 0.1);

    unlockWhen(() => true)

    executeAction(count => {
        executeBasicJob({ energyCost: 0.5, capabilityUpper: 0.25 })

        Value.affect(social.construction, 0.1 * count * eff.value * tier.value);
    })
})