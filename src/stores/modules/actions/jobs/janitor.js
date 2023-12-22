import {ref, computed, reactive} from 'vue'
import { useWalletStore } from "@/stores/stats/wallet";
import { defineStore } from "pinia";
import { storeName } from "@/stores/index.js";
import { usePhysicalStore } from "@/stores/stats/physical.js";
import {Balance} from "@/stats/index.js";

export default defineStore(storeName(import.meta.url), () => {
    const title = computed(() => 'Janitor');
    const meta = reactive({});

    function executeAction(count) {
        const physical = usePhysicalStore();

        const energyCost = 1 * count;
        const actualCost = Balance.reserve(physical.energy, -energyCost) * Balance.actualCenter(physical.energy, 0.5);
        const eff = Math.abs(actualCost) / energyCost;

        // Should move this to a computed property so that it can be calculated even when the action is not being done
        meta.eff = eff;

        // console.log({ actualCost, eff })

        Balance.affect(physical.energy, actualCost);

        const wallet = useWalletStore();
        wallet.transaction(1 * count * eff);
    }

    return {
        title,

        meta,

        executeAction,
    };
})
