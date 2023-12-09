import {ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'
import { sum } from "lodash";

export const useActionsStore = defineStore('actions', () => {
    const active = reactive({});

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
        if (currentCount.value >= maxCount.value) {
            return;
        }

        if (active[name] === undefined) {
            active[name] = 1;
        } else {
            active[name]++;
        }
    }

    function decrease(name) {
        if (active[name] !== undefined) {
            active[name]--;
            if (active[name] <= 0) {
                delete active[name];
            }
        }
    }

    return {
        active,

        currentCount,
        maxCount,
        all,

        increase,
        decrease,
    };
})
