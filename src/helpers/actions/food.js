import {useNutritionStore} from "@/stores/stats/nutrition.js";
import {Balance} from "@/stats/index.js";
import {useWalletStore} from "@/stores/stats/wallet.js";
import {unref} from "vue";
import {head} from "lodash/array.js";

export function executeBasicFood({ eff, count, durations }, opts) {
    const energyGain = unref(opts.energyGain) * count;
    const nutrition = useNutritionStore();
    const neededGain = Balance.reserve(nutrition.energy, energyGain)
    const demandEff = neededGain / energyGain;

    if (demandEff > 0) {
        const wallet = useWalletStore();

        const baseBalance = unref(opts.baseBalance);
        const actualCost = baseBalance * count * demandEff;
        const minBalance = baseBalance * head(unref(durations));
        const cost = wallet.preTransaction(actualCost, minBalance)

        const costEff = cost / actualCost;

        eff.value = Math.min(demandEff, costEff);
        wallet.transaction(cost)
        Balance.affect(nutrition.energy, energyGain * eff.value)
    } else {
        eff.value = 0;
    }
}