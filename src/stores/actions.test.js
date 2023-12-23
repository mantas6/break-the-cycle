import { expect, it, beforeEach, afterEach } from 'vitest'
import {createPinia, defineStore, setActivePinia} from "pinia";
import {useActionsStore} from "@/stores/actions.js";
import {actionStores} from "@/plugins/actions.js";
import {computed, ref} from "vue";
import {clockHandlers, runClock} from "@/routines/clock.js";
import {defineActionStore} from "@/stores/modules/actions";

const options = {
    title: 'Test action',
    subcategory: 'Test subcategory',
    category: 'Category',
};

const useTestStore = defineActionStore(options, () => {
    const durations = computed(() => [4, 8, 12]);

    const executions = ref(0);

    function executeAction(count) {
        executions.value += count;
    }

    return {
        durations,

        executions,

        executeAction,
    };
})

function resetGlobals() {
    actionStores.value.clear();
    clockHandlers.onClock.length = 0;
    clockHandlers.beforeClock.length = 0;
}

beforeEach(() => {
    resetGlobals();

    const store = createPinia();
    setActivePinia(store)

    const action = useTestStore()
    actionStores.value.set(action.$id, action)

})

afterEach(() => {
    resetGlobals();
})

it('initializes correctly using wrapper', () => {
    const store = useTestStore();
    expect(store.title).toBe(options.title)
    expect(store.subcategory).toBe(options.subcategory)
    expect(store.category).toBe(options.category)
    expect(store.meta).toBeDefined()
})

it('correctly controls durations', () => {
    const actions = useActionsStore();
    const store = useTestStore()

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

it('executes actions correctly', () => {
    const actions = useActionsStore();
    const store = useTestStore()

    actions.increase(store.$id)

    runClock();
    expect(store.executions).toBe(4)

    actions.decrease(store.$id)
    runClock();
    expect(store.executions).toBe(4)
})

it.todo('test with plugins regarding the default durations value')