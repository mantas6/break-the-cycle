import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import { Balance } from "@/stats";
import {computedOnce} from "@/helpers/computed.js";
import {onClock} from "@/routines/clock.js";
import {useDeathStore} from "@/stores/death.js";

export const useCardiovascular = defineStore(storeName('cardiovascular'), () => {
    const health = Balance.create(0, 1000, 1000);
    const healthLifetime = Balance.create(0, 1000, 1000);

    const overallHealth = computedOnce(() => Balance.percentage(health) * Balance.percentage(healthLifetime));

    onClock(() => {
        // Copy paste from digestive, needs to be a global method
        const passiveHealthLoss = 0.01;
        const healthLossMultiplier = 10;
        const loss = Math.max((1 - Balance.percentage(health)) * healthLossMultiplier, passiveHealthLoss);
        Balance.affect(healthLifetime, -loss);

        if (!Balance.percentage(healthLifetime)) {
            const death = useDeathStore();
            death.setDead('Cardiovascular system failure');
        }
    });

    return {
        health,
        healthLifetime,

        overallHealth,
    };
})
