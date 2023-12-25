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

    })

    return {
        energy,
    };
})
