export const vFormat = (el, { arg: style, modifiers, value }) => {
    const abstractStyles = ['decimal', 'currency', 'percent', undefined];

    const usingAbstract = abstractStyles.includes(style);

    const options = {
        style: usingAbstract ? style : 'unit',
        notation: value > 100000 ? 'compact' : 'standard',
    };

    if (style === 'currency') {
        options.currency = 'USD';
    }

    if (!usingAbstract) {
        options.unit = style;
    }

    const formatter = Intl.NumberFormat('en-US', options);

    el.textContent = (modifiers.plus && value > 0 ? '+' : '') +  formatter.format(value)
}
