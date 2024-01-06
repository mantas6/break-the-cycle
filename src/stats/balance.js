import { reactive } from "vue";
import {clamp} from "lodash/number";
import { assertStat } from '.'
import {percentageBetween} from "@/helpers/math";

/**
 *
 * @param {number} [min=-1000]
 * @param {number} [max=1000]
 * @param {number} [now]
 * @param {number} [center]
 * @param {number} [upperLimit] prevent stat from increase further
 * @param {number} [lowerLimit] prevent stat from decreasing further
 */
export function create({ min = -1000, max = 1000, now, center, upperLimit, lowerLimit }) {
    if (center === undefined) {
        center = (min + max) / 2;
    }

    if (now === undefined) {
        now = center;
    }

    if (upperLimit === undefined) {
        upperLimit = max;
    }

    if (lowerLimit === undefined) {
        lowerLimit = min;
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
        upperLimit,
        lowerLimit,
    });
}

export function affect(stat, diff) {
    assert(stat);

    stat.now = clamp(stat.now + diff, stat.lowerLimit, stat.upperLimit);

    if (diff > 0) {
        stat._gain += diff;
    } else {
        stat._loss += Math.abs(diff);
    }
}

export function reserve(stat, diff) {
    assert(stat);

    if (stat.now + diff <= stat.lowerLimit) {
        return stat.lowerLimit - stat.now;
    }

    if (stat.now + diff >= stat.upperLimit) {
        return stat.upperLimit - stat.now;
    }

    return diff;
}

/**
 * @desc Affects upper limit while updating now value if needed
 * @param {Object} stat
 * @param {number} diff
 */
export function affectUpperLimit(stat, diff) {
    assert(stat)

    stat.upperLimit = clamp(stat.upperLimit + diff, stat.min, stat.max);

    if (stat.now > stat.upperLimit) {
        stat.now = stat.upperLimit;
    }
}

/**
 * @desc Affects stat with tolerance. Negative sta values are not supported
 * @param {Object} stat
 * @param {number} diff
 */
export function affectTolerance(stat, diff) {
    assert(stat);

    const percent = percentage(stat)

    const actualDiff = diff > 0 ? diff * (1 - percent) : diff * percent;

    affect(stat, actualDiff)
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
        stat.upperLimit !== undefined,
    )
}