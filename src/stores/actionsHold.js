import {defineStore} from "pinia";
import {storeName} from "@/stores/index.js";
import {actionStores} from "@/plugins/actions.js";
import {onClock} from "@/routines/clock.js";
import {last} from "lodash";
import {computedWritable} from "@/helpers/computed.js";
import {useUnlockStore} from "@/stores/unlock.js";
import {useActionsStore} from "@/stores/actions.js";
import {computed} from "vue";

export const useActionsHoldStore = defineStore(storeName('actions.hold'), () => {
    const actionName = computedWritable(null);

    const maxDuration = computed(() => 24);

    const unlock = useUnlockStore();
    const actions = useActionsStore();

    function enable(name) {
        actionName.value = name;
    }

    function disable() {
        actionName.value = null;
    }

    onClock(() => {
        if (!actionName.value || !unlock.hold) {
            return;
        }

        const action = actionStores.value.get(actionName.value);

        if (!action.canExecute) {
            return;
        }

        const availableHours = maxDuration.value - actions.currentDuration;
        const availableDurations = action.durations.filter(duration => duration <= availableHours);

        const duration = last(availableDurations);

        if (duration !== undefined) {
            action.executeAction(duration);
        }
    })

    return {
        // For some reason crashes if returned
        // actionName,

        maxDuration,

        enable,
        disable,
    };
});
