import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import { Balance } from "@/stats";
import {computedOnce} from "@/helpers/computed.js";
import {onClock} from "@/routines/clock.js";
import {degradeLifetime} from "@/helpers/stats/health.js";

export const useCardiovascularStore = defineStore(storeName('cardiovascular'), () => {
    const health = Balance.create({ min: 0, max: 1000, now: 1000 });
    const healthLifetime = Balance.create({ min: 0, max: 1000, now: 1000 });

    const overallHealth = computedOnce(() => Balance.percentage(health) * Balance.percentage(healthLifetime));

    onClock(() => {
        degradeLifetime({ health, healthLifetime }, {
            deathReason: 'Cardiovascular system failure',
        });
    });

    return {
        health,
        healthLifetime,

        overallHealth,
    };
})
