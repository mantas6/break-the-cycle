import {defineActionStore} from "@/stores/modules/actions";
import {Balance} from "@/stats/index.js";
import {usePhysicalStore} from "@/stores/stats/physical.js";
import {executeSleep} from "@/helpers/actions/sleep.js";

const options = {
    title: 'Moldy Mattress',
    subcategory: 'Homeless',
    category: 'Sleep',
    description: 'Somebody threw it away. Smells like attic.',
};

export default defineActionStore(options, ({ eff }) => {
    const physical = usePhysicalStore();

    function executeAction(count) {
        executeSleep({ eff, count }, { sleepQuality: 0.25 })
    }

    function beforeUnlock() {
        return Balance.percentage(physical.energy) < 0.25;
    }

    return {
        executeAction,

        beforeUnlock,
    };
});