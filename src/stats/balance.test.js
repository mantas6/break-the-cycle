import { expect, it } from 'vitest'
import { reactive } from "vue";

import { create, affect, reserve } from './balance';

function createBasicStat() {
    return create(0, -100, 0, 100);
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

    const result = affect(stat, 25);
    expect(result).toBeUndefined()
    expect(stat.now).toBe(25)

    affect(stat, 100);
    expect(stat.now).toBe(100)

    affect(stat, -200);
    expect(stat.now).toBe(-100)
})

it('returns correct reservation values with lower bounds', () => {
    const stat = createBasicStat();

    expect(reserve(stat, -50)).toBe(-50)
    expect(reserve(stat, -125)).toBe(-100)
})

it('returns correct reservation values with upper bounds', () => {
    const stat = createBasicStat();

    expect(reserve(stat, 50)).toBe(50)
    expect(reserve(stat, 125)).toBe(100)
})

it('is stat assertion working correctly', () => {
    const expectedError = 'Incorrect value object given';

    const stat = reactive({ type: 'unknown' });

    expect(() => reserve(stat, 1)).toThrowError(expectedError)
    expect(() => affect(stat, 1)).toThrowError(expectedError)

    const statMashed = reactive({ type: 'balance', value: 20 });

    expect(() => affect(statMashed, 1)).toThrowError(expectedError)
})