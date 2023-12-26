import { useTimeStore } from "@/stores/time.js";
import {useDeathStore} from "@/stores/death.js";

export const clockHandlers = {
    beforeClock: [],
    onClock: [],
    afterClock: [],
};

function clock() {
    const time = useTimeStore();
    const death = useDeathStore();

    if (!time.pause && death.alive) {
        runClock();
    }

    setTimeout(() => clock(), time.clockInterval)
}

export function clearHandlers() {
    clockHandlers.beforeClock.length = 0;
    clockHandlers.onClock.length = 0;
    clockHandlers.afterClock.length = 0;
}

export function runClock() {
    // Reset certain things before doing main calculations
    clockHandlers.beforeClock.forEach(tick => tick())

    // Do the core game calculations
    clockHandlers.onClock.forEach(tick => tick())

    // Retrospective of the results of core calculations
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
