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

    })

    return {
        health,
        healthLifetime,

        overallCapability,
    };
})
