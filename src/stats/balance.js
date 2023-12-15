import { reactive } from "vue";
import {clamp} from "lodash/number";
import { assertStat } from '.'

export function create(now = 0, min = -1000, center = 0, max = 1000) {
    return reactive({
        type: 'balance',
        last: now,
        now,
        min,
        center,
        max,
    });
}

export function affect(stat, diff) {
    assert(stat);
    stat.now = clamp(stat.now + diff, stat.min, stat.max);
}

export function reserve(stat, diff) {
    assert(stat);

    if (stat.now + diff <= stat.min) {
        return stat.min - stat.now;
    }

    if (stat.now + diff >= stat.max) {
        return stat.max - stat.now;
    }

    return diff;
}

export function actualCenter(stat, minPercent = 0) {
    assert(stat);

    const nowNormalized = Math.abs(stat.now - stat.center)
    const boundNormalized = stat.now <= stat.center
        ? Math.abs(stat.min - stat.center)
        : Math.abs(stat.max - stat.center);

    return 1 - nowNormalized / boundNormalized;
}

function assert(stat) {
    assertStat(
        stat.type === 'balance',
        stat.last !== undefined,
        stat.now !== undefined,
        stat.min !== undefined,
        stat.center !== undefined,
        stat.max !== undefined,
    )
}