import {computed, ref} from "vue";
import { afterClock } from "@/routines/clock.js";

export function computedOnce(cb) {
    const base = ref(cb())

    afterClock(() => base.value = cb());

    return computed(() => base.value);
}

export function computedWritable(initial) {
    const base = ref(initial)

    return computed({
        get() {
            return base.value;
        },

        set(newValue) {
            base.value = newValue;
        },
    })
}
