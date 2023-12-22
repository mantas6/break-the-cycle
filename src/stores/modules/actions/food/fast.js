import {ref, computed, reactive} from 'vue'
import { useWalletStore } from "@/stores/stats/wallet";
import { useNutritionStore } from "@/stores/stats/nutrition";
import {defineStore} from "pinia";
import { storeName } from "@/stores";
import { Balance } from "@/stats/index.js";
import {interval} from "@/helpers/actions";
import {executeBasicFood} from "@/helpers/actions/food.js";

export default defineStore(storeName(import.meta.url), () => {
    const title = computed(() => 'Fast Food');
    const durations = interval(0.5);

    const meta = reactive({})

    function executeAction(count) {
        executeBasicFood(meta, count);
    }

    return {
        title,
        durations,

        meta,

        executeAction,
    };
})
