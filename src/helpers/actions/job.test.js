import { expect, it } from 'vitest'
import {createChargeable} from "@/helpers/actions/job.js";

it('correctly calculates chargeable', () => {
    const { charge, onCharge, onFull } = createChargeable({ max: 10 });

    //
})