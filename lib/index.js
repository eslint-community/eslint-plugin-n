"use strict"

const pkg = require("../package.json")
const esmConfig = require("./configs/recommended-module")
const cjsConfig = require("./configs/recommended-script")
const recommendedConfig = require("./configs/recommended")
const allRulesConfig = require("./configs/all")
const allRules = require("./all-rules")

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
 *     'recommended-module': Linter.Config;
 *     'recommended-script': Linter.Config;
 *     'recommended': Linter.Config;
 *     'mixed-esm-and-cjs': Linter.Config[];
 *     'all': Linter.Config;
 *     'flat/recommended-module': Linter.Config; // @deprecated
 *     'flat/recommended-script': Linter.Config; // @deprecated
 *     'flat/recommended': Linter.Config; // @deprecated
 *     'flat/mixed-esm-and-cjs': Linter.Config[]; // @deprecated
 *     'flat/all': Linter.Config; // @deprecated
 * }} Configs
 */

/** @type {Configs} */
const configs = {
    "recommended-module": { plugins: { n: base }, ...esmConfig.flat },
    "recommended-script": { plugins: { n: base }, ...cjsConfig.flat },
    recommended: { plugins: { n: base }, ...recommendedConfig.flat },
    "mixed-esm-and-cjs": [
        { files: ["**/*.js"], plugins: { n: base }, ...recommendedConfig.flat },
        { files: ["**/*.mjs"], plugins: { n: base }, ...esmConfig.flat },
        { files: ["**/*.cjs"], plugins: { n: base }, ...cjsConfig.flat },
    ],
    all: { plugins: { n: base }, ...allRulesConfig.flat },

    // @deprecated But still provided for backward compatibility.
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
module.exports = Object.assign(base, { configs })
