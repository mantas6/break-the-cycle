import { ref, computed } from 'vue'
import { useWalletStore } from "@/stores/stats/wallet";
import { useNutritionStore } from "@/stores/stats/nutrition";
import {defineStore} from "pinia";
import { storeName } from "@/stores";

export default defineStore(storeName(import.meta.url), () => {
    const title = ref('Fast Food');

    function executeAction(count) {
        const wallet = useWalletStore();
        const nutrition = useNutritionStore();

        const calorieGain = 1 * count;

        const caloriesDemand = nutrition.preModifyCalories(calorieGain);

        const baseCost = 0.5;
        const totalCost = baseCost * caloriesDemand * -1;

        if (totalCost < 0) {
            const availableBalance = wallet.preTransaction(totalCost);

            const availablePercent = Math.abs(availableBalance) / Math.abs(totalCost);

            wallet.transaction(availableBalance);
            nutrition.modifyCalories(caloriesDemand * availablePercent);
        }
    }

    return {
        title,

        executeAction,
    };
})
