import {ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'
import { sum } from "lodash";

export const useActionsStore = defineStore('actions', () => {
    const active = reactive({ abc: 1 });

    const currentCount = computed(() => {
        return sum(Object.values(active));
    });

    const maxCount = computed(() => 24);

    const all = computed(() => {
        return {
            basic_job: { title: 'Basic Job' },
        };
    });

    function increase(name) {

    }

    function decrease(name) {

    }

    return {
        active,

        currentCount,
        maxCount,
        all,
    };
})
