import { useNutritionStore } from "@/stores/stats/nutrition";
import { Balance } from "@/stats";
import {calculateCapability} from "@/helpers/actions/job.js";
import {usePhysicalStore} from "@/stores/stats/physical.js";
import {useDigestiveStore} from "@/stores/stats/digestive.js";
import {defineAction} from "@/helpers/actions/definition/index.js";
import {unlockWhen} from "@/helpers/actions/definition/hooks.js";
import {executeAction} from "@/helpers/actions/definition/execution.js";

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

    executeAction(count => {
        const energyGain = 0.25 * count;
        const energyCost = -0.1 * count;

        const capability = calculateCapability(physical.overallCapability, 0.25, count, durations);

        const neededGain = Balance.reserve(nutrition.energy, energyGain) * capability * digestive.overallHealth;
        eff.value = neededGain / energyGain;

        if (eff.value > 0) {
            Balance.affect(nutrition.energy, energyGain * eff.value)
            Balance.affect(physical.energy, energyCost * eff.value)

            const digestiveHealthLoss = 0.25;
            Balance.affect(digestive.health, -digestiveHealthLoss * eff.value * count)
        }
    })
})
