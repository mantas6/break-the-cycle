import {getCurrentContext} from "@/helpers/actions/definition/context.js";
import {computed, ref, toValue} from "vue";
import {interval, requireCost} from "@/helpers/actions/index.js";
import {computedWritable} from "@/helpers/computed.js";
import {defineComputed, defineRaw, defineRef} from "@/helpers/actions/definition/hooks.js";
import {head} from "lodash";

export function createDefaults() {
    const { titles } = getCurrentContext();

    defineComputed('title', titles.title);
    defineComputed('subcategory', titles.subcategory);
    defineComputed('category', titles.category);
    defineComputed('description', titles.description);

    //
    defineRaw('durations', interval(1));
    defineRaw('eff', computedWritable(0));

    defineRef('unlocked');
    defineRef('revoked');
    defineRef('notify');

    defineRef('executionCount');
}

export function setupDefaultCanExecute() {
    const { store } = getCurrentContext();

    if (store.canExecute) {
        return;
    }

    const minDuration = head(toValue(store.durations)) || 1;

    if (store.baseBalance && toValue(store.baseBalance) < 0) {
        store.canExecute = requireCost(toValue(store.baseBalance) * minDuration);
    } else {
        store.canExecute = computed(() => true)
    }
}

export function setupMinBalance() {
    const { store } = getCurrentContext();

    const minDuration = head(toValue(store.durations)) || 1;

    if (store.baseBalance) {
        store.minBalance = computed(() => toValue(store.baseBalance) * minDuration);
    }
}