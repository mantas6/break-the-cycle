import { reactive } from "vue";
import { assertStat } from '.'

export function create(now) {
    return reactive({
        type: 'value',
        last: now,
        now,
    });
}

export function affect(stat, diff) {
    stat.now += diff;
}

export function assert(stat) {
    assertStat(
        stat.type === 'value',
        stat.last !== undefined,
        stat.now !== undefined,
    )
}