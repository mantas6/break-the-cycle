import { reactive } from "vue";
import { assertStat } from '.'

export function create(now) {
    return reactive({
        type: 'value',
        gain: 0,
        loss: 0,
        now,
    });
}

export function affect(stat, diff) {
    assert(stat);
    stat.now += diff;

    if (diff > 0) {
        stat.gain += diff;
    } else {
        stat.loss += Math.abs(diff);
    }
}

export function assert(stat) {
    assertStat(
        stat.type === 'value',
        stat.gain !== undefined,
        stat.loss !== undefined,
        stat.now !== undefined,
    )
}