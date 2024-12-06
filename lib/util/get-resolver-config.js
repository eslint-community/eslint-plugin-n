/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

/**
 * @typedef {Partial<import('enhanced-resolve').ResolveOptions>} ResolverConfig
 */

/** @type {ResolverConfig} */
const DEFAULT_VALUE = {}

/**
 * Gets `resolverConfig` property from a given option object.
 *
 * @param {{ resolverConfig: ResolverConfig } | undefined} option - An option object to get.
 * @returns {ResolverConfig | undefined} The `allowModules` value, or `null`.
 */
function get(option) {
    if (option?.resolverConfig) return option.resolverConfig
}

/**
 * Gets "resolverConfig" setting.
 *
 * 1. This checks `options` property, then returns it if exists.
 * 2. This checks `settings.n` | `settings.node` property, then returns it if exists.
 * 3. This returns `[]`.
 *
 * @param {import('eslint').Rule.RuleContext} context - The rule context.
 * @returns {ResolverConfig} A resolver config object.
 */
module.exports = function getResolverConfig(context, optionIndex = 0) {
    return (
        get(context.options?.[optionIndex]) ??
        get(context.settings?.n) ??
        get(context.settings?.node) ??
        DEFAULT_VALUE
    )
}

module.exports.schema = {
    type: "object",
    properties: {},
    additionalProperties: true,
}
