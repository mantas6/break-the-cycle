import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import dayjs from "dayjs";
import { storeName } from "@/stores";
import { onClock } from "@/routines/clock.js";
import {computedWritable} from "@/helpers/computed.js";

export const useTimeStore = defineStore(storeName('persist.time'), () => {
    const startDate = ref(new Date().toISOString())
    const days = ref(0)

    // Should probably be a computedWritable, but useful as ref for debugging
    const clockInterval = ref(500);
    const pause = computedWritable(false);

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
