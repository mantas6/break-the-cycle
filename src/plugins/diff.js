import { beforeClock } from "@/routines/clock.js";

export function DiffPlugin({ store }) {
    const items = [];

    for (const item of Object.values(store)) {
        if (item !== undefined) {
            if (item.type !== undefined && item.gain !== undefined && item.loss !== undefined) {
                items.push(item);

            }
        }
    }

    if (items.length) {
        beforeClock(() => {
            items.forEach(item => {
                item.gain = 0;
                item.loss = 0;
            });
        })
    }
}
