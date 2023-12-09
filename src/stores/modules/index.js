import { defineStore } from "pinia";

export function initializeDynamicModules() {
    const modules = import.meta.glob('./**/*.js', { eager: true });

    for (const [ moduleName, module ] of Object.entries(modules)) {
        const { setup } = module.default;

        const storeName = moduleName.replace('./', '')
            .replace('.js', '');

        const useStore = defineStore(storeName, setup);
        useStore();
    }
}

export function defineModularStore(setup) {
    return { setup };
}