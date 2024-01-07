import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import { Balance } from "@/stats";
import {useCardiovascularStore} from "@/stores/stats/cardiovascular.js";
import {computedOnce} from "@/helpers/computed.js";
import {onClock} from "@/routines/clock.js";
import {useRespiratoryStore} from "@/stores/stats/respiratory.js";
import {computed} from "vue";

export const usePhysicalStore = defineStore(storeName('physical'), () => {
    const cardiovascular = useCardiovascularStore();
    const respiratory = useRespiratoryStore();

    const energy = Balance.create({
        min: -100,
        max: 100,
        now: 50,
        lowerLimit: -99.9,
        upperLimit: 99.9,
    });

    const muscleMass = Balance.create({
        min: 0,
        max: 1000,
        now: 1,
        lowerLimit: 1,
    });

    // Still have to decide what will determine this stat
    // Also the UI bar should display this as a green bg
    const physicalEndurance = computed(() => 0.25);

    const overallCapability = computedOnce(() => Balance.actualCenter(energy, physicalEndurance.value) * cardiovascular.overallHealth * respiratory.overallHealth);

    onClock(() => {
        const balance = (1 - Balance.actualCenter(energy, 0.25));
        Balance.affect(cardiovascular.health, -balance * 20);

        Balance.affectTolerance(muscleMass, -1);
    });

    return {
        energy,
        muscleMass,

        physicalEndurance,

        overallCapability,
    };
})
