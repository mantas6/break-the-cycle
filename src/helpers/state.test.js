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

    expect(unlocked.value).toBeUndefined()

    dependency.value = 1;
    expect(unlocked.value).toBeUndefined()

    dependency.value = 5;

    await nextTick();
    expect(unlocked.value).toBe(true)
})