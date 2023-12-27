import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import {useWalletStore} from "@/stores/stats/wallet.js";
import {usePhysicalStore} from "@/stores/stats/physical.js";
import {Balance} from "@/stats/index.js";
import {condition} from "@/helpers/state.js";
import {useNutritionStore} from "@/stores/stats/nutrition.js";
import {onClock} from "@/routines/clock.js";

export const useUnlockStore = defineStore(storeName('unlock'), () => {
    const wallet = useWalletStore();
    const physicalStore = usePhysicalStore();
    const nutritionStore = useNutritionStore();

    const balance = condition(() => wallet.balance.now > 0);

    const planner = condition(() => wallet.balance.now > 25);

    const physical = condition(() => Balance.actualCenter(physicalStore.energy) < 0.5);

    const nutrition = condition(() => Balance.percentage(nutritionStore.energy) < 0.25);

    /*onClock(() => {
        balance.value = true;
        planner.value = true;
        physical.value = true;
        nutrition.value = true;
    })*/

    return {
        balance,
        planner,
        physical,
        nutrition,
    }
})
