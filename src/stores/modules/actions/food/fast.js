import {ref, computed, reactive} from 'vue'
import { useWalletStore } from "@/stores/stats/wallet";
import { useNutritionStore } from "@/stores/stats/nutrition";
import {defineStore} from "pinia";
import { storeName } from "@/stores";
import { Balance } from "@/stats/index.js";
import {interval} from "@/helpers/actions";
import {executeBasicFood} from "@/helpers/actions/food.js";
import {defineActionStore} from "@/stores/modules/actions/index.js";
import {useSocialStore} from "@/stores/stats/social.js";

const options = {
    title: 'Fast Food',
    subcategory: 'Restaurants',
    category: 'Food',
};

export default defineActionStore(options, store => {
    const social = useSocialStore();

    const durations = interval(0.5);
    const baseBalance = computed(() => -1);

    function executeAction(count) {
        executeBasicFood(store, count, { baseBalance, energyGain: 1 });
    }

    function beforeUnlock() {
        return social.construction.now >= 1000;
    }

    return {
        durations,
        baseBalance,

        executeAction,
        beforeUnlock,
    };
})
