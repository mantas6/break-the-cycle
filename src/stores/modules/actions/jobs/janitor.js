import { ref, computed } from 'vue'
import { useWalletStore } from "@/stores/stats/wallet";
import { defineStore } from "pinia";
import { storeName } from "@/stores/index.js";
import { useMuscleStore } from "@/stores/stats/muscle.js";

export default defineStore(storeName(import.meta.url), () => {
    const title = ref('Janitor');
    const experience = ref(0);

    function executeAction(count) {
        const muscle = useMuscleStore();

        const energyCost = 1 * count;
        const energyUsed = muscle.modifyEndurance(-energyCost);
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
