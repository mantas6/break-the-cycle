import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import dayjs from "dayjs";
import { storeName } from "@/stores";
import { onClock } from "@/routines/clock.js";

export const useTimeStore = defineStore(storeName('persist.time'), () => {
    const startDate = ref(new Date().toISOString())
    const days = ref(0)

    const clockInterval = ref(500);
    const pause = ref(false);

    const date = computed(
        () => dayjs(startDate.value)
            .add(days.value, 'days')
            .format('YYYY-MM-DD')
    );

    onClock(() => days.value++);

    return {
        startDate,
        days,

        clockInterval,
        pause,

        date,
    }
})
