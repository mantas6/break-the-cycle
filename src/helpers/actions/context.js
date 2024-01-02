const context = { store: null };

/**
 * @desc Set context before action execution
 * @param {Object} ctx
 * @param {Object} [ctx.store]
 * @param {number} [ctx.count]
 */
export function setActionContext(ctx) {
    Object.assign(context, ctx);
}

/**
 * @desc Retrieve the context during execution
 * @return {Object} store of the action
 */
export function getActionContext() {
    return { ...context.store, count: context.count };
}