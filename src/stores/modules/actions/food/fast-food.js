import { ref, computed } from 'vue'
import { useWalletStore } from "@/stores/stats/wallet";
import { defineModularStore } from "@/stores/modules/index";
import { useNutritionStore } from "@/stores/stats/nutrition";

export default defineModularStore(() => {
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

            console.log({ availableBalance, totalCost, result: caloriesDemand * availablePercent })

            wallet.transaction(availableBalance);
            nutrition.modifyCalories(caloriesDemand * availablePercent);
        }
    }

    return {
        title,

        executeAction,
    };
})
