import {Balance} from "@/stats/index.js";
import {useDeathStore} from "@/stores/death.js";

/**
 * @typedef {Object} DegradeLifetimeOptions
 * @property {number} passiveHealthLoss
 * @property {number} healthLossMultiplier
 */

/**
 *
 * @param health
 * @param healthLifetime
 * @param {DegradeLifetimeOptions} opts
 */
export function degradeLifetime({ health, healthLifetime }, opts) {
    const passiveHealthLoss = opts.passiveHealthLoss || 0.01
    const healthLossMultiplier = opts.healthLossMultiplier || 10;

    const loss = Math.max((1 - Balance.percentage(health)) * healthLossMultiplier, passiveHealthLoss);
    Balance.affect(healthLifetime, -loss);

    if (!Balance.percentage(healthLifetime)) {
        const death = useDeathStore();
        death.setDead(opts.deathReason);
    }
}
