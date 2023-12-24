import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import { Value } from "@/stats";

export const useSocialStore = defineStore(storeName('social'), () => {
    const construction = Value.create(0);
    const destruction = Value.create(0);

    return {
        construction,
        destruction,
    };
})
