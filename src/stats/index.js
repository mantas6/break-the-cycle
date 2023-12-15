import * as Balance from './balance';
import * as Value from './value';

export function assertStat() {
    if ([ ...arguments ].some(i => !i) && !import.meta.env.PROD) {
        throw new Error('Incorrect value object given');
    }
}

export {
    Balance,
    Value,
};