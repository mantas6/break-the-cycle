import { expect, it, vi } from "vitest";
import {condition} from "@/helpers/state.js";
import {nextTick, ref} from "vue";

it('correctly updates ref when condition changes', async () => {
    const triggerCount = ref(0);
    const dependency = ref(0);
    const unlocked = condition(() => {
        triggerCount.value++;
        return dependency.value >= 5;
    });

    await nextTick();
    expect(unlocked.value).toBeUndefined()
    expect(triggerCount.value).toBe(1)

    dependency.value = 1;
    await nextTick();
    expect(unlocked.value).toBeUndefined()
    expect(triggerCount.value).toBe(2)

    dependency.value = 5;
    await nextTick();
    expect(unlocked.value).toBe(true)
    expect(triggerCount.value).toBe(3)

    dependency.value = 10;
    await nextTick();
    expect(unlocked.value).toBe(true)
    expect(triggerCount.value).toBe(3)
})