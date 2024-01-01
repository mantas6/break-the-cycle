import {defineActionStore} from "@/stores/modules/actions";
import {executeSleep} from "@/helpers/actions/sleep.js";
import {useSocialStore} from "@/stores/stats/social.js";
import {useUnlockStore} from "@/stores/unlock.js";
import {interval} from "@/helpers/actions/index.js";
import {defineAction} from "@/helpers/actions/definition/index.js";
import {beforeUnlock, defineRaw} from "@/helpers/actions/definition/hooks.js";
import {executeAction} from "@/helpers/actions/definition/execution.js";

const titles = {
    title: 'Homeless shelter',
    subcategory: 'Homeless',
    category: 'Sleep',
    description: 'At least a warm place to stay. Only allows 8hrs per day though..',
};

export default defineAction(titles, store => {
    const social = useSocialStore();
    const unlock = useUnlockStore();

    defineRaw('durations', interval(1, 8));

    beforeUnlock(() => social.construction.now >= 300 && unlock.planner);

    executeAction(count => {
        executeSleep({ ...store, count }, { sleepQuality: 0.35 })
    })
});