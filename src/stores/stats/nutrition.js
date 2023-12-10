import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {createBarStat, makeBarStatModify, makeBarStatPreModify} from "@/helpers/bar-stat.js";

export const useNutritionStore = defineStore('nutrition', () => {
    const calories = createBarStat(1000);

    const preModifyCalories = makeBarStatPreModify(calories);
    const modifyCalories = makeBarStatModify(calories);

    return {
        calories,

        preModifyCalories,
        modifyCalories,
    };
})
