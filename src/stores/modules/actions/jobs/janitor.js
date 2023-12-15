import { ref, computed } from 'vue'
import { useWalletStore } from "@/stores/stats/wallet";
import { defineStore } from "pinia";
import { storeName } from "@/stores/index.js";
import { usePhysicalStore } from "@/stores/stats/physical.js";
import {Balance} from "@/stats/index.js";

export default defineStore(storeName(import.meta.url), () => {
    const title = ref('Janitor');
    const experience = ref(0);

    function executeAction(count) {
        const physical = usePhysicalStore();

        const energyCost = 1 * count;
        const actualCost = Balance.reserve(physical.balance, energyCost) * Balance.actualCenter(physical.balance);
        const eff = actualCost / energyCost;

        // console.log({ actualCost, eff })

        Balance.affect(physical.balance, actualCost);

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
