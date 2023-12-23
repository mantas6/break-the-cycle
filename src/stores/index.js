import { kebabCase } from "lodash/string";

export function storeName(name) {
    return kebabCase(name);
}
