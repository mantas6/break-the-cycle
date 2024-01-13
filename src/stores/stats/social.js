import { defineStore } from 'pinia'
import { storeName } from "@/stores";
import { Value } from "@/stats";
import {ref} from "vue";

export const useSocialStore = defineStore(storeName('social'), () => {
    const construction = Value.create(0);
    const destruction = Value.create(0);

    const constructionMultiplier = ref(1);
    const destructionMultiplier = ref(1);

    function affectConstruction(diff) {
        Value.affect(construction, diff * constructionMultiplier.value);
    }

    function affectDestruction(diff) {
        Value.affect(destruction, diff * destructionMultiplier.value);
    }

    return {
        construction,
        destruction,

        constructionMultiplier,
        destructionMultiplier,

        affectConstruction,
        affectDestruction,
    };
})
