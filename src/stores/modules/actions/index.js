import {defineStore} from "pinia";
import {storeName} from "@/stores/index.js";
import {computed, reactive} from "vue";
import {range} from "lodash/util.js";

export function defineActionStore(options, storeSetup) {
    const id = options.title; // TODO: add cat and sub names

    return defineStore(storeName(id), () => {
        const title = computed(() => options.title);
        const subcategory = computed(() => options.subcategory);
        const category = computed(() => options.category);

        const durations = computed(() => range(1, 25));
        const meta = reactive({});

        const defaults = {
            title,
            subcategory,
            category,

            durations,
            meta,
        };

        const setup = storeSetup(defaults);

        return {
            ...defaults,
            ...setup,
        };
    });
}