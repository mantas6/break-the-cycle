import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import { Balance } from "@/stats";
import {useNutritionStore} from "@/stores/stats/nutrition.js";

export const usePhysicalStore = defineStore(storeName(import.meta.url), () => {
    const energy = Balance.create(-1000, 1000);

    function onClock() {
        const rate = -3;

        const nutrition = useNutritionStore();
        const actual = Balance.reserve(nutrition.energy, rate)
        const eff = actual / rate;

        Balance.affect(nutrition.energy, actual)
        Balance.affect(energy, rate * eff)
    }

    return {
        onClock,

        energy,
    };
})
