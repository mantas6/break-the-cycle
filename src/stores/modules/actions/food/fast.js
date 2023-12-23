import {ref, computed, reactive} from 'vue'
import { useWalletStore } from "@/stores/stats/wallet";
import { useNutritionStore } from "@/stores/stats/nutrition";
import {defineStore} from "pinia";
import { storeName } from "@/stores";
import { Balance } from "@/stats/index.js";
import {interval} from "@/helpers/actions";
import {executeBasicFood} from "@/helpers/actions/food.js";
import {defineActionStore} from "@/stores/modules/actions/index.js";

const options = {
    title: 'Fast Food',
    subcategory: 'Restaurants',
    category: 'Food',
};

export default defineActionStore(options, ({ eff }) => {
    const durations = interval(0.5);
    const baseBalance = computed(() => -1);

    function executeAction(count) {
        executeBasicFood({ eff, count }, { baseBalance, energyGain: 1 });
    }

    return {
        durations,
        baseBalance,

        executeAction,
    };
})
