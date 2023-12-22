import {ref, computed, reactive} from 'vue'
import { useWalletStore } from "@/stores/stats/wallet";
import { useNutritionStore } from "@/stores/stats/nutrition";
import {defineStore} from "pinia";
import { storeName } from "@/stores";
import { Balance } from "@/stats/index.js";
import {range} from "lodash/util";

export default defineStore(storeName(import.meta.url), () => {
    const title = ref('Fast Food');
    const duration = computed(() => range(0.5, 25, 0.5));

    const meta = reactive({})

    function executeAction(count) {
        const energyGain = 1 * count;
        const nutrition = useNutritionStore();
        const neededGain = Balance.reserve(nutrition.energy, energyGain)
        const demandEff = neededGain / energyGain;

        if (demandEff > 0) {
            const wallet = useWalletStore();
            const baseCost = 1;

            const actualCost = -baseCost * count * demandEff;
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

    return {
        title,
        duration,

        meta,

        executeAction,
    };
})
