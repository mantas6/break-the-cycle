import { expect, it, beforeEach, afterEach, test } from 'vitest'
import {createPinia, defineStore, setActivePinia} from "pinia";
import {useActionsStore} from "@/stores/actions.js";
import {actionStores} from "@/plugins/actions.js";
import {computed, ref} from "vue";
import {clearHandlers, clockHandlers, runClock} from "@/routines/clock.js";
import {defineActionStore} from "@/stores/modules/actions";
import {useDeathStore} from "@/stores/death.js";

const options = {
    title: 'Test action',
    subcategory: 'Test subcategory',
    category: 'Category',
};

export const useActionA = defineActionStore(options, () => {
    const durations = computed(() => [4, 8, 12]);
    const unlocked = ref(true);

    const executions = ref(0);

    function executeAction(count) {
        executions.value += count;
    }

    return {
        durations,
        unlocked,

        executions,

        executeAction,
    };
})

export const useActionB = defineActionStore(options, () => {
    const unlocked = ref(true);

    function executeAction() {

    }

    return {
        unlocked,

        executeAction,
    };
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

    const action = useActionA()
    actionStores.value.set(action.$id, action)
}

beforeEach(() => {
    resetGlobals();
    setupStore();
})

afterEach(() => {
    resetGlobals();
})

actionsTest('initializes correctly using wrapper', ({ store }) => {
    expect(store.title).toBe(options.title)
    expect(store.subcategory).toBe(options.subcategory)
    expect(store.category).toBe(options.category)
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
    const useActionWithCanExecute = defineActionStore({ title: 'ActionWithCanExecute' }, () => {
        const unlocked = ref(true);
        const someCondition = ref(false);
        const canExecute = computed(() => someCondition.value);

        function executeAction(count) {

        }

        return {
            unlocked,
            someCondition,

            canExecute,

            executeAction,
        };
    })

    const store = useActionWithCanExecute();

    store.executeAction(1)
    expect(store.executionCount).toBeUndefined()

    store.someCondition = true;
    store.executeAction(1)
    expect(store.executionCount).toBe(1)
})

it.todo('test with plugins regarding the default durations value')
it.todo('test action unlocking')