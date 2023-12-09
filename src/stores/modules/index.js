export function initializeDynamicModules() {
    const modules = import.meta.glob('./**/*.js', { eager: true });

    Object.values(modules).forEach(async (mod) => {
        mod.default();
    })
}
