import { ref } from "vue";
import { beforeClock } from "@/routines/clock.js";

export function computedOnce(cb) {
    const base = ref()

    beforeClock(() => base.value = cb());

    return base;
}
