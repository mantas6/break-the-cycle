import {Value} from "@/stats";
import { defineActionStore } from "@/stores/modules/actions";
import {useSocialStore} from "@/stores/stats/social.js";
import {computed} from "vue";
import {useIntellectStore} from "@/stores/stats/intellect.js";
import {useWalletStore} from "@/stores/stats/wallet.js";

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
    const wallet = useWalletStore();

    function executeAction(count) {
        const actualAmount = wallet.preTransactionArr(baseBalance.value, durations.value, count);

        if (actualAmount !== 0) {
            const targetAmount = baseBalance.value * count;
            eff.value = Math.abs(actualAmount / targetAmount);

            Value.affect(intellect.education, 0.001 * count * eff.value);
            wallet.transaction(actualAmount)
        }
    }

    function beforeUnlock() {
        return social.construction.now >= 25;
    }

    return {
        durations,
        baseBalance,

        executeAction,
        beforeUnlock,
    };
})
