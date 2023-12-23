import {useNutritionStore} from "@/stores/stats/nutrition.js";
import {Balance} from "@/stats/index.js";
import {useWalletStore} from "@/stores/stats/wallet.js";
import {unref} from "vue";

export function executeBasicFood({ eff, count }, options) {
    const energyGain = unref(options.energyGain) * count;
    const nutrition = useNutritionStore();
    const neededGain = Balance.reserve(nutrition.energy, energyGain)
    const demandEff = neededGain / energyGain;

    if (demandEff > 0) {
        const wallet = useWalletStore();

        const actualCost = unref(options.walletBalance) * count * demandEff;
        const cost = wallet.preTransaction(actualCost)

        const costEff = cost / actualCost;

        eff.value = Math.min(demandEff, costEff);
        wallet.transaction(cost)
        Balance.affect(nutrition.energy, energyGain * eff.value)
    } else {
        eff.value = 0;
    }
}