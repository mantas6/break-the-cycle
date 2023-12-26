import {defineActionStore} from "@/stores/modules/actions";
import {beforeEach, expect, it} from "vitest";
import {createPinia, setActivePinia} from "pinia";
import {actionStores} from "@/plugins/actions.js";
import {useActionsStore} from "@/stores/actions.js";
import {ref} from "vue";
import {runClock} from "@/routines/clock";

const options = {
    title: 'Unlockable action',
    subcategory: 'Test subcategory',
    category: 'Category',
};

const useTestStore = defineActionStore(options, () => {
    const canBeUnlocked = ref(false);

    function executeAction(count) {

    }

    function beforeUnlock() {
        return canBeUnlocked.value;
    }

    return {
        canBeUnlocked,

        beforeUnlock,
        executeAction,
    };
})

beforeEach(() => {
    const store = createPinia();
    setActivePinia(store)

    const action = useTestStore()
    actionStores.value.set(action.$id, action)

})

it('unlocks actions correctly', () => {
    const actions = useActionsStore();
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

    actions.clearNotify(store.$id)
    expect(store.notify).toBeUndefined()
})