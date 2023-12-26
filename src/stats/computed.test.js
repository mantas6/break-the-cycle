import {computedOnce} from "@/stats/computed.js";
import {expect, it, afterEach} from "vitest";
import {ref} from "vue";
import {clearHandlers, runClock} from "@/routines/clock.js";

afterEach(() => {
    clearHandlers();
})

it('should run computed once correctly', () => {
    let increment = ref(0);
    const prop = computedOnce(() => increment.value);

    expect(prop.value).toBe(0)

    increment.value++;
    expect(prop.value, 'After mutation nothing should have been changed').toBe(0)

    runClock();

    expect(prop.value, 'After we run the clock value now needs to be updated').toBe(1)
});