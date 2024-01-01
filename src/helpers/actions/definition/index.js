import {defineStore} from "pinia";
import {defineContext, getCurrentContext, useContext} from "@/helpers/actions/definition/context.js";
import {storeName} from "@/stores/index.js";
import {createDefaults, setupDefaultCanExecute, setupMinBalance} from "@/helpers/actions/definition/defaults.js";
import {onClock} from "@/routines/clock.js";
import {actionStores} from "@/plugins/actions.js";
import {actionRevokeHook, actionUnlockHook} from "@/routines/hooks/actions.js";

/**
 * @typedef {Object} ActionTitlesOptions
 * @property {string} title - Title of the action
 * @property {string} category - Category of the action
 * @property {string} subcategory - Nested category to help further differentiate actions
 * @property {string} description - An artistic description of the action or what it does
 */

/**
 *
 * @param {ActionTitlesOptions} titles
 * @param {CallableFunction} setup
 */
export function defineAction(titles, setup) {
    const { id, name } = describe(titles);

    return defineStore(name, () => {
        const store = {};
        const options = {};

        defineContext({ store, options, titles, name });

        useContext(() => {
            createDefaults();

            console.log(getCurrentContext())
            setup(store);

            setupDefaultCanExecute();
            setupMinBalance();
            setupOnClock();
        });

        return store;
    });
}

/**
 *
 * @param {ActionTitlesOptions} titles
 * @return {{ id: string, name: string }}
 */
export function describe(titles) {
    const id = `${titles.category}.${titles.subcategory}.${titles.title}`;
    const name = storeName(id);

    return { id, name };
}

function setupOnClock() {
    const { name } = getCurrentContext();
    onClock(() => {
        const actionStore = actionStores.value.get(name);

        if (actionStore !== undefined) {
            actionUnlockHook(actionStore);
            actionRevokeHook(actionStore);
        }
    })
}
