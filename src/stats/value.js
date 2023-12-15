import { reactive } from "vue";
import { assertStat } from '.'

export function create(now, min = 0) {
    return reactive({
        type: 'value',
        last: now,
        now,
        min,
    });
}

export function affect(stat, diff) {
    stat.now += Math.max(diff, stat.min);
}

export function reserve(stat, diff) {
    if (stat.now + diff <= stat.min) {
        return stat.now * -1;
    }

    return diff;
}

export function assert(stat) {
    assertStat(
        stat.type === 'value',
        stat.last !== undefined,
        stat.now !== undefined,
        stat.min !== undefined,
    )
}