import { ref, computed } from 'vue'
import { useWalletStore } from "@/stores/stats/wallet.js";
import { defineModularStore } from "@/stores/modules/index.js";

export default defineModularStore(() => {
    const title = ref('Basic Job');
    const experience = ref(0);

    function executeAction(count) {
        const wallet = useWalletStore();
        wallet.transaction(1 * count);

        experience.value += count;
    }

    return {
        title,
        experience,

        executeAction,
    };
})
