import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import { Balance } from "@/stats";
import {computedOnce} from "@/stats/computed.js";

export const useCardiovascular = defineStore(storeName('cardiovascular'), () => {
    const health = Balance.create(0, 1000, 1000);
    const healthLifetime = Balance.create(0, 1000, 1000);

    const overallHealth = computedOnce(() => Balance.percentage(health) * Balance.percentage(healthLifetime));

    return {
        health,
        healthLifetime,

        overallHealth,
    };
})
