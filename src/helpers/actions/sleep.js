import {useNutritionStore} from "@/stores/stats/nutrition.js";
import {useDigestiveStore} from "@/stores/stats/digestive.js";
import {useCardiovascularStore} from "@/stores/stats/cardiovascular.js";
import {Balance} from "@/stats/index.js";
import {usePhysicalStore} from "@/stores/stats/physical.js";
import {getActionContext} from "@/helpers/actions/context.js";
import {useRespiratoryStore} from "@/stores/stats/respiratory.js";
import {useReproductiveStore} from "@/stores/stats/reproductive.js";
import {useNeuronalStore} from "@/stores/stats/neuronal.js";
import {useWalletStore} from "@/stores/stats/wallet.js";
import {toValue} from "vue";

/**
 * @typedef {Object} SleepOptions
 * @property {number|{value:number}} sleepQuality - multiplier for energy restoration
 * @property {number|{value:number}} [baseBalance] - sleeping cost per night
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

    const wallet = useWalletStore();

    if (opts.baseBalance) {
        const baseBalance = toValue(opts.baseBalance);

        if (!wallet.preTransactionArr(baseBalance)) {
            eff.value = 0;
            return;
        }

        wallet.transaction(baseBalance);
    }

    eff.value = Balance.percentage(nutrition.energy, 0, 0.25);

    const sleepQuality = toValue(opts.sleepQuality);
    const muscleAmount = Balance.percentage(physical.muscleMass);

    Balance.affect(physical.energy, sleepQuality * count * eff.value * (1 + muscleAmount));

    const rate = 0.1;

    Balance.affect(neuronal.health, sleepQuality * count * eff.value * rate);

    Balance.affect(digestive.health, sleepQuality * count * eff.value * rate);
    Balance.affect(cardiovascular.health, sleepQuality * count * eff.value * rate);
    Balance.affect(respiratory.health, sleepQuality * count * eff.value * rate);

    Balance.affect(reproductive.health, sleepQuality * count * eff.value * rate);
}