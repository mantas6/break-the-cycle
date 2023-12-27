import {ref, watchEffect} from "vue";

export function condition(cb) {
    const base = ref();

    const stop = watchEffect(() => {
        if (cb() === true) {
            base.value = true;
            stop();
        }
    })

    return base;
}
