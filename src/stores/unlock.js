import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import {useWalletStore} from "@/stores/stats/wallet.js";
import {usePhysicalStore} from "@/stores/stats/physical.js";
import {Balance} from "@/stats/index.js";
import {condition} from "@/helpers/state.js";

export const useUnlockStore = defineStore(storeName('unlock'), () => {
    const wallet = useWalletStore();
    const physicalStore = usePhysicalStore();

    const balance = condition(() => wallet.balance.now > 5);

    const planner = condition(() => wallet.balance.now > 25);

    const physical = condition(() => Balance.actualCenter(physicalStore.energy) < 0.5);

    return {
        balance,
        planner,
        physical,
    }
})
