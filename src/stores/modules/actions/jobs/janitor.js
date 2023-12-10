import { ref, computed } from 'vue'
import { useWalletStore } from "@/stores/stats/wallet";
import {useNutritionStore} from "@/stores/stats/nutrition.js";
import { defineStore } from "pinia";
import { storeName } from "@/stores/index.js";

export default defineStore(storeName(import.meta.url), () => {
    const title = ref('Janitor');
    const experience = ref(0);

    function executeAction(count) {
        const nutrition = useNutritionStore();

        const energyCost = 1 * count;
        const energyUsed = nutrition.modifyCalories(-energyCost);
        const eff = energyUsed / energyCost;

        const wallet = useWalletStore();
        wallet.transaction(1 * count * eff);

        experience.value += count;
    }

    return {
        title,
        experience,

        executeAction,
    };
})
