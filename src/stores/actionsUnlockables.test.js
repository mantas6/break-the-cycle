import {defineActionStore} from "@/stores/modules/actions";
import {beforeEach, expect, it} from "vitest";
import {createPinia, setActivePinia} from "pinia";
import {actionStores} from "@/plugins/actions.js";
import {useActionsStore} from "@/stores/actions.js";

const options = {
    title: 'Unlockable action',
    subcategory: 'Test subcategory',
    category: 'Category',
};

const useTestStore = defineActionStore(options, () => {
    function executeAction(count) {
    }

    return {
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
})