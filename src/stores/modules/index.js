export function initializeDynamicModules() {
    const modules = import.meta.glob('./**/*.js', { eager: true });

    for (const module of Object.values(modules)) {
        module.default();
    }
}
