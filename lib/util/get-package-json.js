/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const fs = require("fs")
const path = require("path")
const Cache = require("./cache")

const cache = new Cache()

/**
 * Reads the `package.json` data in a given path.
 *
 * Don't cache the data.
 *
 * @param {string} dir - The path to a directory to read.
 * @returns {import('type-fest').JsonObject|null} The read `package.json` data, or null.
 */
function readPackageJson(dir) {
    const filePath = path.resolve(dir, "package.json")
    try {
        const text = fs.readFileSync(filePath, "utf8")
        const data = JSON.parse(text)

        if (
            data != null &&
            typeof data === "object" &&
            Array.isArray(data) === false
        ) {
            data.filePath = filePath
            return data
        }
    } catch {
        // do nothing.
    }

    return null
}
/**
 * @param {Pick<import('eslint').Rule.RuleContext, 'cwd'> | Pick<import('eslint').Rule.RuleContext, 'getCwd'>} context - The eslint context for the file
 * @returns {string}
 */
function getCwd(context) {
    if ("cwd" in context && typeof context.cwd === "string") {
        return context.cwd
    }

    if ("getCwd" in context) {
        return context.getCwd()
    }

    return process.cwd()
}

/**
 * Gets a `package.json` data.
 * The data is cached if found, then it's used after.
 *
 * @param {Pick<import('eslint').Rule.RuleContext, 'cwd'> | Pick<import('eslint').Rule.RuleContext, 'getCwd'>} context - The eslint context for the file
 * @param {string} [startPath] - A file path to lookup.
 * @returns {import('type-fest').JsonObject|null} A found `package.json` data or `null`.
 *      This object have additional property `filePath`.
 */
function getPackageJson(context, startPath = "a.js") {
    const startDir = path.dirname(path.resolve(getCwd(context), startPath))
    let dir = startDir
    let prevDir = ""
    let data = null

    do {
        data = cache.get(dir)
        if (data) {
            if (dir !== startDir) {
                cache.set(startDir, data)
            }
            return data
        }

        data = readPackageJson(dir)
        if (data) {
            cache.set(dir, data)
            cache.set(startDir, data)
            return data
        }

        // Go to next.
        prevDir = dir
        dir = path.resolve(dir, "..")
    } while (dir !== prevDir)

    cache.set(startDir, null)
    return null
}

module.exports = { getPackageJson }
