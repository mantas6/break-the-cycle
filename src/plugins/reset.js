import { cloneDeep } from "lodash/lang";

export function ResetPlugin({ store }) {
    const initialState = cloneDeep(store.$state);

    // TODO: check if store implements $reset
    store.$reset = () => {
        //store.$patch($state => Object.assign($state, initialState));
        store.$patch(initialState);
    };
}
