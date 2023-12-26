import { ref } from 'vue'
import { defineStore } from 'pinia'
import { storeName } from "@/stores";

export const useDeathStore = defineStore(storeName('death'), () => {
    const alive = ref(true);
    const reason = ref();

    function setDead(nowReason) {
        alive.value = false;
        reason.value = nowReason;
    }

    return {
        alive,
        reason,

        setDead,
    }
})
