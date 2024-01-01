import {getCurrentContext} from "@/helpers/actions/definition/context.js";
import {computed, ref} from "vue";

/**
 * @desc Define an element in the state
 * @param {string} name - name of the variable in the store
 * @param value - definition
 * @return {{value:any}} - reactive state
 */
export function defineRaw(name, value) {
    getCurrentContext().store[name] = value;

    return value;
}

/**
 *
 * @param {string} name
 * @param {CallableFunction|any} cb
 * @returns {{value:any}}
 */
export function defineComputed(name, cb) {
    return defineRaw(name, computed(cb instanceof Function ? cb : () => cb));
}

/**
 *
 * @return {{value:any}}
 */
export function defineRef(name, value) {
    return defineRaw(name, ref(value))
}

/**
 * @desc Declares that the action is executed only once (ex. upgrades)
 */
export function declareOnce() {
    getCurrentContext().store.durations = computed(() => []);
}

export function beforeUnlock(cb) {
    getCurrentContext().store.beforeUnlock = cb;
}

export function beforeRevoke(cb) {
    getCurrentContext().store.beforeRevoke = cb;
}