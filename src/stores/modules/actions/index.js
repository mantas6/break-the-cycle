import {defineStore} from "pinia";
import {storeName} from "@/stores/index.js";
import {computed, ref} from "vue";
import {range, assign} from "lodash";
import {computedWritable} from "@/stats/computed.js";

export function defineActionStore(opts, storeSetup) {
    const id = `${opts.category}.${opts.subcategory}.${opts.title}`;

    return defineStore(storeName(id), () => {
        const title = computed(() => opts.title);
        const subcategory = computed(() => opts.subcategory);
        const category = computed(() => opts.category);

        const durations = computed(() => range(1, 25));
        const eff = computedWritable(0);

        const unlocked = ref();
        const notify = ref();

        const store = {
            title,
            subcategory,
            category,

            durations,
            eff,

            unlocked,
            notify,
        };

        const setup = storeSetup(store);

        assign(store, setup);

        return store;
    });
}