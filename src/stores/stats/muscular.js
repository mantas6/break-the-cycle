import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import { Balance } from "@/stats";
import {onClock} from "@/routines/clock.js";
import {usePhysicalStore} from "@/stores/stats/physical.js";
import {usePassportStore} from "@/stores/stats/passport.js";
import {computed} from "vue";

export const useMuscularStore = defineStore(storeName('muscular'), () => {
    const physical = usePhysicalStore();
    const passport = usePassportStore();

    const health = Balance.create(0, 1000, 1000);
    const healthLifetime = Balance.create(0, 1000, 1000);

    const overallCapability = computed(() => Balance.percentage(health) * Balance.percentage(healthLifetime) * Balance.actualCenter(physical.energy, 0));

    onClock(() => {
        const actualCenter = Balance.actualCenter(physical.energy, 0.25);
        const healthLoss = (10 - actualCenter * 10) + 1;
        Balance.affect(health, -healthLoss);

        const healthPercent = Balance.percentage(health)
        const healthLifetimeLoss = (1 - healthPercent ) * 10;
        Balance.affect(healthLifetime, -healthLifetimeLoss);

        if (!healthLifetime.now) {
            passport.alive = false;
        }
    })

    return {
        health,
        healthLifetime,

        overallCapability,
    };
})
