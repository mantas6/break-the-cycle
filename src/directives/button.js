export const vButton = (el, { value }) => {
    if (value) {
        el.classList.remove('hover:text-zinc-300', 'active:text-zinc-400')
        el.classList.add('text-zinc-500')
    } else {
        el.classList.remove('text-zinc-500')
        el.classList.add('hover:text-zinc-300', 'active:text-zinc-400')
    }
}
