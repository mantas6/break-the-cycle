import {usePhysicalStore} from "@/stores/stats/physical";
import {Balance} from "@/stats";
import {useWalletStore} from "@/stores/stats/wallet";
import {unref} from "vue";
import {useMuscularStore} from "@/stores/stats/muscular.js";
import {percentageBetween} from "@/helpers/math.js";
import {last} from "lodash/array.js";

export function executeBasicJob({ eff, count, durations }, { energyCost, baseBalance, capabilityUpper = 0.5 }) {
    const physical = usePhysicalStore();
    const muscular = useMuscularStore();

    const energyCostTotal = unref(energyCost) * count;
    const capability = percentageBetween(muscular.overallCapability, 0, capabilityUpper);

    const maxDuration = last(unref(durations));
    const capabilityInTime = percentageBetween(capability, 0, count / maxDuration)

    const actualCost = Balance.reserve(physical.energy, -energyCostTotal) * capabilityInTime;
    eff.value = Math.abs(actualCost) / energyCostTotal;

    Balance.affect(physical.energy, actualCost);

    const wallet = useWalletStore();
    wallet.transaction(unref(baseBalance) * count * eff.value);
}
