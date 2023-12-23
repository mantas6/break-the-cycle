export function initializeDynamicModules() {
    const modules = import.meta.glob('./**/*.js', { eager: true });

    for (const [ name, module ] of Object.entries(modules)) {
        if (module.default) {
            module.default();
        }
    }
}
