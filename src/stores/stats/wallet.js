import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useWalletStore = defineStore('wallet', () => {
    const balance = ref(0);

    function transaction(net) {
        balance.value += net;
    }

    return {
        balance,

        transaction,
    };
})