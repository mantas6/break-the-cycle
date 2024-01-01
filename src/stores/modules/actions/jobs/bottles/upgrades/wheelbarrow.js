import {defineTierUpgrade} from "@/helpers/actions/jobUpgrade.js";
import useJob from '../bottles.js'
import {useSocialStore} from "@/stores/stats/social.js";
import {computed} from "vue";

const options = {
    title: 'Wheelbarrow',
    subcategory: 'Job - Collect Empty Bottles',
    category: 'Upgrades',
    description: 'Load up more bottles at once. No need to carry them in a backpack.',
};

export default defineTierUpgrade(options, -10, useJob, () => {
    const social = useSocialStore();
    const job = useJob();
    return job.tier === 2 && social.construction.now >= 10;
});