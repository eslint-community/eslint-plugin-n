import { dirname, isAbsolute, resolve } from "node:path"
import { getTsconfig, parseTsconfig } from "get-tsconfig"
const fsCache = new Map()
// fsCache only caches file reads; get-tsconfig still re-parses the config on every call
/** @type {Map<string, import("get-tsconfig").TsConfigJsonResolved>} */
const parsedCache = new Map()
/** @type {Map<string, import("get-tsconfig").TsConfigResult | null>} */
const directoryCache = new Map()

/**
 * Attempts to get the ExtensionMap from the tsconfig given the path to the tsconfig file.
 *
 * @param {string} filename - The path to the tsconfig.json file
 * @returns {import("get-tsconfig").TsConfigJsonResolved}
 */
function getTSConfig(filename) {
    const absoluteFilename = resolve(filename)
    let config = parsedCache.get(absoluteFilename)
    if (config === undefined) {
        config = parseTsconfig(filename, fsCache)
        parsedCache.set(absoluteFilename, config)
    }
    return config
}

/**
 * Attempts to get the ExtensionMap from the tsconfig of a given file.
 *
 * @param {string} filename - The path to the file we need to find the tsconfig.json of
 * @returns {import("get-tsconfig").TsConfigResult | null}
 */
function getTSConfigForFile(filename) {
    // Files in one directory share a lookup; relative paths only walk up to the cwd, so they are keyed by it too
    const key = isAbsolute(filename)
        ? dirname(filename)
        : `${process.cwd()}\0${dirname(filename)}`
    let result = directoryCache.get(key)
    if (result === undefined) {
        result = getTsconfig(filename, "tsconfig.json", fsCache)
        directoryCache.set(key, result)
    }
    return result
}

/**
 * Attempts to get the ExtensionMap from the tsconfig of a given file.
 *
 * @param {import('eslint').Rule.RuleContext} context - The current eslint context
 * @returns {import("get-tsconfig").TsConfigResult | null}
 */
function getTSConfigForContext(context) {
    const filename = context.physicalFilename ?? context.filename

    return getTSConfigForFile(filename)
}

export { getTSConfig, getTSConfigForFile, getTSConfigForContext }

/**
 * @typedef {string} TSConfigPath
 */

export const schema = { type: "string" }
