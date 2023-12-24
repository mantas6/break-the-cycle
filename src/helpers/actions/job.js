import {usePhysicalStore} from "@/stores/stats/physical";
import {Balance} from "@/stats";
import {useWalletStore} from "@/stores/stats/wallet";
import {unref} from "vue";

export function executeBasicJob({ eff, count }, opts) {
    const physical = usePhysicalStore();

    const energyCost = unref(opts.energyCost) * count;
    const actualCost = Balance.reserve(physical.energy, -energyCost) * Balance.actualCenter(physical.energy, 0.5);
    eff.value = Math.abs(actualCost) / energyCost;

    Balance.affect(physical.energy, actualCost);

    const wallet = useWalletStore();
    wallet.transaction(unref(opts.baseBalance) * count * eff.value);
}
