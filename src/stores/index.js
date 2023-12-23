import { camelCase } from "lodash/string";

const storeNames = [];

export function storeName(name) {
    if (storeNames.includes(name)) {
        console.warn('Store name is already defined ' + name);
    } else {
        storeNames.push(name);
    }

    return name.split('.').map(i => camelCase(i)).join('.');
}
