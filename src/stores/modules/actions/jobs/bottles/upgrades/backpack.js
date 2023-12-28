import {defineActionStore} from "@/stores/modules/actions";
import {computed, toValue} from "vue";
import { useWalletStore } from "@/stores/stats/wallet";
import {useSocialStore} from "@/stores/stats/social";
import useJob from '../bottles';
import {requireCost} from "@/helpers/actions/index.js";
import {defineTierUpgrade} from "@/helpers/actions/jobUpgrade.js";

const options = {
    title: 'Backpack',
    subcategory: 'Job - Collect Empty Bottles',
    category: 'Upgrades',
    description: 'Load up more bottles at once.',
    once: true,
};

export default defineTierUpgrade(options, -5, useJob, () => {
    const social = useSocialStore();
    return social.construction.now >= 2.5;
});
