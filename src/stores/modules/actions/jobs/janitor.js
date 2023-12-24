import {ref, computed, reactive} from 'vue'
import { useWalletStore } from "@/stores/stats/wallet";
import { defineStore } from "pinia";
import { storeName } from "@/stores/index.js";
import { usePhysicalStore } from "@/stores/stats/physical.js";
import {Balance} from "@/stats/index.js";
import {defineActionStore} from "@/stores/modules/actions/index.js";
import {useSocialStore} from "@/stores/stats/social.js";
import {executeBasicJob} from "@/helpers/actions/job.js";

const options = {
    title: 'Janitor',
    subcategory: 'Education-less',
    category: 'Jobs',
};

export default defineActionStore(options, ({ eff }) => {
    const durations = computed(() => [4, 8, 12]);

    const baseBalance = computed(() => 1);

    function executeAction(count) {
        executeBasicJob({ eff, count }, { baseBalance, energyCost: 1 });
    }

    function beforeUnlock() {
        const social = useSocialStore();
        return social.construction.now >= 250;
    }

    return {
        durations,

        baseBalance,

        executeAction,
        beforeUnlock,
    };
})
