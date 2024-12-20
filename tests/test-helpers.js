/**
 * @fileoverview Helpers for tests.
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict"
const eslintVersion = require("eslint/package.json").version
const { RuleTester } = require("eslint")
const { FlatRuleTester } = require("eslint/use-at-your-own-risk")
const globals = require("globals")
const semverSatisfies = require("semver/functions/satisfies")
const os = require("os")
const typescriptParser = require("@typescript-eslint/parser")

// greater than or equal to ESLint v9
exports.gteEslintV9 = semverSatisfies(eslintVersion, ">=9", {
    includePrerelease: true,
})

const platform = os.platform()
exports.isCaseSensitiveFileSystem =
    platform === "linux" || platform === "freebsd" || platform === "openbsd"

exports.FlatRuleTester = exports.gteEslintV9 ? RuleTester : FlatRuleTester

// to support the `env:{ es6: true, node: true}` rule-tester (env has been away in flat config.)
// * enabled by default as it's most commonly used in the package.
// * to disable the node.js globals: {languageOptions: {env: {node: false}}}.
const defaultConfig = {
    languageOptions: {
        ecmaVersion: 6,
        sourceType: "commonjs",
        // TODO: remove global.es2105 when dropping eslint v8 -- it has been fixed in eslint v9
        // see: https://github.com/eslint/eslint/commit/0db676f9c64d2622ada86b653136d2bda4f0eee0
        globals: { ...globals.es2015, ...globals.node },
    },
}
const tsConfig = {
    languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parser: typescriptParser,
        parserOptions: {
            projectService: {
                allowDefaultProject: ["*.*", "src/*"], // TODO: Don't use default project.
            },
        },
    },
}
exports.RuleTester = function (config = defaultConfig) {
    if (config.languageOptions.env?.node === false)
        config.languageOptions.globals = config.languageOptions.globals || {}
    delete config.languageOptions.env

    config.languageOptions = Object.assign(
        {},
        defaultConfig.languageOptions,
        config.languageOptions
    )

    const ruleTester = new exports.FlatRuleTester(config)
    const $run = ruleTester.run.bind(ruleTester)
    ruleTester.run = function (name, rule, tests) {
        tests.valid = tests.valid.filter(shouldRun)
        tests.invalid = tests.invalid.filter(shouldRun)

        $run(name, rule, tests)
    }
    return ruleTester
}
exports.TsRuleTester = function (config = tsConfig) {
    return exports.RuleTester.call(this, config)
}
Object.setPrototypeOf(
    exports.TsRuleTester.prototype,
    exports.RuleTester.prototype
)

// support skip in tests
function shouldRun(item) {
    if (typeof item === "string") return true

    const skip = item.skip
    delete item.skip
    return skip === void 0 || skip === false
}
