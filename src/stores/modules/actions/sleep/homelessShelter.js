import {defineActionStore} from "@/stores/modules/actions";
import {executeSleep} from "@/helpers/actions/sleep.js";
import {useSocialStore} from "@/stores/stats/social.js";
import {useUnlockStore} from "@/stores/unlock.js";
import {interval} from "@/helpers/actions/index.js";

const options = {
    title: 'Homeless shelter',
    subcategory: 'Homeless',
    category: 'Sleep',
    description: 'At least a warm place to stay. Only allows 8hrs per day though..',
};

export default defineActionStore(options, ({ eff }) => {
    const durations = interval(1, 8);

    const social = useSocialStore();
    const unlock = useUnlockStore();

    function executeAction(count) {
        executeSleep({ eff, count }, { sleepQuality: 0.35 })
    }

    function beforeUnlock() {
        return social.construction.now >= 300 && unlock.planner;
    }

    return {
        durations,

        executeAction,
        beforeUnlock,
    };
});