export const serializableStores = new Map;

export function SerializationPlugin({ store }) {
    serializableStores.set(store.$id, store);
}

export function serialize() {
    const result = {};

    for (const { $id, $state } of serializableStores.values()) {
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

export function load(json) {
    const decoded = JSON.parse(json);

    for (const [ id, state ] of Object.entries(decoded)) {
        const store = serializableStores.get(id);

        store.$reset();

        for (const itemName of Object.keys(store.$state)) {
            const patch = {};
            patch[itemName] = state[itemName];
            store.$patch(patch);
        }
    }
}

// Debugging
window.__serialize = serialize;
window.__load = load;