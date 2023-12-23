import {computed, reactive} from 'vue'
import {defineStore} from "pinia";
import { storeName } from "@/stores";
import { useNutritionStore } from "@/stores/stats/nutrition";
import { Balance } from "@/stats";

const actionTitle = 'Discarded Food';

export default defineStore(storeName(actionTitle), () => {
    const title = computed(() => actionTitle);

    const meta = reactive({})

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
        title,

        meta,

        executeAction,
    };
})
