import {beforeEach, expect, it} from "vitest";
import {createPinia, setActivePinia} from "pinia";
import {actionStores} from "@/plugins/actions.js";
import {useActionsStore} from "@/stores/actions.js";
import {ref} from "vue";
import {runClock} from "@/routines/clock";
import {useActionsTriggersStore} from "@/stores/actionsTriggers.js";
import {defineAction} from "@/helpers/actions/definition/index.js";
import {unlockWhen, defineRef} from "@/helpers/actions/definition/hooks.js";
import {onExecute} from "@/helpers/actions/definition/execution.js";

const titles = {
    title: 'Unlockable action',
    subcategory: 'Test subcategory',
    category: 'Category',
};

const useTestStore = defineAction(titles, () => {
    const canBeUnlocked = defineRef('canBeUnlocked', false)
    onExecute(() => {})
    unlockWhen(() => canBeUnlocked.value)
});

beforeEach(() => {
    const store = createPinia();
    setActivePinia(store)

    const action = useTestStore()
    actionStores.value.set(action.$id, action)

})

it('unlocks actions correctly', () => {
    const actions = useActionsStore();
    const triggers = useActionsTriggersStore();
    const store = useTestStore()

    expect(actions.all).not.toHaveProperty(store.$id)

    runClock();
    expect(actions.all).not.toHaveProperty(store.$id)
    expect(store.notify).toBeUndefined()

    store.canBeUnlocked = true;
    runClock();
    expect(store.unlocked).toBe(1)
    expect(actions.all).toHaveProperty(store.$id)
    expect(store.notify).toBe(true)

    triggers.clearNotify(store.$id)
    expect(store.notify).toBeUndefined()
})