import {defineStore} from "pinia";
import {storeName} from "@/stores/index.js";
import {computed, ref, toValue} from "vue";
import {range, assign, last, head} from "lodash";
import {computedWritable} from "@/helpers/computed";
import {requireCost} from "@/helpers/actions/index.js";

function setupDefaultCanExecute(store, setup, minDuration) {
    // If setup does not implement "canExecute"
    if (!setup.canExecute) {
        // But provides a baseBalance cost
        if (setup.baseBalance && toValue(setup.baseBalance) < 0) {
            store.canExecute = requireCost(toValue(setup.baseBalance) * minDuration);
        } else {
            store.canExecute = computed(() => true)
        }
    }
}

function setupExecuteAction(store) {
    const executeActionChild = store.executeAction;
    store.executeAction = function (count) {
        if (!store.canExecute.value) {
            return;
        }

        executeActionChild(count)

        if (store.executionCount.value) {
            store.executionCount.value += count;
        } else {
            store.executionCount.value = count;
        }
    }
}

export function defineActionStore(opts, storeSetup) {
    const id = `${opts.category}.${opts.subcategory}.${opts.title}`;

    return defineStore(storeName(id), () => {
        const title = computed(() => opts.title);
        const subcategory = computed(() => opts.subcategory);
        const category = computed(() => opts.category);
        const description = computed(() => opts.description);


        const durations = computed(() => opts.once ? [] : range(1, 25));
        const eff = computedWritable(0);

        const unlocked = ref();
        const revoked = ref();
        const notify = ref();
        const executionCount = ref();

        const store = {
            title,
            subcategory,
            category,
            description,

            durations,
            eff,

            unlocked,
            revoked,
            notify,

            executionCount,
        };

        const setup = storeSetup(store);

        const minDuration = head(toValue(setup.durations || store.durations)) || 1;

        setupDefaultCanExecute(store, setup, minDuration)

        // Calculate minimumBalance according to a minDuration
        if (setup.baseBalance) {
            store.minBalance = computed(() => toValue(setup.baseBalance) * minDuration);
        }

        assign(store, setup);

        setupExecuteAction(store);

        return store;
    });
}