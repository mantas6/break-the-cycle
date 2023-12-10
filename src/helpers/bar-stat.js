import {computed, reactive} from "vue";
import { clamp } from "lodash/number";

export function createBarStat(max, now) {
    return reactive({ now: now || max, max });
}

export function calcBarStatPercent(stat) {
    warnMismatched(stat);
    return computed(() => stat.now / stat.max);
}

export function makeBarStatModify(stat) {
    warnMismatched(stat);
    return (points) => {
        const newValue = clamp(stat.now + points, 0, stat.max);
        const diff = stat.now - newValue;

        stat.now = newValue;

        return diff;
    };
}

export function makeBarStatPreModify(stat) {
    warnMismatched(stat);
    return (points) => {
        const newValue = clamp(stat.now + points, 0, stat.max);
        return newValue - stat.now;
    };
}

function warnMismatched(stat) {
    const doesNotMatch = Object.keys(stat).length !== 2
        || stat.now === undefined
        || typeof stat.now !== 'number'
        || stat.max === undefined
        || typeof stat.max !== 'number';

    if (doesNotMatch && !import.meta.env.PROD) {
        throw new Error('Initial stat validation has failed');
    }
}