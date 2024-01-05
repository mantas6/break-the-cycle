import {useNutritionStore} from "@/stores/stats/nutrition.js";
import {useDigestiveStore} from "@/stores/stats/digestive.js";
import {useCardiovascularStore} from "@/stores/stats/cardiovascular.js";
import {Balance} from "@/stats/index.js";
import {usePhysicalStore} from "@/stores/stats/physical.js";
import {getActionContext} from "@/helpers/actions/context.js";
import {useRespiratoryStore} from "@/stores/stats/respiratory.js";
import {useReproductiveStore} from "@/stores/stats/reproductive.js";
import {useNeuronalStore} from "@/stores/stats/neuronal.js";

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

    const neuronal = useNeuronalStore();

    const digestive = useDigestiveStore();
    const cardiovascular = useCardiovascularStore();
    const respiratory = useRespiratoryStore();

    const reproductive = useReproductiveStore();

    const sleepQuality = opts.sleepQuality;
    eff.value = Balance.percentage(nutrition.energy, 0, 0.25);

    Balance.affect(physical.energy, sleepQuality * count * eff.value);

    const rate = 0.1;

    Balance.affect(neuronal.health, sleepQuality * count * eff.value * rate);

    Balance.affect(digestive.health, sleepQuality * count * eff.value * rate);
    Balance.affect(cardiovascular.health, sleepQuality * count * eff.value * rate);
    Balance.affect(respiratory.health, sleepQuality * count * eff.value * rate);

    Balance.affect(reproductive.health, sleepQuality * count * eff.value * rate);
}