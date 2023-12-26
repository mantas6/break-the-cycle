import {useNutritionStore} from "@/stores/stats/nutrition.js";
import {Balance} from "@/stats/index.js";
import {useWalletStore} from "@/stores/stats/wallet.js";
import {toValue} from "vue";
import {head} from "lodash/array.js";
import {useDigestiveStore} from "@/stores/stats/digestive.js";

export function executeBasicFood({ eff, count, durations }, opts) {
    const energyGain = toValue(opts.energyGain) * count;
    const nutrition = useNutritionStore();
    const digestive = useDigestiveStore();
    const neededGain = Balance.reserve(nutrition.energy, energyGain)
    const demandEff = neededGain / energyGain;

    if (demandEff > 0) {
        const wallet = useWalletStore();

        const baseBalance = toValue(opts.baseBalance);
        const actualCost = baseBalance * count * demandEff;
        const minBalance = baseBalance * head(toValue(durations));
        const cost = wallet.preTransaction(actualCost, minBalance)

        const costEff = cost / actualCost;

        eff.value = Math.min(demandEff * digestive.overallHealth, costEff);
        wallet.transaction(cost)
        Balance.affect(nutrition.energy, energyGain * eff.value)

        const digestiveHealthLoss = 0.1;
        Balance.affect(digestive.health, -digestiveHealthLoss * eff.value * count)
    } else {
        eff.value = 0;
    }
}