import { ref } from "vue";

export const actionStores = ref(new Map);

const defaultDuration = ref(1);

export function ActionsPlugin({ store }) {
    if (store.executeAction) {
        actionStores.value.set(store.$id, store);
        if (store.duration === undefined) {
            store.duration = defaultDuration
            if (import.meta.env.DEV) {
                store._customProperties.add('duration')
            }
        }
    }
}
