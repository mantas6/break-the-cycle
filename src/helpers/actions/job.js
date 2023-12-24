import {usePhysicalStore} from "@/stores/stats/physical";
import {Balance} from "@/stats";
import {useWalletStore} from "@/stores/stats/wallet";
import {unref} from "vue";

export function executeBasicJob({ eff, count }, { energyCost, baseBalance, energyActualStart = 0.5 }) {
    const physical = usePhysicalStore();

    const energyCostTotal = unref(energyCost) * count;
    const actualCost = Balance.reserve(physical.energy, -energyCostTotal) * Balance.actualCenter(physical.energy, energyActualStart);
    eff.value = Math.abs(actualCost) / energyCostTotal;

    Balance.affect(physical.energy, actualCost);

    const wallet = useWalletStore();
    wallet.transaction(unref(baseBalance) * count * eff.value);
}
