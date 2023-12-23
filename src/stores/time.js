import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import dayjs from "dayjs";
import { storeName } from "@/stores";
import { onClock } from "@/routines/clock.js";

export const useTimeStore = defineStore(storeName('time'), () => {
    const startDate = ref(new Date().toISOString())
    const daysAfter = ref(0)

    const clockInterval = ref(500);
    const pause = ref(false);

    const date = computed(
        () => dayjs(startDate.value)
            .add(daysAfter.value, 'days')
            .format('YYYY-MM-DD')
    );

    onClock(() => daysAfter.value++);

    return {
        startDate,
        daysAfter,

        clockInterval,
        pause,

        date,
    }
})
