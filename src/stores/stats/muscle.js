import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { createBarStat, makeBarStatModify, makeBarStatPreModify } from "@/helpers/bar-stat";
import { storeName } from "@/stores";
import { useNutritionStore } from "@/stores/stats/nutrition";

export const useMuscleStore = defineStore(storeName(import.meta.url), () => {
    const endurance = createBarStat(1000);

    const preModifyEndurance = makeBarStatPreModify(endurance);
    const modifyEndurance = makeBarStatModify(endurance);

    function onClock() {
        const nutrition = useNutritionStore();

        const recoveryRate = 10;
        const recoveryCost = 1;
        const totalCost = -recoveryRate * recoveryCost;

        if (totalCost < 0) {
            const available = nutrition.preModifyCalories(totalCost);
            const eff = Math.abs(available) / Math.abs(totalCost)

            // Incorrect because if endurance is full, energy is still used

            if (eff > 0) {
                nutrition.modifyCalories(totalCost * eff);
                modifyEndurance(recoveryRate * eff)
            }
        }
    }

    return {
        endurance,

        preModifyEndurance,
        modifyEndurance,

        onClock,
    };
})
