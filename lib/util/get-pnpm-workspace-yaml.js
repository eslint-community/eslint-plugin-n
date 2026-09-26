import fs from "node:fs"
import path from "node:path"
import * as yaml from "js-yaml"
import { Cache } from "./cache.js"

const cache = new Cache()

/**
 * @param {string} dir - A workspace root directory.
 * @returns {string[]} pnpm workspace package patterns.
 */
export function getPnpmWorkspacePatterns(dir) {
    const filePath = path.join(dir, "pnpm-workspace.yaml")
    const cached = cache.get(filePath)
    if (cached != null) {
        return cached
    }

    /** @type {string[]} */
    let patterns = []
    try {
        const workspace = yaml.load(fs.readFileSync(filePath, "utf8"))
        if (
            workspace != null &&
            typeof workspace === "object" &&
            "packages" in workspace &&
            Array.isArray(workspace.packages)
        ) {
            patterns = workspace.packages.map(String)
        }
    } catch {
        // Missing or invalid workspace files have no package patterns.
    }

    cache.set(filePath, patterns)
    return patterns
}
