import {Balance, Value} from "@/stats/index.js";
import {useSocialStore} from "@/stores/stats/social.js";
import {computed} from "vue";
import {useIntellectStore} from "@/stores/stats/intellect.js";
import {useWalletStore} from "@/stores/stats/wallet.js";
import {defineAction} from "@/helpers/actions/definition/index.js";
import {unlockWhen, defineComputed, defineRaw} from "@/helpers/actions/definition/hooks.js";
import {onExecute} from "@/helpers/actions/definition/execution.js";
import {usePhysicalStore} from "@/stores/stats/physical.js";

const titles = {
    title: 'Gym',
    subcategory: 'General',
    category: 'Training',
    description: `More plates more dates!`,
};

export default defineAction(titles, ({ eff, durations }) => {
    const social = useSocialStore();
    const wallet = useWalletStore();
    const physical = usePhysicalStore();

    const baseBalance = defineComputed('baseBalance', -5)

    unlockWhen(() => social.construction.now >= 1)
    onExecute(count => {
        const actualAmount = wallet.preTransactionArr(baseBalance.value, durations.value, count);

        if (actualAmount !== 0) {
            const targetAmount = baseBalance.value * count;
            eff.value = Math.abs(actualAmount / targetAmount) * physical.overallCapability;

            Balance.affect(physical.energy, -count * eff.value);
            Balance.affectTolerance(physical.muscleMass, count * eff.value)
            wallet.transaction(actualAmount)
        }
    })
})
