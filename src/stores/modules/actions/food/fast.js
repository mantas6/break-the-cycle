import { computed } from 'vue'
import {interval, requireCost} from "@/helpers/actions";
import {executeBasicFood} from "@/helpers/actions/food.js";
import {defineActionStore} from "@/stores/modules/actions/index.js";
import {useSocialStore} from "@/stores/stats/social.js";
import {defineAction} from "@/helpers/actions/definition/index.js";
import {beforeUnlock, defineComputed, defineRaw} from "@/helpers/actions/definition/hooks.js";
import {executeAction} from "@/helpers/actions/definition/execution.js";

const titles = {
    title: 'Fast Food',
    subcategory: 'Restaurants',
    category: 'Food',
    description: "Can't beat how fast it is.",
};

export default defineAction(titles, () => {
    const social = useSocialStore();

    defineRaw('durations', interval(0.5))
    defineComputed('baseBalance', -1)

    executeAction(() => executeBasicFood({ energyGain: 1 }))

    beforeUnlock(() => social.construction.now >= 50)
})
