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
import {computed} from "vue";
import {useCardiovascularStore} from "@/stores/stats/cardiovascular.js";
import {useRespiratoryStore} from "@/stores/stats/respiratory.js";
import {useDigestiveStore} from "@/stores/stats/digestive.js";
import {useNeuronalStore} from "@/stores/stats/neuronal.js";
import {useReproductiveStore} from "@/stores/stats/reproductive.js";

export const useUnlockStore = defineStore(storeName('unlock'), () => {
    const wallet = useWalletStore();
    const actionsStore = useActionsStore();
    const physicalStore = usePhysicalStore();
    const nutritionStore = useNutritionStore();
    const intellect = useIntellectStore();

    const cardiovascularStore = useCardiovascularStore();
    const respiratoryStore = useRespiratoryStore();
    const digestiveStore = useDigestiveStore();
    const neuronalStore = useNeuronalStore();
    const reproductiveStore = useReproductiveStore();

    const balance = condition(() => wallet.balance.now > 0);

    const categories = condition(() => Object.keys(actionsStore.all).length > 1);

    const planner = condition(() => intellect.overall > 10);
    const hold = condition(() => intellect.overall > 5);

    const physical = condition(() => Balance.actualCenter(physicalStore.energy) < 0.5);
    const nutrition = condition(() => Balance.percentage(nutritionStore.energy) < 0.25);

    const healthBaseUnlock = computed(() => intellect.overall > 15);

    const cardiovascular = condition(() => healthBaseUnlock.value || cardiovascularStore.overallHealth < 0.5);
    const respiratory = condition(() => intellect.overall > 15 || respiratoryStore.overallHealth < 0.5);
    const digestive = condition(() => intellect.overall > 15 || digestiveStore.overallHealth < 0.5);
    const neuronal = condition(() => intellect.overall > 15 || neuronalStore.overallHealth < 0.5);
    const reproductive = condition(() => intellect.overall > 15 || reproductiveStore.overallHealth < 0.5);

    return {
        balance,
        categories,

        planner,
        hold,

        physical,
        nutrition,

        cardiovascular,
        respiratory,
        digestive,
        neuronal,
        reproductive,
    }
})
