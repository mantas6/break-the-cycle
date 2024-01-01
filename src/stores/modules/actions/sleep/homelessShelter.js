import {executeSleep} from "@/helpers/actions/sleep.js";
import {useSocialStore} from "@/stores/stats/social.js";
import {useUnlockStore} from "@/stores/unlock.js";
import {interval} from "@/helpers/actions/index.js";
import {defineAction} from "@/helpers/actions/definition/index.js";
import {unlockWhen, defineRaw} from "@/helpers/actions/definition/hooks.js";
import {onExecute} from "@/helpers/actions/definition/execution.js";

const titles = {
    title: 'Homeless shelter',
    subcategory: 'Homeless',
    category: 'Sleep',
    description: 'At least a warm place to stay. Only allows 8hrs per day though..',
};

export default defineAction(titles, () => {
    const social = useSocialStore();
    const unlock = useUnlockStore();

    defineRaw('durations', interval(1, 8));

    unlockWhen(() => social.construction.now >= 300 && unlock.planner);

    onExecute(() => {
        executeSleep({ sleepQuality: 0.35 })
    })
});