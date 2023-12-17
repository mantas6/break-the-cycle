const beforeClock = [];
const onClock = [];

export function ClockPlugin({ store }) {
    if (store.onClock) {
        onClock.push(store.onClock);
    }

    beforeClock.push(() => {
        for (const item of Object.values(store)) {
            if (item.type !== undefined && item.last !== undefined && item.now !== undefined) {
                item.last = item.now;
            }
        }
    })
}

function clock() {
    beforeClock.forEach(tick => tick())
    onClock.forEach(tick => tick())
}

setInterval(() => clock(), 500);
