import {DiffPlugin} from "@/plugins/diff.js";
import {SerializationPlugin} from "@/plugins/serialization.js";
import {ActionsPlugin} from "@/plugins/actions.js";
import {ResetPlugin} from "@/plugins/reset.js";

export function setupPlugins(store) {
    store.use(DiffPlugin)
    store.use(SerializationPlugin)
    store.use(ActionsPlugin)
    store.use(ResetPlugin)
}
