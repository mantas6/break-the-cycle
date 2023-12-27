import {usePhysicalStore} from "@/stores/stats/physical";
import {Balance} from "@/stats";
import {useWalletStore} from "@/stores/stats/wallet";
import {toValue} from "vue";
import {percentageBetween} from "@/helpers/math.js";
import {last} from "lodash/array.js";

export function executeBasicJob({ eff, durations }, count, { energyCost, baseBalance, capabilityUpper = 0.5 }) {
    const physical = usePhysicalStore();

    const energyCostTotal = toValue(energyCost) * count;

    const capability = calculateCapability(physical.overallCapability, capabilityUpper, count, durations)

    const actualCost = Balance.reserve(physical.energy, -energyCostTotal) * capability;
    eff.value = Math.abs(actualCost) / energyCostTotal;

    Balance.affect(physical.energy, actualCost);

    const wallet = useWalletStore();
    wallet.transaction(toValue(baseBalance) * count * eff.value);
}

export function calculateCapability(overallCapability, capabilityUpper, duration, durations) {
    const maxDuration = last(toValue(durations));
    const capability = percentageBetween(overallCapability, 0, capabilityUpper);
    return percentageBetween(capability, 0, duration / maxDuration)
}
