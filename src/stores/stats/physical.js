import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import { Balance } from "@/stats";
import {useCardiovascular} from "@/stores/stats/cardiovascular.js";

export const usePhysicalStore = defineStore(storeName('physical'), () => {
    const energy = Balance.create(-1000, 1000);

    const cardiovascular = useCardiovascular();

    const overallCapability = computed(() => Balance.actualCenter(energy) * cardiovascular.overallHealth);

    return {
        energy,

        overallCapability,
    };
})
