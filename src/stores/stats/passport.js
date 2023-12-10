import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {useTimeStore} from "@/stores/time";
import dayjs from "dayjs";

export const usePassportStore = defineStore('passport', () => {
    const time = useTimeStore();
    const birthday = ref(time.date);

    const age = computed(() => {
        const baseAge = 18;
        return baseAge + dayjs(time.date)
           .diff(birthday.value, 'years');
    });

    return {
        age,

        birthday,
    };
})
