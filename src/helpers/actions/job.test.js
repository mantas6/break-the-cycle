import { expect, it } from 'vitest'
import {createChargeable} from "@/helpers/actions/job.js";

it('correctly calculates chargeable', () => {
    const { charge, onCharge, onFull } = createChargeable({ max: 10 });

    expect(charge.now).toBe(0)
    expect(charge.max).toBe(10)

    let isFull = false;

    onCharge(() => 1)
    onFull(() => isFull = true)
    expect(charge.now).toBe(1)
    expect(isFull).toBe(false)

    onCharge(() => 8)
    onFull(() => isFull = true)
    expect(charge.now).toBe(9)
    expect(isFull).toBe(false)

    onCharge(() => 1)
    onFull(() => isFull = true)
    expect(charge.now).toBe(0)
    expect(isFull).toBe(true)
})