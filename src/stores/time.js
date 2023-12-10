import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import dayjs from "dayjs";

export const useTimeStore = defineStore('time', () => {
    const startDate = ref(new Date().toISOString())
    const daysAfter = ref(0)

    const date = computed(
        () => dayjs(startDate.value)
            .add(daysAfter.value, 'days')
            .format('YYYY-MM-DD')
    );

    function onClock() {
        daysAfter.value++
    }

    return {
        startDate,
        daysAfter,

        date,

        onClock,
    }
})
