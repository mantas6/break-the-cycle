import {computed, ref} from "vue";

export function useLockTimeout() {
    const timeoutHandle = ref();
    const locked = computed(() => !!timeoutHandle.value)

    function start(duration) {
        if (timeoutHandle.value) {
            return false;
        }

        timeoutHandle.value = setTimeout(() => {
           timeoutHandle.value = null;
        }, duration);

        return true;
    }

    return {
        locked,

        start,
    };
}