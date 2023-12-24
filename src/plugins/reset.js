import { cloneDeep } from "lodash/lang";

export function ResetPlugin({ store }) {
    const initialState = cloneDeep(store.$state);

    let definesReset = false;

    try {
        store.$reset();
        definesReset = true;
    } catch (e) {
    }

    if (!definesReset) {
        store.$reset = () => {
            //store.$patch($state => Object.assign($state, initialState));
            store.$patch(cloneDeep(initialState));
        };
    }
}
