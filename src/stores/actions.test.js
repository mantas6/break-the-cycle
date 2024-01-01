import { expect, it, beforeEach, afterEach, test } from 'vitest'
import {createPinia, defineStore, setActivePinia} from "pinia";
import {useActionsStore} from "@/stores/actions.js";
import {actionStores} from "@/plugins/actions.js";
import {computed, nextTick, ref} from "vue";
import {clearHandlers, clockHandlers, runClock} from "@/routines/clock.js";

import {useDeathStore} from "@/stores/death.js";
import {defineAction} from "@/helpers/actions/definition/index.js";
import {unlockWhen, defineRaw, defineRef} from "@/helpers/actions/definition/hooks.js";
import {canExecute, onExecute} from "@/helpers/actions/definition/execution.js";

const titles = {
    title: 'Test action',
    subcategory: 'Test subcategory',
    category: 'Category',
    description: '',
};

export const useActionA = defineAction(titles, () => {
    defineRaw('durations', [4, 8, 12]);
    defineRaw('unlocked', true);

    const executions = defineRef('executions', 0)

    onExecute(count => executions.value += count)
})

export const useActionB = defineAction({ title: 'ActionB' }, () => {
    defineRaw('unlocked', true);

    defineRef('executions', 0)

    onExecute(() => {})
})

const actionsTest = test.extend({
    store: async ({}, use) => await use(useActionA()),
    actions: async ({}, use) => await use(useActionsStore()),
})

export function resetGlobals() {
    actionStores.value.clear();
    clearHandlers();
}

export function setupStore() {
    const store = createPinia();
    setActivePinia(store)

    const actionA = useActionA()
    actionStores.value.set(actionA.$id, actionA)

    const actionB = useActionB()
    actionStores.value.set(actionB.$id, actionB)
}

beforeEach(() => {
    resetGlobals();
    setupStore();
})

afterEach(() => {
    resetGlobals();
})

actionsTest('initializes correctly using wrapper', ({ store }) => {
    expect(store.title).toBe(titles.title)
    expect(store.subcategory).toBe(titles.subcategory)
    expect(store.category).toBe(titles.category)
    expect(store.eff).toBeDefined()
})

actionsTest('correctly controls durations', ({ store, actions }) => {
    expect(actions.currentDuration).toBe(0)
    expect(actions.maxDuration).toBe(24)

    expect(actions.all).toHaveProperty(store.$id)
    expect(actions.allActive).not.toHaveProperty(store.$id)

    actions.increase(store.$id)
    expect(actions.currentDuration).toBe(4)
    expect(actions.canIncrease(store.$id)).toBe(true)

    expect(actions.allActive).toHaveProperty(store.$id)

    actions.increase(store.$id)
    expect(actions.currentDuration).toBe(8)
    expect(actions.canIncrease(store.$id)).toBe(true)

    actions.increase(store.$id)
    expect(actions.currentDuration).toBe(12)
    expect(actions.canIncrease(store.$id)).toBe(false)

    actions.decrease(store.$id)
    expect(actions.currentDuration).toBe(8)
    expect(actions.canIncrease(store.$id)).toBe(true)

    actions.decrease(store.$id)
    actions.decrease(store.$id)
    expect(actions.currentDuration).toBe(0);
    expect(actions.allActive).not.toHaveProperty(store.$id)

    actions.increase(store.$id)
    actions.remove(store.$id);
    expect(actions.currentDuration).toBe(0);
    expect(actions.allActive).not.toHaveProperty(store.$id)
})

actionsTest('executes actions correctly', ({ store, actions }) => {
    actions.increase(store.$id)

    runClock();
    expect(store.executions).toBe(4)
    expect(store.executionCount).toBe(4)

    actions.decrease(store.$id)
    runClock();
    expect(store.executions).toBe(4)
    expect(store.executionCount).toBe(4)
})

actionsTest('correctly manages revoked actions', ({ actions, store }) => {
    actions.increase(store.$id)

    store.revoked = true;
    expect(actions.all).not.toHaveProperty(store.$id)

    runClock();

    expect(store.executions).toBe(0)

})

actionsTest('correctly sets action count when increaseToMax is used', ({ actions, store }) => {
    actions.increaseToMax(store.$id);
    expect(actions.currentDuration).toBe(12)
})

actionsTest('actions are not executed when not alive', ({ actions, store }) => {
    actions.increase(store.$id);

    const death = useDeathStore();
    death.setDead('Test');

    runClock();
    expect(store.executions).toBe(0)
})

actionsTest('actions is not executed and removed from the stack when revoked', ({ actions, store }) => {
    actions.increase(store.$id);

    store.revoked = true;

    runClock();

    expect(store.executions).toBe(0)
    expect(actions.currentDuration).toBe(0)
    expect(actions.active).not.toHaveProperty(store.$id)
})

actionsTest('does not execute when canExecute is false', () => {
    const useActionWithCanExecute = defineAction({ title: 'ActionWithCanExecute' }, () => {
        defineRaw('unlocked', true);
        const someCondition = defineRef('someCondition', false)

        canExecute(() => someCondition.value);
        onExecute(() => {})
    });

    const store = useActionWithCanExecute();

    store.onExecute(1)
    expect(store.executionCount).toBeUndefined()

    store.someCondition = true;
    store.onExecute(1)
    expect(store.executionCount).toBe(1)
})

actionsTest('unlocking triggers correctly', ({ actions }) => {
    const useAction = defineAction({ title: 'LockedAction' }, () => {
        const someCondition = defineRef('someCondition', false)

        unlockWhen(() => someCondition.value)
        onExecute(() => {})
    })

    const action = useAction();

    actionStores.value.set(action.$id, action)

    runClock();
    expect(action.unlocked).toBeUndefined()
    expect(actions.all).not.toHaveProperty(action.$id)

    action.someCondition = true;

    runClock();
    expect(action.unlocked).toBeDefined()
    expect(actions.all).toHaveProperty(action.$id)
})

it.todo('test with plugins regarding the default durations value')
it.todo('test canExecute if baseBalance is provided')