import { useTimeStore } from "@/stores/time.js";

const handlers = {
    beforeClock: [],
    onClock: [],
};

function clock() {
    const time = useTimeStore();

    if (!time.pause) {
        handlers.beforeClock.forEach(tick => tick())
        handlers.onClock.forEach(tick => tick())
    }

    setTimeout(() => clock(), time.clockInterval)
}

export function onClock(cb) {
    handlers.onClock.push(cb);
}

export function beforeClock(cb) {
    handlers.beforeClock.push(cb);
}

setTimeout(() => clock(), 500)
