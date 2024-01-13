import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import {useWalletStore} from "@/stores/stats/wallet.js";
import {usePhysicalStore} from "@/stores/stats/physical.js";
import {Balance} from "@/stats/index.js";
import {condition} from "@/helpers/state.js";
import {useNutritionStore} from "@/stores/stats/nutrition.js";
import {onClock} from "@/routines/clock.js";
import {useActionsStore} from "@/stores/actions.js";
import {useIntellectStore} from "@/stores/stats/intellect.js";

export const useUnlockStore = defineStore(storeName('unlock'), () => {
    const wallet = useWalletStore();
    const actionsStore = useActionsStore();
    const physicalStore = usePhysicalStore();
    const nutritionStore = useNutritionStore();
    const intellect = useIntellectStore();

    const balance = condition(() => wallet.balance.now > 0);

    const categories = condition(() => Object.keys(actionsStore.all).length > 1);

    const planner = condition(() => intellect.overall > 10);
    const hold = condition(() => intellect.overall > 5);

    const physical = condition(() => Balance.actualCenter(physicalStore.energy) < 0.5);

    const nutrition = condition(() => Balance.percentage(nutritionStore.energy) < 0.25);

    return {
        balance,
        categories,

        planner,
        hold,

        physical,
        nutrition,
    }
})
