import {load, serializableStores, serialize} from "@/plugins/serialization.js";

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
    serializableStores.forEach(store => store.$reset());
    saveGame();
}