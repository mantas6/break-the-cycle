import {defineActionStore} from "@/stores/modules/actions";
import {Balance} from "@/stats/index.js";
import {usePhysicalStore} from "@/stores/stats/physical.js";
import {useNutritionStore} from "@/stores/stats/nutrition.js";

const options = {
    title: 'Moldy Mattress',
    subcategory: 'Homeless',
    category: 'Sleep',
    description: 'Somebody threw it away. Smells like attic.',
};

export default defineActionStore(options, ({ eff }) => {
    const physical = usePhysicalStore();
    const nutrition = useNutritionStore();

    function executeAction(count) {
        const energyAvailPercent = Balance.percentage(nutrition.energy, 0, 0.25);

        eff.value = energyAvailPercent;

        Balance.affect(physical.energy, 0.25 * count * eff.value);
    }

    function beforeUnlock() {
        return Balance.percentage(physical.energy) < 0.25;
    }

    return {
        executeAction,

        beforeUnlock,
    };
});