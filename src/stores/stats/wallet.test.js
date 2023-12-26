import {beforeEach, expect, it} from 'vitest'
import {useWalletStore} from "@/stores/stats/wallet.js";
import {createPinia, setActivePinia} from "pinia";

beforeEach(() => {
    const store = createPinia();
    setActivePinia(store)
})

it('mutates balance on transaction', () => {
    const wallet = useWalletStore();

    const result = wallet.transaction(5);
    expect(result).toBeUndefined()
    expect(wallet.balance.now).toBe(5);
})

it('does not allow balance to go below zero', () => {
    const wallet = useWalletStore();

    wallet.transaction(5);

    expect(wallet.preTransaction(-10)).toBe(-5)
    expect(wallet.preTransaction(-5)).toBe(-5)
})

it('correctly responds to the minBalance parameter', () => {
    const wallet = useWalletStore();

    wallet.transaction(5);

    expect(wallet.preTransaction(-10, 10)).toBe(0)
    expect(wallet.preTransaction(-10, -10)).toBe(0)
    expect(wallet.preTransaction(-10, 5)).toBe(-5)
    expect(wallet.preTransaction(-10, -5)).toBe(-5)
})