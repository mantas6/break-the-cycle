import { expect, it, beforeEach } from 'vitest'
import {createPinia, defineStore, setActivePinia} from "pinia";
import {useActionsStore} from "@/stores/actions.js";
import {actionStores} from "@/plugins/actions.js";
import {computed, reactive} from "vue";
import {usePhysicalStore} from "@/stores/stats/physical.js";
import {Balance} from "@/stats/index.js";
import {useWalletStore} from "@/stores/stats/wallet.js";

const useTestStore = defineStore('test-action', () => {
    const title = computed(() => 'store');
    const durations = computed(() => [4, 8, 12]);

    function executeAction(count) {
        //
    }

    return {
        title,
        durations,

        executeAction,
    };
})


beforeEach(() => {
    const store = createPinia();
    setActivePinia(store)

    const action = useTestStore()
    actionStores.value.clear();
    actionStores.value.set(action.$id, action)

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
})