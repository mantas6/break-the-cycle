import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import {Value} from "@/stats";

export const useIntellectStore = defineStore(storeName('intellect'), () => {
    const intelligence = ref(50);
    const education = Value.create(0);

    const overall = computed(() => intelligence.value * education.value);

    return {
        intelligence,
        education,

        overall,
    };
})
