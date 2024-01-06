import { computed } from 'vue'
import {interval, requireCost} from "@/helpers/actions";
import {executePurchasedFood} from "@/helpers/actions/food.js";

import {useSocialStore} from "@/stores/stats/social.js";
import {defineAction} from "@/helpers/actions/definition/index.js";
import {unlockWhen, defineComputed, defineRaw} from "@/helpers/actions/definition/hooks.js";
import {onExecute} from "@/helpers/actions/definition/execution.js";

const titles = {
    title: 'Fast Food',
    subcategory: 'Restaurants',
    category: 'Food',
    description: "Can't beat how fast it is.",
};

export default defineAction(titles, () => {
    const social = useSocialStore();

    defineRaw('durations', interval(0.25))
    defineComputed('baseBalance', -1)

    onExecute(() => executePurchasedFood({ energyGain: 1 }))

    unlockWhen(() => social.construction.now >= 50)
})
