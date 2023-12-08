import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import dayjs from "dayjs";

export const useTimeStore = defineStore('time', () => {
    const startDate = ref(new Date().toString())
    const daysAfter = ref(0)

    const date = computed(
        () => dayjs(startDate.value)
            .add(daysAfter.value, 'days')
            .format('YYYY-MM-DD')
    );

    function increment() {
        daysAfter.value++
    }

    function onClock() {
        increment();
    }

    return {
        startDate,
        daysAfter,

        date,

        increment,
        onClock,
    }
})
