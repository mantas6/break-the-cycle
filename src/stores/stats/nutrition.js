import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import { Balance } from "@/stats";
import {afterClock} from "@/routines/clock.js";
import {usePhysicalStore} from "@/stores/stats/physical.js";

export const useNutritionStore = defineStore(storeName('nutrition'), () => {
    const energy = Balance.create({ min: 0, max: 1000, now: 300 });
    const physical = usePhysicalStore();

    afterClock(() => {
        const energyUse = physical.energy.loss;
        const availabilityPercent = Balance.percentage(energy, 0, 0.25);

        const actualUse = energyUse * availabilityPercent;
        Balance.affect(energy, -actualUse);
    });

    return {
        energy,
    };
})
