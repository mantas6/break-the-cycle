import { computed } from 'vue'
import {interval, requireCost} from "@/helpers/actions";
import {executeBasicFood} from "@/helpers/actions/food.js";

import {useSocialStore} from "@/stores/stats/social.js";
import {defineAction} from "@/helpers/actions/definition/index.js";
import {unlockWhen, defineComputed, defineRaw} from "@/helpers/actions/definition/hooks.js";
import {onExecute} from "@/helpers/actions/definition/execution.js";

const titles = {
    title: 'Cafeteria',
    subcategory: 'Restaurants',
    category: 'Food',
    description: "Decent quality. Until you find a teeth in your meal..",
};

export default defineAction(titles, () => {
    const social = useSocialStore();

    defineRaw('durations', interval(0.5))
    defineComputed('baseBalance', -2)

    onExecute(() => executeBasicFood({ energyGain: 1, digestiveHealthLoss: 0.05 }))

    unlockWhen(() => social.construction.now >= 50)
})
