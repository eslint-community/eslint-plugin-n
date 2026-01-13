import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const pkg = require("../package.json")
import * as esmConfig from "./configs/recommended-module.js"
import * as cjsConfig from "./configs/recommended-script.js"
import * as recommendedConfig from "./configs/recommended.js"
import * as allRulesConfig from "./configs/all.js"
import allRules from "./all-rules.js"

/** @import { ESLint, Linter } from 'eslint' */

/** @type {ESLint.Plugin} */
const base = {
    meta: {
        name: pkg.name,
        version: pkg.version,
    },
    rules: allRules,
}
/**
 * @typedef {{
 *     'recommended-module': ESLint.ConfigData;
 *     'recommended-script': ESLint.ConfigData;
 *     'recommended': ESLint.ConfigData;
 *     'flat/recommended-module': Linter.Config;
 *     'flat/recommended-script': Linter.Config;
 *     'flat/recommended': Linter.Config;
 *     'flat/mixed-esm-and-cjs': Linter.Config[];
 *     'flat/all': Linter.Config;
 * }} Configs
 */

/** @type {Configs} */
const configs = {
    "recommended-module": { plugins: ["n"], ...esmConfig.eslintrc },
    "recommended-script": { plugins: ["n"], ...cjsConfig.eslintrc },
    recommended: { plugins: ["n"], ...recommendedConfig.eslintrc },
    "flat/recommended-module": { plugins: { n: base }, ...esmConfig.flat },
    "flat/recommended-script": { plugins: { n: base }, ...cjsConfig.flat },
    "flat/recommended": { plugins: { n: base }, ...recommendedConfig.flat },
    "flat/mixed-esm-and-cjs": [
        { files: ["**/*.js"], plugins: { n: base }, ...recommendedConfig.flat },
        { files: ["**/*.mjs"], plugins: { n: base }, ...esmConfig.flat },
        { files: ["**/*.cjs"], plugins: { n: base }, ...cjsConfig.flat },
    ],
    "flat/all": { plugins: { n: base }, ...allRulesConfig.flat },
}

/** @type {ESLint.Plugin & { configs: Configs }} */
export default Object.assign(base, { configs })
