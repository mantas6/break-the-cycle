import { kebabCase } from "lodash/string";

const storeNames = [];

export function storeName(name) {
    if (storeNames.includes(name)) {
        console.warn('Store name is already defined ' + name);
    } else {
        storeNames.push(name);
    }

    return kebabCase(name);
}
