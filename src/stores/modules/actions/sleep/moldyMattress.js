
import {Balance} from "@/stats/index.js";
import {usePhysicalStore} from "@/stores/stats/physical.js";
import {executeSleep} from "@/helpers/actions/sleep.js";
import {defineAction} from "@/helpers/actions/definition/index.js";
import {unlockWhen} from "@/helpers/actions/definition/hooks.js";
import {executeAction} from "@/helpers/actions/definition/execution.js";

const titles = {
    title: 'Moldy Mattress',
    subcategory: 'Homeless',
    category: 'Sleep',
    description: 'Somebody threw it away. Smells like attic.',
};

export default defineAction(titles, () => {
    const physical = usePhysicalStore();

    unlockWhen(() => Balance.percentage(physical.energy) < 0.25)

    executeAction(() => executeSleep({ sleepQuality: 0.25 }))
})
