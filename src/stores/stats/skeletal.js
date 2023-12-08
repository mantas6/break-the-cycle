import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSkeletalStore = defineStore('skeletal', () => {
    const muscleMass = ref(100);

    return {
        muscleMass,
    };
})
