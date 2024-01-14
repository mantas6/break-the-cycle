import { useNutritionStore } from "@/stores/stats/nutrition";
import { Balance } from "@/stats";
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

export default defineAction(titles, () => {
    const nutrition = useNutritionStore();

    unlockWhen(() => Balance.percentage(nutrition.energy) < 0.25)

    onExecute(() => {
        executeLabourFood({ energyGain: 0.25, energyCost: 0.1 });
    })
})
