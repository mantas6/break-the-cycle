export const serializableStores = new Map;

export function SerializationPlugin({ store }) {
    serializableStores.set(store.$id, store);
}

export function serialize() {
    const result = {};

    for (const { $id, $state } of serializableStores.values()) {
        const stateToSerialize = {};
        for (const [ itemName, itemValue ] of Object.entries($state)) {
            if (itemValue !== undefined) {
                stateToSerialize[itemName] = itemValue;
            }
        }

        if (Object.keys(stateToSerialize).length > 0) {
            result[$id] = stateToSerialize;
        }

    }

    return JSON.stringify(result);
}

export function load(json) {
    const decoded = JSON.parse(json);

    for (const [ id, savedState ] of Object.entries(decoded)) {
        const store = serializableStores.get(id);

        if (store === undefined) {
            console.warn('Serialized state store does not exist ' + id)
            continue;
        }

        store.$reset();

        for (const itemName of Object.keys(store.$state)) {
            const savedValue = savedState[itemName];

            // TODO: check if state has .type and make sure it matches before patching

            store.$patch({ [itemName]: savedValue });
        }
    }
}

if (import.meta.env.DEV) {
    // Debugging
    window.__serialize = serialize;
    window.__load = load;
}
