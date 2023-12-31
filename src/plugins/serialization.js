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
            console.warn('Saved state store no longer exists ' + id)
            continue;
        }

        store.$reset();

        for (const itemName of Object.keys(store.$state)) {
            const savedValue = savedState[itemName];

            if (savedValue === undefined) {
                // Save does not (yet) have this value
                continue;
            }

            const storeValue = store.$state[itemName];

            if (storeValue !== undefined && storeValue.type !== undefined) {
                if (storeValue.type !== savedValue.type) {
                    console.warn(`Type of the state variable has changed, skipping ${id} ${itemName}`)
                    continue;
                }
            }

            store.$patch({ [itemName]: savedValue });
        }
    }
}

if (import.meta.env.DEV) {
    // Debugging
    window.__serialize = serialize;
    window.__load = load;
}
