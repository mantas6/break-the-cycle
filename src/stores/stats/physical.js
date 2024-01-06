import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import { Balance } from "@/stats";
import {useCardiovascularStore} from "@/stores/stats/cardiovascular.js";
import {computedOnce} from "@/helpers/computed.js";
import {onClock} from "@/routines/clock.js";
import {useRespiratoryStore} from "@/stores/stats/respiratory.js";

export const usePhysicalStore = defineStore(storeName('physical'), () => {
    const energy = Balance.create({ min: -100, max: 100, now: 50, lowerLimit: -99.9, upperLimit: 99.9 });

    const muscleMass = Balance.create({ min: 0, max: 1000, now: 1, lowerLimit: 1 });

    const cardiovascular = useCardiovascularStore();
    const respiratory = useRespiratoryStore();

    const overallCapability = computedOnce(() => Balance.actualCenter(energy) * cardiovascular.overallHealth * respiratory.overallHealth);

    onClock(() => {
        const balance = (1 - Balance.actualCenter(energy));
        Balance.affect(cardiovascular.health, -balance);

        Balance.affectTolerance(muscleMass, -0.1);
    });

    return {
        energy,
        muscleMass,

        overallCapability,
    };
})
