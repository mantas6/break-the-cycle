import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { createBarStat, calcBarStatPercent, makeBarStatModify } from '@/helpers/bar-stat.js'
import { storeName } from "@/stores";


export const useBrainStore = defineStore(storeName(import.meta.url), () => {
    const healthSt = createBarStat(1000);
    const healthLt = createBarStat(1000);

    const sanity = createBarStat(100);
    const iQ = ref(1);

    const education = ref(1);

    const healthStPercent = calcBarStatPercent(healthSt);
    const healthLtPercent = calcBarStatPercent(healthLt);
    const sanityPercent = calcBarStatPercent(sanity);

    const condition = computed(() => healthStPercent.value * healthLtPercent.value);
    const mentalCondition = computed(() => condition.value * sanityPercent.value);

    const modifyHealthSt = makeBarStatModify(healthSt);

    return {
        healthSt,
        healthLt,

        sanity,
        iQ,

        education,


        healthStPercent,
        healthLtPercent,
        sanityPercent,

        condition,
        mentalCondition,

        modifyHealthSt,
    };
})
