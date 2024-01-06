import {executeSleep} from "@/helpers/actions/sleep.js";
import {useSocialStore} from "@/stores/stats/social.js";
import {defineAction} from "@/helpers/actions/definition/index.js";
import {unlockWhen, defineRaw, defineComputed} from "@/helpers/actions/definition/hooks.js";
import {onExecute} from "@/helpers/actions/definition/execution.js";

const titles = {
    title: 'Hostel',
    subcategory: 'Rent',
    category: 'Sleep',
    description: "Don't forget the earplugs!",
};

export default defineAction(titles, () => {
    const social = useSocialStore();

    const baseBalance = defineComputed('baseBalance', -10)
    const sleepQuality = defineComputed('quality', 0.5)

    unlockWhen(() => social.construction.now >= 300);

    onExecute(() => {
        executeSleep({ sleepQuality, baseBalance })
    })
});