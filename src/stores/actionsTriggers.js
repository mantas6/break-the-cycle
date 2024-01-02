import {defineStore} from "pinia";
import {storeName} from "@/stores/index.js";
import {actionStores} from "@/plugins/actions.js";
import {head} from "lodash";
import {useLockTimeout} from "@/helpers/misc.js";

export const useActionsTriggersStore = defineStore(storeName('actions.triggers'), () => {
    const { start, locked } = useLockTimeout();

    function execute(name) {
        const action = actionStores.value.get(name);

        // Once actions do not have durations
        const minDuration = head(action.durations) || 1;

        const lockDuration = minDuration * 100;

        // TODO: add check if action is already running and maxed it's hours
        if (start(lockDuration)) {
            action.onExecute(minDuration);
        }
    }

    function clearNotify(name) {
        const action = actionStores.value.get(name);
        action.notify = undefined;
    }

    return {
        locked,

        execute,
        clearNotify,
    };
});
