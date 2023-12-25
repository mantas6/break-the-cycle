import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import { Balance } from "@/stats";
import {computed} from "vue";

export const useCardiovascular = defineStore(storeName('cardiovascular'), () => {
    const health = Balance.create(0, 1000, 1000);
    const healthLifetime = Balance.create(0, 1000, 1000);

    const overallHealth = computed(() => Balance.percentage(health) * Balance.percentage(healthLifetime));

    return {
        health,
        healthLifetime,

        overallHealth,
    };
})
