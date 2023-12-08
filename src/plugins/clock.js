const ticks = [];

export function ClockPlugin({ store }) {
    if (store.onClock) {
        ticks.push(store.onClock);
    }
}

setInterval(() => ticks.forEach(tick => tick()), 500);
