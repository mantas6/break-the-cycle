import {defineStore} from "pinia";
import {storeName} from "@/stores/index.js";
import {computed, ref, toValue} from "vue";
import {range, assign, last, head} from "lodash";
import {computedWritable} from "@/helpers/computed";
import {requireCost} from "@/helpers/actions/index.js";
import {actionStores} from "@/plugins/actions.js";
import {onClock} from "@/routines/clock.js";
import {actionRevokeHook, actionUnlockHook} from "@/routines/hooks/actions.js";

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

function setupOnClock(name) {
    onClock(() => {
        const actionStore = actionStores.value.get(name);

        if (actionStore !== undefined) {
            actionUnlockHook(actionStore);
            actionRevokeHook(actionStore);
        }
    })
}

export function defineActionStore(opts, storeSetup) {
    const id = `${opts.category}.${opts.subcategory}.${opts.title}`;
    const name = storeName(id);

    return defineStore(name, () => {
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
        setupOnClock(name);

        return store;
    });
}