import {ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'
import { sum } from "lodash";
import { actionStores } from "@/plugins/actions.js";

export const useActionsStore = defineStore('actions', () => {
    const active = reactive({});

    const currentCount = computed(() => {
        return sum(Object.values(active));
    });

    const maxCount = computed(() => 24);

    const all = computed(() => {
        const actions = {};

        for (const [ actionName, actionStore ] of actionStores.value.entries()) {
            actions[actionName] = { title: actionStore.title };
        }

        return actions;
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

    function onClock() {
        for (const [ actionName, actionCount ] of Object.entries(active) ) {
            const action = actionStores.value.get(actionName);
            action.executeAction(actionCount);
        }
    }

    return {
        active,

        currentCount,
        maxCount,
        all,

        increase,
        decrease,

        onClock,
    };
})
