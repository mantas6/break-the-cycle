import {ref, computed, reactive} from 'vue'
import { useWalletStore } from "@/stores/stats/wallet";
import { defineStore } from "pinia";
import { storeName } from "@/stores/index.js";
import { usePhysicalStore } from "@/stores/stats/physical.js";
import {Balance} from "@/stats/index.js";
import {defineActionStore} from "@/stores/modules/actions/index.js";

const options = {
    title: 'Janitor',
    subcategory: 'Education-less',
    category: 'Jobs',
};

export default defineActionStore(options, ({ eff }) => {
    const durations = computed(() => [4, 8, 12]);

    const walletBalance = computed(() => 1);

    function executeAction(count) {
        const physical = usePhysicalStore();

        const energyCost = 1 * count;
        const actualCost = Balance.reserve(physical.energy, -energyCost) * Balance.actualCenter(physical.energy, 0.5);
        eff.value = Math.abs(actualCost) / energyCost;

        Balance.affect(physical.energy, actualCost);

        const wallet = useWalletStore();
        wallet.transaction(walletBalance.value * count * eff.value);
    }

    return {
        durations,

        walletBalance,

        executeAction,
    };
})
