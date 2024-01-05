import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import { Balance } from "@/stats";
import {computedOnce} from "@/helpers/computed.js";
import {onClock} from "@/routines/clock.js";
import {degradeLifetime} from "@/helpers/stats/health.js";

export const useDigestiveStore = defineStore(storeName('digestive'), () => {
    const health = Balance.create({ min: 0, max: 1000, now: 1000 });

    const overallHealth = computedOnce(() => Balance.percentage(health));

    onClock(() => {
        degradeLifetime({ health }, {
            deathReason: 'Digestive system failure',
        });
    });

    return {
        health,

        overallHealth,
    };
})
