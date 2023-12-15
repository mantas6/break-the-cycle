import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import { Balance } from "@/stats";

export const usePhysicalStore = defineStore(storeName(import.meta.url), () => {
    const balance = Balance.create(0, -1000, 0, 1000);

    return {
        balance,
    };
})
