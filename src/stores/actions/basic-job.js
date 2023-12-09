import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useWalletStore } from "@/stores/stats/wallet.js";

export default defineStore('actions:basic_job', () => {
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
