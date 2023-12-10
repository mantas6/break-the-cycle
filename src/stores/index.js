export function storeName(url) {
    return new URL(url).pathname
        .replace('/src/stores/', '')
        .replace('.js', '');
}
