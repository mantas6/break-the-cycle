import {ref, watchEffect} from "vue";

export function condition(cb) {
    const base = ref();

    watchEffect(() => {
        if (base.value) {
            // Already unlocked, do not check anything
            return;
        }

        if (cb() === true) {
            base.value = true;
        }
    })

    return base;
}
