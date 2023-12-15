import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {createBarStat, makeBarStatModify, makeBarStatPreModify} from "@/helpers/barStat.js";
import { storeName } from "@/stores";

export const useNutritionStore = defineStore(storeName(import.meta.url), () => {
    const calories = createBarStat(1000);

    const preModifyCalories = makeBarStatPreModify(calories);
    const modifyCalories = makeBarStatModify(calories);

    return {
        calories,

        preModifyCalories,
        modifyCalories,
    };
})
