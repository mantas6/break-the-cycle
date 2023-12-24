import {clamp} from "lodash/number";

export function percentageBetween(value, lowerPercent = 0, upperPercent = 1, minValue = 0, maxValue = 1) {
    const normalizedBound = maxValue - minValue;

    const computedMin = minValue + (lowerPercent * normalizedBound);
    const computedMax = maxValue - ((1 - upperPercent) * normalizedBound)

    const computedNormalized = computedMax - computedMin;

    return clamp((value - computedMin) / computedNormalized, 0, 1);
}
