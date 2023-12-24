export const vFormat = (el, { arg: style, value }) => {
    const options = {
        style,
        currency: style === 'currency' ? 'USD' : undefined,
        notation: value > 100000 ? 'compact' : 'standard',
    };

    const formatter = Intl.NumberFormat('en-US', options);

    el.textContent = formatter.format(value)
}
