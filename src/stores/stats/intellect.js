import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { storeName } from "@/stores";

export const useIntellectStore = defineStore(storeName('intellect'), () => {
    const intelligence = ref(50);
    const education = ref(0);

    const overall = computed(() => intelligence.value * education.value);

    return {
        intelligence,
        education,

        overall,
    };
})
