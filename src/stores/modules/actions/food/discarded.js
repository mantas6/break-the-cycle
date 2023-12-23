import {computed, reactive} from 'vue'
import {defineStore} from "pinia";
import { storeName } from "@/stores";
import { useNutritionStore } from "@/stores/stats/nutrition";
import { Balance } from "@/stats";
import {defineActionStore} from "@/stores/modules/actions/index.js";

const options = {
    title: 'Discarded Food',
    subcategory: 'Homeless',
    category: 'Food',
};

export default defineActionStore(options, ({ meta }) => {
    function executeAction(count) {
        const energyGain = 0.25 * count;

        const nutrition = useNutritionStore();

        // TODO: add energy cost
        const neededGain = Balance.reserve(nutrition.energy, energyGain);
        const eff = neededGain / energyGain;

        if (eff > 0) {
            meta.eff = eff;
            Balance.affect(nutrition.energy, energyGain * eff)
        } else {
            meta.eff = 0;
        }
    }

    return {
        executeAction,
    };
})
