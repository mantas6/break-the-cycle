import { ref } from "vue";

export const actionStores = ref(new Map);

export function ActionsPlugin({ store }) {
    if (store.executeAction) {
        actionStores.value.set(store.$id, store);
    }
}
