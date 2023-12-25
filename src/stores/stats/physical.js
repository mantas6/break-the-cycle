import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import { Balance } from "@/stats";

export const usePhysicalStore = defineStore(storeName('physical'), () => {
    const energy = Balance.create(-1000, 1000);

    const overallCapability = computed(() => Balance.actualCenter(energy));

    return {
        energy,

        overallCapability,
    };
})
