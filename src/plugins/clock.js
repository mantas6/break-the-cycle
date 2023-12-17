import {useTimeStore} from "@/stores/time";

const beforeClock = [];
const onClock = [];

export function ClockPlugin({ store }) {
    if (store.onClock) {
        onClock.push(store.onClock);
    }

    beforeClock.push(() => {
        for (const item of Object.values(store)) {
            if (item.type !== undefined && item.gain !== undefined && item.loss !== undefined) {
                item.gain = 0;
                item.loss = 0;
            }
        }
    })
}

function clock() {
    const time = useTimeStore();

    if (!time.pause) {
        beforeClock.forEach(tick => tick())
        onClock.forEach(tick => tick())
    }

    setTimeout(() => clock(), time.clockInterval)
}

setTimeout(() => clock(), 500)
