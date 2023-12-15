import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import { Balance } from "@/stats";

export const useCoreStore = defineStore(storeName(import.meta.url), () => {
    const physical = Balance.create(0, -1000, 0, 1000);

    function onClock() {
        Balance.affect(balance, -3)
    }

    return {
        onClock,

        balance,
    };
})
