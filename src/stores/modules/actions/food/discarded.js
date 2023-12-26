import { useNutritionStore } from "@/stores/stats/nutrition";
import { Balance } from "@/stats";
import { defineActionStore } from "@/stores/modules/actions";
import {calculateCapability} from "@/helpers/actions/job.js";
import {usePhysicalStore} from "@/stores/stats/physical.js";
import {useDigestiveStore} from "@/stores/stats/digestive.js";

const options = {
    title: 'Discarded Food',
    subcategory: 'Homeless',
    category: 'Food',
};

export default defineActionStore(options, ({ eff, durations }) => {
    function executeAction(count) {
        const energyGain = 0.25 * count;
        const energyCost = -0.1 * count;

        const nutrition = useNutritionStore();
        const physical = usePhysicalStore();
        const digestive = useDigestiveStore();

        const capability = calculateCapability(physical.overallCapability, 0.25, count, durations);

        const neededGain = Balance.reserve(nutrition.energy, energyGain) * capability;
        eff.value = neededGain / energyGain;

        if (eff.value > 0) {
            Balance.affect(nutrition.energy, energyGain * eff.value)
            Balance.affect(physical.energy, energyCost * eff.value)

            const digestiveHealthLoss = 0.25;
            Balance.affect(digestive.health, -digestiveHealthLoss * eff.value * count)
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
