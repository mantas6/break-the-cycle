import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {useTimeStore} from "@/stores/time";
import dayjs from "dayjs";
import {storeName} from "@/stores";

export const usePassportStore = defineStore(storeName('passport'), () => {
    const time = useTimeStore();

    const alive = ref(true);

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
        alive,

        birthday,
    };
})
