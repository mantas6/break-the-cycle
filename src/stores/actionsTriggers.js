import {defineStore} from "pinia";
import {storeName} from "@/stores/index.js";
import {actionStores} from "@/plugins/actions.js";
import {head} from "lodash";
import {computedWritable} from "@/stats/computed.js";
import {afterClock} from "@/routines/clock";

export const useActionsTriggersStore = defineStore(storeName('actions-triggers'), () => {
    const locked = computedWritable(false);

    function execute(name) {
        if (locked.value) {
            return;
        }
        const action = actionStores.value.get(name);
        const minDuration = head(action.durations);

        action.executeAction(minDuration);
        locked.value = true;
    }

    function clearNotify(name) {
        const action = actionStores.value.get(name);
        action.notify = undefined;
    }

    afterClock(() => {
        locked.value = false;
    })

    return {
        locked,

        execute,
        clearNotify,
    };
});
