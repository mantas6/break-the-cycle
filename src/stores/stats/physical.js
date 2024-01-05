import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import { Balance } from "@/stats";
import {useCardiovascularStore} from "@/stores/stats/cardiovascular.js";
import {computedOnce} from "@/helpers/computed.js";
import {onClock} from "@/routines/clock.js";

export const usePhysicalStore = defineStore(storeName('physical'), () => {
    const energy = Balance.create({ min: -100, max: 100, now: 50 });

    const cardiovascular = useCardiovascularStore();

    const overallCapability = computedOnce(() => Balance.actualCenter(energy) * cardiovascular.overallHealth);

    onClock(() => {
        const balance = (1 - Balance.actualCenter(energy));

        Balance.affect(cardiovascular.health, -balance);
    });

    return {
        energy,

        overallCapability,
    };
})
