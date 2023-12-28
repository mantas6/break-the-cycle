import {defineActionStore} from "@/stores/modules/actions";
import {computed} from "vue";
import { useWalletStore } from "@/stores/stats/wallet";
import {useSocialStore} from "@/stores/stats/social";

const options = {
    title: 'Wheelbarrow',
    subcategory: 'Job - Collect Empty Bottles',
    category: 'Upgrades',
    description: 'Load up all the bottles at once',
};

export default defineActionStore(options, store => {
    const baseBalance = computed(() => 15);

    const wallet = useWalletStore();

    function executeAction(count) {

    }

    function beforeUnlock() {
        const social = useSocialStore();
        return social.construction.now >= 50;
    }

    return {
        baseBalance,

        executeAction,
        beforeUnlock,
    };
});