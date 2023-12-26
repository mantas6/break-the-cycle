import { reactive } from "vue";
import {clamp} from "lodash/number";
import { assertStat } from '.'
import {percentageBetween} from "@/helpers/math";

export function create(min = -1000, max = 1000, now, center) {
    if (center === undefined) {
        center = (min + max) / 2;
    }

    if (now === undefined) {
        now = center;
    }

    return reactive({
        type: 'balance',
        _gain: 0, // Internal
        _loss: 0, // ...
        gain: 0, // Used for calculations
        loss: 0, // ...
        now,
        min,
        center,
        max,
    });
}

export function affect(stat, diff) {
    assert(stat);
    stat.now = clamp(stat.now + diff, stat.min, stat.max);

    if (diff > 0) {
        stat._gain += diff;
    } else {
        stat._loss += Math.abs(diff);
    }
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

export function percentage(stat, lowerPercent = 0, upperPercent = 1) {
    return percentageBetween(stat.now, lowerPercent, upperPercent, stat.min, stat.max);
}

function assert(stat) {
    assertStat(
        stat.type === 'balance',
        stat.gain !== undefined,
        stat.loss !== undefined,
        stat._gain !== undefined,
        stat._loss !== undefined,
        stat.now !== undefined,
        stat.min !== undefined,
        stat.center !== undefined,
        stat.max !== undefined,
    )
}