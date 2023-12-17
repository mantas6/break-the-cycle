import { expect, it } from 'vitest'
import { reactive } from "vue";

import { create, affect, reserve, actualCenter } from './balance';

function createBasicStat() {
    return create(-100, 100);
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

it('assigns center correctly', () => {
    expect(create(-100, 100).center).toBe(0)
    expect(create(0, 100).center).toBe(50)
    expect(create(-100, 0).center).toBe(-50)
    expect(create(-100, -50).center).toBe(-75)
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


    stat.now = 90;
    expect(reserve(stat, 10)).toBe(10)
    expect(reserve(stat, 20)).toBe(10)

    stat.now = 100;
    expect(reserve(stat, 10)).toBe(0)
})

it('is stat assertion working correctly', () => {
    const expectedError = 'Incorrect value object given';

    const stat = reactive({ type: 'unknown' });

    expect(() => reserve(stat, 1)).toThrowError(expectedError)
    expect(() => affect(stat, 1)).toThrowError(expectedError)

    const statMashed = reactive({ type: 'balance', value: 20 });

    expect(() => affect(statMashed, 1)).toThrowError(expectedError)
})

it('actual center behaves with default center', () => {
    const stat = createBasicStat();

    expect(actualCenter(stat)).toBe(1)

    affect(stat, -25)
    expect(actualCenter(stat)).toBe(0.75)

    affect(stat, -75)
    expect(actualCenter(stat)).toBe(0)

    affect(stat, 125)
    expect(actualCenter(stat)).toBe(0.75)

    affect(stat, 75)
    expect(actualCenter(stat)).toBe(0)
})

it('actual center behaves with offset center', () => {
    const stat = create(0, 100);

    expect(actualCenter(stat)).toBe(1)

    stat.now = 0;
    expect(actualCenter(stat)).toBe(0)

    stat.now = 25;
    expect(actualCenter(stat)).toBe(0.5)

    stat.now = 50;
    expect(actualCenter(stat)).toBe(1)

    stat.now = 75;
    expect(actualCenter(stat)).toBe(0.5)

    stat.now = 100;
    expect(actualCenter(stat)).toBe(0)
});

it('behaves correctly when using actualCenter with startPercent', () => {
    const stat = createBasicStat();

    const startPercent = 0.5;

    expect(actualCenter(stat, startPercent)).toBe(1)

    affect(stat, 25) // 25
    expect(actualCenter(stat, startPercent)).toBe(1)

    affect(stat, 25) // 50
    expect(actualCenter(stat, startPercent)).toBe(1)

    affect(stat, 25) // 75
    expect(actualCenter(stat, startPercent)).toBe(0.5)

    affect(stat, 25) // 100
    expect(actualCenter(stat, startPercent)).toBe(0)

    affect(stat, -125) // -25
    expect(actualCenter(stat, startPercent)).toBe(1)

    affect(stat, -25) // -50
    expect(actualCenter(stat, startPercent)).toBe(1)

    affect(stat, -25) // -75
    expect(actualCenter(stat, startPercent)).toBe(0.5)

    affect(stat, -25) // -100
    expect(actualCenter(stat, startPercent)).toBe(0)
})