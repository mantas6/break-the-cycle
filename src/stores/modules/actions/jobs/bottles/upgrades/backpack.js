import {useSocialStore} from "@/stores/stats/social";
import useJob from '../bottles';
import {defineTierUpgrade} from "@/helpers/actions/jobUpgrade.js";
import {computed} from "vue";

const options = {
    title: 'Backpack',
    subcategory: 'Job - Collect Empty Bottles',
    category: 'Upgrades',
    description: 'Load up more bottles at once.',
    once: true,
};

export default defineTierUpgrade(options, computed(() => -5), useJob, () => {
    const social = useSocialStore();
    return social.construction.now >= 2.5;
});
