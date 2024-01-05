import {Balance} from "@/stats/index.js";
import {useDeathStore} from "@/stores/death.js";
import {percentageBetween} from "@/helpers/math.js";

/**
 * @typedef {Object} DegradeLifetimeOptions
 * @property {number} passiveHealthLoss
 * @property {number} healthLossMultiplier
 * @property {string} deathReason
 */

/**
 *
 * @param health
 * @param healthLifetime
 * @param {DegradeLifetimeOptions} opts
 */
export function degradeLifetime({ health }, opts) {
    const passiveHealthLoss = opts.passiveHealthLoss || 0.01
    const healthLossMultiplier = opts.healthLossMultiplier || 10;

    const percentage = percentageBetween(health.now, 0, 1, health.min, health.upperLimit);
    const loss = Math.max((1 - percentage) * healthLossMultiplier, passiveHealthLoss);
    Balance.affectUpperLimit(health, -loss)
    console.log({loss, percentage})

    if (!Balance.percentage(health)) {
        const death = useDeathStore();
        death.setDead(opts.deathReason);
    }
}
