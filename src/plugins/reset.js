import { cloneDeep } from "lodash/lang";

export function ResetPlugin({ store }) {
    const initialState = cloneDeep(store.$state);

    store.$reset = () => {
        store.$patch(cloneDeep(initialState));

        if (store.$resetToo instanceof Function) {
            store.$resetToo();
        }
    };
}
