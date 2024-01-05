import {defineStore} from "pinia";
import {storeName} from "@/stores/index.js";
import {Balance} from "@/stats/index.js";
import {computedOnce} from "@/helpers/computed.js";
import {onClock} from "@/routines/clock.js";
import {degradeLifetime} from "@/helpers/stats/health.js";

export const useReproductiveStore = defineStore(storeName('reproductive'), () => {
    const health = Balance.create({ min: 0, max: 1000, now: 1000 });

    const overallHealth = computedOnce(() => Balance.percentage(health));

    onClock(() => {
        degradeLifetime({ health });
    });

    return {
        health,

        overallHealth,
    };
})