import {it, beforeEach, expect} from "vitest";
import {useWalletStore} from "@/stores/stats/wallet.js";
import {createPinia, setActivePinia} from "pinia";
import {requireCost} from "@/helpers/actions/index.js";

beforeEach(() => {
    const store = createPinia();
    setActivePinia(store)
})

it('creates a correct require cost computed', () => {
    const wallet = useWalletStore();

    const canExecute = requireCost(-10);

    expect(canExecute.value).toBe(false)

    wallet.transaction(5)
    expect(canExecute.value).toBe(false)

    wallet.transaction(10)
    expect(canExecute.value).toBe(true)
})