import { expect, test, it } from 'vitest'

import { createBalanceStat, affectBalanceStat, reserveBalanceStat } from './balanceStat';
import {reactive} from "vue";

function createBasicStat() {
    return createBalanceStat(0, -100, 0, 100);
}

it('initializes as expected', () => {
    const stat = createBasicStat();

    expect(stat.type).toBe('balance')
    expect(stat.now).toBe(0)

    expect(stat).toHaveProperty('now')
    expect(stat).toHaveProperty('min')
    expect(stat).toHaveProperty('max')
    expect(stat).toHaveProperty('last')
})

it('clamps correctly to bounds', () => {
    const stat = createBasicStat();

    const result = affectBalanceStat(stat, 25);
    expect(result).toBeUndefined()
    expect(stat.now).toBe(25)

    affectBalanceStat(stat, 100);
    expect(stat.now).toBe(100)

    affectBalanceStat(stat, -200);
    expect(stat.now).toBe(-100)
})

it('returns correct reservation values with lower bounds', () => {
    const stat = createBasicStat();

    const reservedInBounds = reserveBalanceStat(stat, -50);
    expect(reservedInBounds).toBe(-50)

    const reservedOutOfBounds = reserveBalanceStat(stat, -125);
    expect(reservedOutOfBounds).toBe(-100)
})

it('returns correct reservation values with upper bounds', () => {
    const stat = createBasicStat();

    const reservedInBounds = reserveBalanceStat(stat, 50);
    expect(reservedInBounds).toBe(50)

    const reservedOutOfBounds = reserveBalanceStat(stat, 125);
    expect(reservedOutOfBounds).toBe(100)
})

it('is stat assertion working correctly', () => {
    const expectedError = 'Incorrect value object given';

    const stat = reactive({ type: 'unknown' });

    expect(() => reserveBalanceStat(stat, 1))
        .toThrowError(expectedError)

    expect(() => affectBalanceStat(stat, 1))
        .toThrowError(expectedError)

    const statMashed = reactive({ type: 'balance', value: 20 });

    expect(() => affectBalanceStat(stat, 1))
        .toThrowError(expectedError)
})