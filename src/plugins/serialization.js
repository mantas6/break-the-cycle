const stores = new Map;

export function SerializationPlugin({ store }) {
    stores.set(store.$id, store);
}

export function serialize() {
    const result = {};

    for (const { $id, $state } of stores.values()) {
        const stateToSerialize = {};
        for (const [ itemName, itemValue ] of Object.entries($state)) {
            stateToSerialize[itemName] = itemValue;
        }

        if (Object.keys(stateToSerialize).length > 0) {
            result[$id] = stateToSerialize;
        }

    }

    return JSON.stringify(result);
}

export function parse(json) {
    const decoded = JSON.parse(json);

    for (const [ id, state ] of Object.entries(decoded)) {
        stores.get(id).$patch(state);
    }
}

// Debugging
window.__serialize = serialize;
window.__parse = parse;