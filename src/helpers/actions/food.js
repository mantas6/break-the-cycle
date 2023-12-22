import {useNutritionStore} from "@/stores/stats/nutrition.js";
import {Balance} from "@/stats/index.js";
import {useWalletStore} from "@/stores/stats/wallet.js";

export function executeBasicFood(meta, count, options = { energyGain: 1, baseCost: 1 }) {
    const energyGain = options.energyGain * count;
    const nutrition = useNutritionStore();
    const neededGain = Balance.reserve(nutrition.energy, energyGain)
    const demandEff = neededGain / energyGain;

    if (demandEff > 0) {
        const wallet = useWalletStore();

        const actualCost = -options.baseCost * count * demandEff;
        const cost = wallet.preTransaction(actualCost)

        const costEff = cost / actualCost;

        const eff = Math.min(demandEff, costEff);
        meta.eff = eff;
        wallet.transaction(cost)
        Balance.affect(nutrition.energy, energyGain * eff)
    } else {
        meta.eff = 0;
    }
}