export function initializeDynamicModules() {
    const modules = import.meta.glob('./*/*.js');

    Object.values(modules).forEach(async (mod) => {
        const loaded = await mod();
        loaded.default();
    })
}
