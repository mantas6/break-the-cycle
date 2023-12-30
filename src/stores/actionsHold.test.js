import {afterEach, beforeEach, expect, test} from "vitest";
import {resetGlobals, setupStore, useTestStore} from "@/stores/actions.test.js";
import {useActionsStore} from "@/stores/actions.js";
import {useActionsHoldStore} from "@/stores/actionsHold.js";
import {runClock} from "@/routines/clock.js";
import {useUnlockStore} from "@/stores/unlock.js";

beforeEach(() => {
    resetGlobals();
    setupStore();
})

afterEach(() => resetGlobals());

const holdTest = test.extend({
    actionA: async ({}, use) => await use(useTestStore()),
    actions: async ({}, use) => await use(useActionsStore()),
    hold: async ({}, use) => await use(useActionsHoldStore()),
})

holdTest('hold can not be executed before unlocking', ({ hold, actionA }) => {
    hold.enable(actionA.$id);
    runClock();

    expect(actionA.executionCount).toBeUndefined()
    expect(hold.debounced).toBe(false)

    const unlock = useUnlockStore();
    unlock.hold = true;

    runClock(); // Debounce

    expect(hold.debounced).toBe(true)

    runClock();
    expect(actionA.executionCount).toBe(12)
})
