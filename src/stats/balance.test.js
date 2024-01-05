import { expect, it } from 'vitest'
import { reactive } from "vue";

import { create, affect, reserve, actualCenter } from './balance';
import {Balance} from "@/stats/index.js";

function createBasicStat() {
    return create({ min: -100, max: 100 });
}

it('initializes as expected', () => {
    const stat = createBasicStat();

    expect(stat.type).toBe('balance')
    expect(stat.now).toBe(0)

    expect(stat).toHaveProperty('now')
    expect(stat).toHaveProperty('min')
    expect(stat).toHaveProperty('max')
    expect(stat).toHaveProperty('gain')
    expect(stat).toHaveProperty('loss')
})

it('assigns center correctly', () => {
    expect(create({ min: -100, max: 100 }).center).toBe(0)
    expect(create({ min: 0, max: 100 }).center).toBe(50)
    expect(create({ min: -100, max: 0 }).center).toBe(-50)
    expect(create({ min: -100, max: -50 }).center).toBe(-75)
})

it('calculates gain and loss correctly', () => {
    const stat = createBasicStat();

    Balance.affect(stat, 50)
    expect(stat._gain).toBe(50)
    expect(stat._loss).toBe(0)

    Balance.affect(stat, -50)
    expect(stat._gain).toBe(50)
    expect(stat._loss).toBe(50)
})

it('calculates gain and loss even when out of bounds', () => {
    const stat = create({ min: 0, max: 100, now: 100 })

    Balance.affect(stat, 50)
    expect(stat._gain).toBe(50)

    stat.now = 0;
    Balance.affect(stat, -50)
    expect(stat._loss).toBe(50)
});

it('clamps correctly to bounds', () => {
    const stat = createBasicStat();

    const result = affect(stat, 25);
    expect(result).toBeUndefined()
    expect(stat.now).toBe(25)

    affect(stat, 100);
    expect(stat.now).toBe(100)

    affect(stat, -200);
    expect(stat.now).toBe(-100)

    affect(stat, 5);
    affect(stat, -10);
    expect(stat.now).toBe(-100)
})

it('clamps correctly to bounds if stat has zero min', () => {
    const stat = create({ min: 0, max: 100, center: 5 });

    Balance.affect(stat, -10);
    expect(stat.now).toBe(0)
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
    const stat = create({ min: 0, max: 100 });

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

it('correctly calculates percentage value', () => {
    let stat = create({ min: -100, max: 100 });

    expect(Balance.percentage(stat)).toBe(0.5)

    stat.now = -50
    expect(Balance.percentage(stat)).toBe(0.25)

    stat.now = -100
    expect(Balance.percentage(stat)).toBe(0)

    stat.now = 50
    expect(Balance.percentage(stat)).toBe(0.75)

    stat.now = 100
    expect(Balance.percentage(stat)).toBe(1)

    stat = create({ min: 0, max: 100 });

    expect(Balance.percentage(stat)).toBe(0.5)

    stat.now = 0;
    expect(Balance.percentage(stat)).toBe(0)

    stat.now = 50;
    expect(Balance.percentage(stat)).toBe(0.5)

    stat.now = 100;
    expect(Balance.percentage(stat)).toBe(1)

    stat = create({ min: 50, max: 100 });

    expect(Balance.percentage(stat)).toBe(0.5)

    stat.now = 50;
    expect(Balance.percentage(stat)).toBe(0)

    stat.now = 100;
    expect(Balance.percentage(stat)).toBe(1)
})

it('correctly calculates percentage value with bound overrides', () => {
    let stat = create({ min: 0, max: 100 });

    expect(Balance.percentage(stat, 0.25, 0.75)).toBe(0.5)

    stat.now = 10
    expect(Balance.percentage(stat, 0.25, 0.75)).toBe(0)

    stat.now = 25
    expect(Balance.percentage(stat, 0.25, 0.75)).toBe(0)

    stat.now = 75
    expect(Balance.percentage(stat, 0.25, 0.75)).toBe(1)

    stat.now = 90
    expect(Balance.percentage(stat, 0.25, 0.75)).toBe(1)

    stat = createBasicStat()

    expect(Balance.percentage(stat, 0.25, 0.75)).toBe(0.5)

    stat.now = -25
    expect(Balance.percentage(stat, 0.25, 0.75)).toBe(0.25)

    stat.now = -50
    expect(Balance.percentage(stat, 0.25, 0.75)).toBe(0)

    stat.now = -75
    expect(Balance.percentage(stat, 0.25, 0.75)).toBe(0)

    stat.now = 25
    expect(Balance.percentage(stat, 0.25, 0.75)).toBe(0.75)

    stat.now = 50
    expect(Balance.percentage(stat, 0.25, 0.75)).toBe(1)

    stat.now = 100
    expect(Balance.percentage(stat, 0.25, 0.75)).toBe(1)
});

it('correctly limits maximum value with upperLimit parameter', () => {
    const stat = create({ min: 0, max: 100, now: 0, upperLimit: 75 });

    expect(Balance.reserve(stat, 100)).toBe(75)

    Balance.affect(stat, 100)
    expect(stat.now).toBe(75)

    Balance.affectUpperLimit(stat, -1)
    expect(stat.now).toBe(74)
})