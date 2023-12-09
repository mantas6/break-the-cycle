import { ref } from "vue";

export const actionStores = ref(new Map);

export function ActionsPlugin({ store }) {
    if (store.executeAction) {
        const actionName = store.$id.replace('actions:', '');
        actionStores.value.set(actionName, store);
    }
}
