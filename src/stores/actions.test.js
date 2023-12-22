import { expect, it, beforeEach } from 'vitest'
import {createPinia, setActivePinia} from "pinia";
import {useActionsStore} from "@/stores/actions.js";
import useJanitorStore from "@/stores/modules/actions/jobs/janitor";
import {actionStores} from "@/plugins/actions.js";

beforeEach(() => {
    const store = createPinia();
    setActivePinia(store)

    const janitor = useJanitorStore()
    actionStores.value.clear();
    actionStores.value.set(janitor.$id, janitor)

})

it('correctly controls durations', () => {
    const store = useActionsStore();
    const janitor = useJanitorStore()

    expect(store.currentDuration).toBe(0)
    expect(store.maxDuration).toBe(24)


    expect(store.all).toHaveProperty(janitor.$id)
    expect(store.allActive).not.toHaveProperty(janitor.$id)

    store.increase(janitor.$id)
    expect(store.currentDuration).toBe(4)
    expect(store.canIncrease(janitor.$id)).toBe(true)

    expect(store.allActive).toHaveProperty(janitor.$id)

    store.increase(janitor.$id)
    expect(store.currentDuration).toBe(8)
    expect(store.canIncrease(janitor.$id)).toBe(true)

    store.increase(janitor.$id)
    expect(store.currentDuration).toBe(12)
    expect(store.canIncrease(janitor.$id)).toBe(false)
})