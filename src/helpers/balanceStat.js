import { reactive } from "vue";
import {clamp} from "lodash/number";

export function createBalanceStat(now = 0, min = -1000, center = 0, max = 1000) {
    return reactive({
        type: 'balance',
        last: now,
        now,
        min,
        center,
        max,
    });
}

export function affectBalanceStat(stat, diff) {
    assertStat(stat);
    stat.now = clamp(stat.now + diff, stat.min, stat.max);
}

export function reserveBalanceStat(stat, diff) {
    assertStat(stat);

    if (stat.now + diff <= stat.min) {
        return stat.min - stat.now;
    }

    if (stat.now + diff >= stat.max) {
        return stat.max - stat.now;
    }

    return diff;
}

export function assertStat(stat) {
    const isCorrect = stat.type === 'balance'
        && stat.last !== undefined
        && stat.now !== undefined
        && stat.min !== undefined
        && stat.center !== undefined
        && stat.max !== undefined;

    if (!isCorrect && !import.meta.env.PROD) {
        throw new Error('Incorrect value object given');
    }
}