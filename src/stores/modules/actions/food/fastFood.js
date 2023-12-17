import {ref, computed, reactive} from 'vue'
import { useWalletStore } from "@/stores/stats/wallet";
import {defineStore} from "pinia";
import { storeName } from "@/stores";

export default defineStore(storeName(import.meta.url), () => {
    const title = ref('Fast Food');
    const duration = computed(() => 0.5);

    const meta = reactive({})

    function executeAction(count) {

    }

    return {
        title,
        duration,

        meta,

        executeAction,
    };
})
