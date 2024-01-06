import { useNutritionStore } from "@/stores/stats/nutrition";
import { Balance } from "@/stats";
import {calculateCapability} from "@/helpers/actions/job.js";
import {usePhysicalStore} from "@/stores/stats/physical.js";
import {useDigestiveStore} from "@/stores/stats/digestive.js";
import {defineAction} from "@/helpers/actions/definition/index.js";
import {unlockWhen} from "@/helpers/actions/definition/hooks.js";
import {onExecute} from "@/helpers/actions/definition/execution.js";
import {executeLabourFood} from "@/helpers/actions/food.js";

const titles = {
    title: 'Discarded Food',
    subcategory: 'Homeless',
    category: 'Food',
    description: 'Green containers near the houses and stores might contain some not spoiled or almost but hopefully-not-quite-yet spoiled food.',
};

export default defineAction(titles, ({ eff, durations }) => {
    const nutrition = useNutritionStore();
    const physical = usePhysicalStore();
    const digestive = useDigestiveStore();

    unlockWhen(() => Balance.percentage(nutrition.energy) < 0.25)

    onExecute(count => {
        executeLabourFood({ energyGain: 0.25, energyCost: 0.1 });
    })
})
