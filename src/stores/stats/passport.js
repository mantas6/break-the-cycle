import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {useTimeStore} from "@/stores/time";
import dayjs from "dayjs";

export const usePassportStore = defineStore('passport', () => {
    const time = useTimeStore();
    const birthday = ref(
        dayjs(time.date).subtract(18, 'years')
            .toISOString()
    );

    const age = computed(() => {
        return dayjs(time.date)
           .diff(birthday.value, 'years');
    });

    return {
        age,

        birthday,
    };
})
