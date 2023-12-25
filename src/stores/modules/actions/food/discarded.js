import { useNutritionStore } from "@/stores/stats/nutrition";
import { Balance } from "@/stats";
import { defineActionStore } from "@/stores/modules/actions";
import {calculateCapability} from "@/helpers/actions/job.js";
import {usePhysicalStore} from "@/stores/stats/physical.js";

const options = {
    title: 'Discarded Food',
    subcategory: 'Homeless',
    category: 'Food',
};

export default defineActionStore(options, ({ eff, durations }) => {
    function executeAction(count) {
        const energyGain = 0.25 * count;

        const nutrition = useNutritionStore();
        const physical = usePhysicalStore();

        const capability = calculateCapability(physical.overallCapability, 0.25, count, durations);

        const neededGain = Balance.reserve(nutrition.energy, energyGain) * capability;
        eff.value = neededGain / energyGain;

        if (eff.value > 0) {
            Balance.affect(nutrition.energy, energyGain * eff.value)
            Balance.affect(physical.energy, -0.1 * eff.value * count)
        }
    }

    function beforeUnlock() {
        const nutrition = useNutritionStore();

        const nutritionPercent = Balance.percentage(nutrition.energy)

        return nutritionPercent < 0.5;
    }

    return {
        executeAction,
        beforeUnlock,
    };
})
