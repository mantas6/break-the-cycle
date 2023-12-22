import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import { Balance } from "@/stats";
import {useNutritionStore} from "@/stores/stats/nutrition.js";
import {onClock} from "@/routines/clock.js";

export const usePhysicalStore = defineStore(storeName(import.meta.url), () => {
    const energy = Balance.create(-1000, 1000);

    onClock(() => {
        let rate = 3;

        const nutrition = useNutritionStore();

        rate *= Balance.percentage(nutrition.energy, 0, 0.25);

        if (rate > 0) {
            const actual = Balance.reserve(nutrition.energy, -rate)
            const eff = Math.abs(actual) / rate;

            Balance.affect(nutrition.energy, actual)
            Balance.affect(energy, rate * eff)
        }
    })

    return {
        energy,
    };
})
