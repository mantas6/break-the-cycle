import { computed, ref } from "vue";
import {range} from "lodash/util";

export const actionStores = ref(new Map);

export function ActionsPlugin({ store }) {
    if (store.executeAction) {
        actionStores.value.set(store.$id, store);
    }
}
