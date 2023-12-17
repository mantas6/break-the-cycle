import { reactive } from "vue";
import {clamp} from "lodash/number";
import { assertStat } from '.'

export function create(min = -1000, max = 1000, now, center) {
    if (center === undefined) {
        center = (min + max) / 2;
    }

    if (now === undefined) {
        now = center;
    }

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

export function actualCenter(stat, startPercent = 0) {
    assert(stat);

    let nowNormalized = Math.abs(stat.now - stat.center)
    let boundNormalized = stat.now <= stat.center
        ? Math.abs(stat.min - stat.center)
        : Math.abs(stat.max - stat.center);

    if (startPercent) {
        const subAmount = boundNormalized * startPercent;
        nowNormalized = Math.max(nowNormalized - subAmount, 0);
        boundNormalized -= subAmount;
    }

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