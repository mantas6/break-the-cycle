import {range} from "lodash/util.js";
import {computed} from "vue";

export function interval(hours) {
    return computed(() => range(hours, 25, hours));
}