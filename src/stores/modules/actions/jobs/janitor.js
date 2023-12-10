import { ref, computed } from 'vue'
import { useWalletStore } from "@/stores/stats/wallet";
import { defineModularStore } from "@/stores/modules/index";
import {useNutritionStore} from "@/stores/stats/nutrition.js";

export default defineModularStore(() => {
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
