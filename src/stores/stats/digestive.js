import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import { Balance } from "@/stats";
import {computedOnce} from "@/stats/computed.js";
import {onClock} from "@/routines/clock.js";
import {useDeathStore} from "@/stores/death.js";

export const useDigestiveStore = defineStore(storeName('digestive'), () => {
    const health = Balance.create(0, 1000, 1000);
    const healthLifetime = Balance.create(0, 1000, 1000);

    const overallHealth = computedOnce(() => Balance.percentage(health) * Balance.percentage(healthLifetime));

    onClock(() => {
        const passiveHealthLoss = 0.01;
        const healthLossMultiplier = 10;
        const loss = Math.max((1 - Balance.percentage(health)) * healthLossMultiplier, passiveHealthLoss);
        Balance.affect(healthLifetime, -loss);

        if (!Balance.percentage(healthLifetime)) {
            const death = useDeathStore();
            death.setDead('Digestive system failure');
        }
    });

    return {
        health,
        healthLifetime,

        overallHealth,
    };
})
