import {useNutritionStore} from "@/stores/stats/nutrition.js";
import {useDigestiveStore} from "@/stores/stats/digestive.js";
import {useCardiovascularStore} from "@/stores/stats/cardiovascular.js";
import {Balance} from "@/stats/index.js";
import {usePhysicalStore} from "@/stores/stats/physical.js";
import {getActionContext} from "@/helpers/actions/context.js";

/**
 * @typedef {Object} SleepOptions
 * @property {number} sleepQuality - multiplier for energy restoration
 */

/**
 *
 * @param {SleepOptions} opts
 */
export function executeSleep(opts) {
    const { eff, count } = getActionContext();

    const physical = usePhysicalStore();
    const nutrition = useNutritionStore();
    const digestive = useDigestiveStore();
    const cardio = useCardiovascularStore();

    const sleepQuality = opts.sleepQuality;
    eff.value = Balance.percentage(nutrition.energy, 0, 0.25);

    Balance.affect(physical.energy, sleepQuality * count * eff.value);

    Balance.affect(digestive.health, sleepQuality * count * eff.value * 0.1);
    Balance.affect(cardio.health, sleepQuality * count * eff.value * 0.1);
}