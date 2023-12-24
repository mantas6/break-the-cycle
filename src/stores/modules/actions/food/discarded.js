import { useNutritionStore } from "@/stores/stats/nutrition";
import { Balance } from "@/stats";
import { defineActionStore } from "@/stores/modules/actions";

const options = {
    title: 'Discarded Food',
    subcategory: 'Homeless',
    category: 'Food',
};

export default defineActionStore(options, ({ eff }) => {
    function executeAction(count) {
        const energyGain = 0.25 * count;

        const nutrition = useNutritionStore();

        // TODO: add energy cost
        const neededGain = Balance.reserve(nutrition.energy, energyGain);
        eff.value = neededGain / energyGain;

        if (eff.value > 0) {
            Balance.affect(nutrition.energy, energyGain * eff.value)
        }
    }

    function beforeUnlock() {
        const nutrition = useNutritionStore();

        const nutritionPercent = Balance.percentage(nutrition.energy)

        return nutritionPercent < 0.25;
    }

    return {
        executeAction,
        beforeUnlock,
    };
})
