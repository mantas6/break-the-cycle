import {getCurrentContext} from "@/helpers/actions/definition/context.js";
import {computed} from "vue";
import {setActionContext} from "@/helpers/actions/context.js";

/**
 * @callback ActionExecutionFunction
 * @param {number} count - Count in hours to be executed
 */

/**
 * @desc Action execution callback
 * @param {ActionExecutionFunction} cb
 * @return {void}
 */
export function onExecute(cb) {
    const { store } = getCurrentContext();
    store.onExecute = count => {
        if (!store.canExecute.value) {
            return;
        }

        setActionContext({ store, count });

        cb(count);

        if (store.executionCount.value) {
            store.executionCount.value += count;
        } else {
            store.executionCount.value = count;
        }
    };
}

export function canExecute(cb) {
    getCurrentContext().store.canExecute = computed(cb);
}