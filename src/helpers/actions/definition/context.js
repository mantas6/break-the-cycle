/**
 * @typedef {Object} ActionDefinitionContext
 * @property {Object} store - Initialization object for store
 * @property {Object} options
 * @property {Object} titles
 * @property {string} name
 * @property {CallableFunction?} executeAction
 */

/**
 *
 * @type {ActionDefinitionContext[]}
 */
export const contexts = [];

/**
 * Define a action definition context
 * @param {ActionDefinitionContext} opts
 * @returns {void}
 */
export function defineContext(opts) {
    contexts.push(opts);
}

/**
 *
 * @param {CallableFunction} cb
 */
export function useContext(cb) {
    cb();

    contexts.pop();
}

export function getCurrentContext() {
    return contexts[contexts.length - 1];
}
