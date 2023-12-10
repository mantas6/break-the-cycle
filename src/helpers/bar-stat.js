import {computed, reactive} from "vue";
import { clamp } from "lodash/number";

export function createBarStat(max, now) {
    return reactive({ now: now || max, max });
}

export function calcBarStatPercent(stat) {
    return computed(() => stat.now / stat.max);
}

export function makeBarStatModify(stat) {
    return (points) => {
        const newValue = clamp(stat.now + points, 0, stat.max);
        const diff = stat.now - newValue;

        stat.now = newValue;

        return diff;
    };
}

export function makeBarStatPreModify(stat) {
    return (points) => {
        const newValue = clamp(stat.now + points, 0, stat.max);
        return newValue - stat.now;
    };
}