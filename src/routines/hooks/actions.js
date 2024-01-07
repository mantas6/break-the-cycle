import {max} from "lodash/math.js";
import {useActionsStore} from "@/stores/actions.js";
import {useDebugStore} from "@/stores/debug.js";

export function actionRevokeHook(actionStore) {
    if (!actionStore.revoked && actionStore.revokeWhen) {
        const nowRevoked = actionStore.revokeWhen();

        if (nowRevoked === true) {
            actionStore.revoked = true;
        }
    }
}

export function actionUnlockHook(actionStore) {
    if (!actionStore.revoked && !actionStore.unlocked && actionStore.unlockWhen) {
        const debug = useDebugStore();
        const nowUnlocked = debug.unlockAllActions ? true : actionStore.unlockWhen();

        // Ref might be mistakenly returned, so checking strictly
        if (nowUnlocked === true) {
            actionStore.unlocked = latestUnlockedNum() + 1;
            actionStore.notify = true;
        }
    }
}

function latestUnlockedNum() {
    const actions = useActionsStore();

    const nums = Object.values(actions.all)
        .map(action => action.unlocked)
        .filter(unlocked => unlocked)

    if (!nums.length) {
        return 0;
    }

    return max(nums);
}