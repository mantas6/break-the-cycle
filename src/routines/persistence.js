import {load, serializableStores, serialize} from "@/plugins/serialization.js";
import {startsWith} from "lodash";

const saveGameKey = 'currentSaveGame';

export function loadGame() {
    const data = localStorage.getItem(saveGameKey);

    if (data) {
        load(data);
    }
}

export function saveGame() {
    const data = serialize();
    localStorage.setItem(saveGameKey, data)
}

export function resetGame() {
    [ ...serializableStores.values() ]
        .filter(store => !startsWith(store.$id, 'persist.'))
        .forEach(store => store.$reset());

    saveGame();
}

export function hardResetGame() {
    serializableStores.forEach(store => store.$reset());
    saveGame();
}
