import {defineStore} from "pinia";
import {storeName} from "@/stores/index.js";
import {useUnlockStore} from "@/stores/unlock.js";
import {computedWritable} from "@/helpers/computed.js";

export const useDebugStore = defineStore(storeName('debug'), () => {
    const unlock = useUnlockStore();

    const unlockAllActions = computedWritable(false);

    function unlockAll() {
        const unlocks = Object.keys(unlock)

        unlocks.forEach(name => {
            if (unlock[name] === undefined) {
                unlock[name] = true
            }
        })
    }

    function $resetToo() {
        unlockAllActions.value = false;
    }

    return {
        unlockAllActions,

        unlockAll,

        $resetToo,
    };
});