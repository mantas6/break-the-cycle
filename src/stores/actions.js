import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { actionStores } from "@/plugins/actions.js";
import { storeName } from "@/stores";
import { onClock } from "@/routines/clock";
import {range} from "lodash/util";
import {head} from "lodash/array.js";
import {max} from "lodash/math.js";
import {filter, orderBy, sortBy} from "lodash/collection.js";
import {transform} from "lodash/object.js";
import {useDeathStore} from "@/stores/death.js";

export const useActionsStore = defineStore(storeName('actions'), () => {
    const death = useDeathStore();

    const active = reactive({});

    const currentDuration = computed(() => {
        return Object.values(active).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    });

    const maxDuration = computed(() => 24);

    const ordered = computed(() => {
        const predicate = ([ _, action ]) => action.unlocked && !action.revoked;
        const unlocked = filter([ ...actionStores.value.entries() ], predicate);

        return sortBy(unlocked, ([ _, action ]) => action.unlocked);
    });

    const all = computed(() => {
        const actions = {};

        for (const [ actionName, actionStore ] of ordered.value) {
            const expose = {};

            Object.keys(actionStore)
                .filter(key => !key.startsWith('$') && !key.startsWith('_'))
                .forEach(key => expose[key] = actionStore[key])

            actions[actionName] = expose;
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
            return all.value[name].durations[0];
        } else {
            const action = all.value[name];

            if (action === undefined) {
                return false;
            }

            const durations = all.value[name].durations;
            const idx = durations.indexOf(active[name]);

            return durations[idx + 1];
        }
    }

    function increaseToMax(name) {
        for (const _ of range(1, 13)) {
            if (!canIncrease(name)) {
                return;
            }

            const nextDuration = getNextDuration(name);

            if (nextDuration === undefined) {
                return;
            }

            increase(name);
        }
    }



    function increase(name) {
        if (!canIncrease(name)) {
            return;
        }

        const nextDuration = getNextDuration(name);

        if (nextDuration !== undefined) {
            active[name] = nextDuration;
        }
    }

    function decrease(name) {
        if (active[name] !== undefined) {
            const durations = all.value[name].durations;
            const idx = durations.indexOf(active[name])

            const nextDuration = durations[idx - 1]

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

    function $reset() {
        for (const key of Object.keys(active)) {
            delete active[key];
        }
    }

    // Should be an external method?
    function latestUnlockedNum() {
        const nums = Object.values(all.value)
            .map(action => action.unlocked)
            .filter(unlocked => unlocked)

        if (!nums.length) {
            return 0;
        }

        return max(nums);
    }

    onClock(() => {
        if (!death.alive) {
            return;
        }

        // Active action processing
        for (const [ actionName, actionCount ] of Object.entries(active) ) {
            const action = actionStores.value.get(actionName);

            if (action.revoked) {
                // If action was revoked - auto remove from planner
                remove(actionName);
                continue;
            }

            action.executeAction(actionCount);
        }

        // Action unlocking
        for (const actionStore of actionStores.value.values()) {
            if (!actionStore.unlocked && actionStore.beforeUnlock) {
                const nowUnlocked = actionStore.beforeUnlock();

                // Ref might be mistakenly returned, so checking strictly
                if (nowUnlocked === true) {
                    actionStore.unlocked = latestUnlockedNum() + 1;
                    actionStore.notify = true;
                }
            }
        }
    })

    return {
        active,

        currentDuration,
        maxDuration,
        all,
        allActive,

        canIncrease,
        increaseToMax,
        increase,
        decrease,
        remove,

        $reset,
    };
})
