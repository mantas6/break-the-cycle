import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import { Balance } from "@/stats";
import {useNutritionStore} from "@/stores/stats/nutrition.js";
import {onClock} from "@/routines/clock.js";
import {useMuscularStore} from "@/stores/stats/muscular.js";

export const usePhysicalStore = defineStore(storeName('physical'), () => {
    const energy = Balance.create(-1000, 1000);

    const nutrition = useNutritionStore();
    const muscular = useMuscularStore();

    onClock(() => {
        let rate = 3;

        rate *= Balance.percentage(nutrition.energy, 0, 0.25);
        rate *= Balance.percentage(muscular.health, 0, 0.25);

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
