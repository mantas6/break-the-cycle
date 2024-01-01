import {getCurrentContext} from "@/helpers/actions/definition/context.js";

/**
 * @callback ActionExecutionFunction
 * @param {number} count - Count in hours to be executed
 */

/**
 * @desc Action execution callback
 * @param {ActionExecutionFunction} cb
 * @return {void}
 */
export function executeAction(cb) {
    const { store } = getCurrentContext();
    store.executeAction = count => {
        if (!store.canExecute.value) {
            return;
        }

        cb(count);

        if (store.executionCount.value) {
            store.executionCount.value += count;
        } else {
            store.executionCount.value = count;
        }
    };
}

export function canExecute(cb) {
    getCurrentContext().store.canExecute = cb;
}