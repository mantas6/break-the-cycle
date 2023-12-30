import {afterEach, beforeEach, expect, test, describe} from "vitest";
import {resetGlobals, setupStore, useActionA, useActionB} from "@/stores/actions.test.js";
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
    actionA: async ({}, use) => await use(useActionA()),
    actionB: async ({}, use) => await use(useActionB()),
    actions: async ({}, use) => await use(useActionsStore()),
    hold: async ({}, use) => await use(useActionsHoldStore()),
})

function unlockHold() {
    const unlock = useUnlockStore();
    unlock.hold = true;
}

holdTest('hold can not be executed before unlocking', ({ hold, actionA }) => {
    hold.enable(actionA.$id);
    runClock();

    expect(actionA.executionCount).toBeUndefined()

    unlockHold();

    runClock(); // Debounce
    runClock();
    expect(actionA.executionCount).toBe(12)
})

describe('normal hold conditions', () => {
    beforeEach(() => unlockHold());

    holdTest('holding is debounced', ({ hold, actionA }) => {
        expect(hold.debounced).toBe(false)

        hold.enable(actionA.$id);

        runClock();
        expect(hold.debounced).toBe(true)
        expect(actionA.executionCount).toBeUndefined()

        runClock();
        expect(actionA.executionCount).toBe(12)
    })

    holdTest('hold func does not overlap if action is already planned', ({ actions, hold, actionA }) => {
        actions.increase(actionA.$id)
        hold.enable(actionA.$id, true)

        runClock();
        expect(actionA.executionCount).toBe(12)

        actionA.executionCount = 0;
        actions.increaseToMax(actionA.$id)
        hold.enable(actionA.$id, true)

        runClock();
        expect(actionA.executionCount).toBe(12)
    })

    holdTest('hold func does not overlap if total planner time is used', ({ actions, hold, actionA, actionB }) => {
        actions.increaseToMax(actionA.$id)
        hold.enable(actionB.$id, true)

        runClock();

        expect(actionA.executionCount).toBe(12)
        expect(actionB.executionCount).toBe(12)
    })
})