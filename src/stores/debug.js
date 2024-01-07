import {defineStore} from "pinia";
import {storeName} from "@/stores/index.js";
import {useUnlockStore} from "@/stores/unlock.js";
import {computedWritable} from "@/helpers/computed.js";

export const useDebugStore = defineStore(storeName('debug'), () => {
    const unlock = useUnlockStore();

    const unlockAllActions = computedWritable(false);

    function unlockAll() {
        unlock.balance = true;
        unlock.categories = true;
        unlock.planner = true;
        unlock.hold = true;
        unlock.physical = true;
        unlock.nutrition = true;
    }

    function $reset() {
        unlockAllActions.value = false;
    }

    return {
        unlockAllActions,

        unlockAll,

        $reset,
    };
});