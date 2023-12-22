import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { actionStores } from "@/plugins/actions.js";
import { storeName } from "@/stores";

export const useActionsStore = defineStore(storeName(import.meta.url), () => {
    const active = reactive({});

    const currentDuration = computed(() => {
        return Object.values(active).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    });

    const maxDuration = computed(() => 24);

    const all = computed(() => {
        const actions = {};

        for (const [ actionName, actionStore ] of actionStores.value.entries()) {
            actions[actionName] = {
                title: actionStore.title,
                duration: actionStore.duration,
                meta: actionStore.meta,
            };
        }

        return actions;
    });

    const allActive = computed(() => {
        const actions = {};

        for (const actionName of Object.keys(active)) {
            actions[actionName] = all.value[actionName];
        }

        return actions;
    });

    function canIncrease(name) {
        const nextDuration = getNextDuration(name);

        if (nextDuration === undefined) {
            return false;
        }

        const currentActionDuration = active[name] || 0;

        return currentDuration.value - currentActionDuration + nextDuration <= maxDuration.value;
    }

    function getNextDuration(name) {
        if (active[name] === undefined) {
            return all.value[name].duration[0];
        } else {
            const duration = all.value[name].duration;
            const idx = duration.indexOf(active[name]);

            return duration[idx + 1];
        }
    }

    function increase(name) {
        if (!canIncrease(name)) {
            return;
        }

        if (active[name] === undefined) {
            active[name] = all.value[name].duration[0];
        } else {
            const duration = all.value[name].duration;
            const idx = duration.indexOf(active[name])

            const nextDuration = duration[idx + 1]
            if (nextDuration !== undefined) {
                active[name] = nextDuration;
            }
        }
    }

    function decrease(name) {
        if (active[name] !== undefined) {
            const duration = all.value[name].duration;
            const idx = duration.indexOf(active[name])

            const nextDuration = duration[idx - 1]

            if (nextDuration !== undefined) {
                active[name] = nextDuration;
            } else {
                delete active[name];
            }
        }
    }

    function remove(name) {
        delete active[name];
    }

    function onClock() {
        for (const [ actionName, actionCount ] of Object.entries(active) ) {
            const action = actionStores.value.get(actionName);
            action.executeAction(actionCount);
        }
    }

    return {
        active,

        currentDuration,
        maxDuration,
        all,
        allActive,

        canIncrease,
        increase,
        decrease,
        remove,

        onClock,
    };
})
