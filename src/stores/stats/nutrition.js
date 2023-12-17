import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import { Balance } from "@/stats";

export const useNutritionStore = defineStore(storeName(import.meta.url), () => {
    const energy = Balance.create(0, 1000);

    function onClock() {

    }

    return {
        onClock,

        energy,
    };
})
