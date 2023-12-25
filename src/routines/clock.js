import { useTimeStore } from "@/stores/time.js";

export const clockHandlers = {
    beforeClock: [],
    onClock: [],
    afterClock: [],
};

function clock() {
    const time = useTimeStore();

    if (!time.pause) {
        runClock();
    }

    setTimeout(() => clock(), time.clockInterval)
}

export function runClock() {
    clockHandlers.beforeClock.forEach(tick => tick())
    clockHandlers.onClock.forEach(tick => tick())
    clockHandlers.afterClock.forEach(tick => tick())
}

export function onClock(cb) {
    clockHandlers.onClock.push(cb);
}

export function beforeClock(cb) {
    clockHandlers.beforeClock.push(cb);
}

export function afterClock(cb) {
    clockHandlers.afterClock.push(cb);
}

setTimeout(() => clock(), 500)
