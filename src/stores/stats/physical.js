import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import { Balance } from "@/stats";
import {useCardiovascular} from "@/stores/stats/cardiovascular.js";
import {computedOnce} from "@/stats/computed.js";
import {onClock} from "@/routines/clock.js";

export const usePhysicalStore = defineStore(storeName('physical'), () => {
    const energy = Balance.create(-1000, 1000);

    const cardiovascular = useCardiovascular();

    const overallCapability = computedOnce(() => Balance.actualCenter(energy) * cardiovascular.overallHealth);

    onClock(() => {
        const balance = (1 - Balance.actualCenter(energy)) * 5;

        Balance.affect(cardiovascular.health, -balance);
    });

    return {
        energy,

        overallCapability,
    };
})
