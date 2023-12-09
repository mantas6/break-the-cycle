import { parse, serialize } from "@/plugins/serialization.js";

const saveGameKey = 'currentSaveGame';

export function loadGame() {
    const data = localStorage.getItem(saveGameKey);

    if (data) {
        parse(data);
    }
}

export function saveGame() {
    const data = serialize();
    localStorage.setItem(saveGameKey, data)
}