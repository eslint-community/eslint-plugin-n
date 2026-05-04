/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import path from "path"
import { pathToFileURL } from "url"
import glob from "fast-glob"
import { pluginName } from "./utils.js"

const rootDir = path.resolve(import.meta.dirname, "../lib/rules/")

/**
 * @typedef RuleInfo
 * @property {string} filePath The path to the rule definition.
 * @property {string} id The rule ID. (This includes `n/` prefix.)
 * @property {string} name The rule name. (This doesn't include `n/` prefix.)
 * @property {string} category The category ID.
 * @property {string} description The description of this rule.
 * @property {boolean} recommended The flag to indicate a recommended rule.
 * @property {boolean} deprecated The flag to indicate a deprecated rule.
 * @property {boolean} fixable The flag to indicate a fixable rule.
 * @property {string[]} replacedBy The flag to indicate a fixable rule.
 */

/**
 * @typedef CategoryInfo
 * @property {string} id The category ID.
 * @property {RuleInfo[]} rules The rules which belong to this category.
 */

/** @type {RuleInfo[]} */
const rules = await Promise.all(
    glob
        .sync("**/*.js", { cwd: rootDir })
        .sort()
        .map(async filename => {
            const filePath = path.join(rootDir, filename)
            const name = filename.slice(0, -3)
            const { default: rule } = await import(pathToFileURL(filePath).href)
            const { meta } = rule
            return Object.assign(
                {
                    filePath,
                    id: `${pluginName}/${name}`,
                    name,
                    deprecated: Boolean(meta.deprecated),
                    fixable: Boolean(meta.fixable),
                    replacedBy: [],
                },
                meta.docs
            )
        })
)

/** @type {CategoryInfo[]} */
const categories = [
    "Possible Errors",
    "Best Practices",
    "Stylistic Issues",
].map(id => ({
    id,
    rules: rules.filter(rule => rule.category === id && !rule.deprecated),
}))

export { rules, categories }
export default { rules, categories }
