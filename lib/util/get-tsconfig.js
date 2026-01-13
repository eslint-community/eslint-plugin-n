import { getTsconfig, parseTsconfig } from "get-tsconfig"
import { getPhysicalFilename, getFilename } from "./eslint-compat.js"
const fsCache = new Map()

/**
 * Attempts to get the ExtensionMap from the tsconfig given the path to the tsconfig file.
 *
 * @param {string} filename - The path to the tsconfig.json file
 * @returns {import("get-tsconfig").TsConfigJsonResolved}
 */
function getTSConfig(filename) {
    return parseTsconfig(filename, fsCache)
}

/**
 * Attempts to get the ExtensionMap from the tsconfig of a given file.
 *
 * @param {string} filename - The path to the file we need to find the tsconfig.json of
 * @returns {import("get-tsconfig").TsConfigResult | null}
 */
function getTSConfigForFile(filename) {
    return getTsconfig(filename, "tsconfig.json", fsCache)
}

/**
 * Attempts to get the ExtensionMap from the tsconfig of a given file.
 *
 * @param {import('eslint').Rule.RuleContext} context - The current eslint context
 * @returns {import("get-tsconfig").TsConfigResult | null}
 */
function getTSConfigForContext(context) {
    const filename = getPhysicalFilename(context) ?? getFilename(context)

    return getTSConfigForFile(filename)
}

export default {
    getTSConfig,
    getTSConfigForFile,
    getTSConfigForContext,
}

/**
 * @typedef {string} TSConfigPath
 */

module.exports.schema = { type: "string" }
