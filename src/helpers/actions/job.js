import {usePhysicalStore} from "@/stores/stats/physical";
import {Balance} from "@/stats";
import {useWalletStore} from "@/stores/stats/wallet";
import {ref, toValue} from "vue";
import {percentageBetween} from "@/helpers/math.js";
import {last} from "lodash/array.js";

export function executeBasicJob({ eff, durations }, count, { energyCost, baseBalance, capabilityUpper = 0.5 }) {
    const physical = usePhysicalStore();

    const energyCostTotal = toValue(energyCost) * count;

    const capability = calculateCapability(physical.overallCapability, capabilityUpper, count, durations)

    const actualCost = Balance.reserve(physical.energy, -energyCostTotal) * capability;
    eff.value = Math.abs(actualCost) / energyCostTotal;

    Balance.affect(physical.energy, actualCost);

    if (baseBalance !== undefined) {
        const wallet = useWalletStore();
        wallet.transaction(toValue(baseBalance) * count * eff.value);
    }
}

export function calculateCapability(overallCapability, capabilityUpper, duration, durations) {
    const maxDuration = last(toValue(durations));
    const capability = percentageBetween(overallCapability, 0, capabilityUpper);
    return percentageBetween(capability, 0, duration / maxDuration)
}

export function createChargeable(opts) {
    const charge = Balance.create(0, opts.max, 0);

    const reserve = ref(0);

    function onCharge(cb) {
        const affect = cb();
        const reserved = Balance.reserve(charge, affect);
        const overflow = affect - reserved;

        if (overflow) {
            reserve.value += overflow;
        }

        Balance.affect(charge, affect);
    }

    function onFull(cb) {
        if (Balance.percentage(charge) === 1) {
            charge.now -= charge.max;
            cb();
        }
    }

    return {
        charge,
        onCharge,
        onFull,
    };
}