import {defineTierUpgrade} from "@/helpers/actions/jobUpgrade.js";
import useJob from '../bottles.js'
import {useSocialStore} from "@/stores/stats/social.js";

const options = {
    title: 'Wheelbarrow',
    subcategory: 'Job - Collect Empty Bottles',
    category: 'Upgrades',
    description: 'Load up more bottles at once. No need to carry them in a backpack.',
    once: true,
};

export default defineTierUpgrade(options, -20, useJob, () => {
    const social = useSocialStore();
    const job = useJob();
    return job.tier === 2 && social.construction.now >= 15;
});