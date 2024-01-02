import {Value} from "@/stats/index.js";
import {useSocialStore} from "@/stores/stats/social.js";
import {computed} from "vue";
import {useIntellectStore} from "@/stores/stats/intellect.js";
import {useWalletStore} from "@/stores/stats/wallet.js";
import {defineAction} from "@/helpers/actions/definition/index.js";
import {unlockWhen, defineComputed, defineRaw} from "@/helpers/actions/definition/hooks.js";
import {onExecute} from "@/helpers/actions/definition/execution.js";

const titles = {
    title: 'Primary Evening School',
    subcategory: 'Education',
    category: 'Upgrades',
    description: `Teaches the basics if those who have supposedly "missed"`,
};

export default defineAction(titles, ({ eff }) => {
    const social = useSocialStore();
    const intellect = useIntellectStore();
    const wallet = useWalletStore();

    const durations = defineComputed('durations', [3, 6])
    const baseBalance = defineComputed('baseBalance', -1)

    unlockWhen(() => social.construction.now >= 25)
    onExecute(count => {
        const actualAmount = wallet.preTransactionArr(baseBalance.value, durations.value, count);

        if (actualAmount !== 0) {
            const targetAmount = baseBalance.value * count;
            eff.value = Math.abs(actualAmount / targetAmount);

            Value.affect(intellect.education, 0.001 * count * eff.value);
            wallet.transaction(actualAmount)
        }
    })
})
