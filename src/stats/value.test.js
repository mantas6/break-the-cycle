import { expect, it } from 'vitest'
import { create, affect } from './value'

it('initializes as expected', () => {
    const stat = create(0);

    expect(stat.type).toBe('value')
    expect(stat.now).toBe(0)
    expect(stat.gain).toBe(0)
    expect(stat.loss).toBe(0)
})

it('mutates as expected', () => {
    const stat = create(0);

    const result = affect(stat, 50)
    expect(result).toBeUndefined()

    expect(stat.now).toBe(50)
    expect(stat.gain).toBe(50)
    expect(stat.loss).toBe(0)

    affect(stat, -50)
    expect(stat.now).toBe(0)
    expect(stat.gain).toBe(50)
    expect(stat.loss).toBe(50)
})