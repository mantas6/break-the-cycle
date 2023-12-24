import {defineStore} from "pinia";
import {storeName} from "@/stores/index.js";
import {computed, ref} from "vue";
import {range} from "lodash/util.js";

export function defineActionStore(opts, storeSetup) {
    const id = `${opts.category}.${opts.subcategory}.${opts.title}`;

    return defineStore(storeName(id), () => {
        const title = computed(() => opts.title);
        const subcategory = computed(() => opts.subcategory);
        const category = computed(() => opts.category);

        const durations = computed(() => range(1, 25));
        const eff = ref(0);

        const unlocked = ref();

        const defaults = {
            title,
            subcategory,
            category,

            durations,
            eff,

            unlocked,
        };

        const setup = storeSetup(defaults);

        return {
            ...defaults,
            ...setup,
        };
    });
}