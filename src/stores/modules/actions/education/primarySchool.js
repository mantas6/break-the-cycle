import {Value} from "@/stats";
import { defineActionStore } from "@/stores/modules/actions";
import {useSocialStore} from "@/stores/stats/social.js";
import {computed} from "vue";
import {useIntellectStore} from "@/stores/stats/intellect.js";

const options = {
    title: 'Primary Evening School',
    subcategory: 'Basic',
    category: 'Education',
    description: `Teaches the basics if those who have supposedly "missed"`,
};

export default defineActionStore(options, ({ eff }) => {
    const durations = computed(() => [3, 6]);
    const baseBalance = computed(() => -1);

    const social = useSocialStore();
    const intellect = useIntellectStore();

    function executeAction(count) {
        Value.affect(intellect.education, 0.001 * count);
    }

    function beforeUnlock() {
        return social.construction.now >= 0;
    }

    return {
        durations,
        baseBalance,

        executeAction,
        beforeUnlock,
    };
})
