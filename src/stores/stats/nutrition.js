import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import { Balance } from "@/stats";
import {onClock} from "@/routines/clock.js";
import {usePhysicalStore} from "@/stores/stats/physical.js";

export const useNutritionStore = defineStore(storeName('nutrition'), () => {
    const energy = Balance.create(0, 1000);
    const physical = usePhysicalStore();

    onClock(() => {
        const energyUse = physical.energy.loss;
        const availabilityPercent = Balance.percentage(energy, 0, 0.25);

        // Need to implement clock priority
        console.log({energyUse})

        const actualUse = energyUse * availabilityPercent;
        Balance.affect(energy, -actualUse);
    });

    return {
        energy,
    };
})
