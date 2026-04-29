/**
 * @fileoverview Helpers for tests.
 * @author 唯然<weiran.zsd@outlook.com>
 */

import path from "node:path"
import eslintPkg from "eslint/package.json" with { type: "json" }
import { RuleTester } from "eslint"
import unsupportedApi from "eslint/use-at-your-own-risk";
import globals from "globals"
import semverSatisfies from "semver/functions/satisfies.js"
import * as os from "node:os"
import typescriptParser from "@typescript-eslint/parser"

const version = eslintPkg.version
// greater than or equal to ESLint v9
export const gteEslintV9 = semverSatisfies(version, ">=9", {
    includePrerelease: true,
})

const platform = os.platform()
export const isCaseSensitiveFileSystem =
    platform === "linux" || platform === "freebsd" || platform === "openbsd"

const FlatRuleTesterExport = gteEslintV9 ? RuleTester : FlatRuleTester
export { RuleTester as FlatRuleTester }

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

/**
 * @param {string} fixturePath - Path to the fixture directory relative to the fixtures directory
 * @returns
 */
function getTsConfig(fixturePath) {
    return {
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                tsconfigRootDir: path.join(
                    import.meta.dirname,
                    "fixtures",
                    fixturePath
                ),
                projectService: {
                    // Allow virtual test files (file-*.ts) in default project
                    allowDefaultProject: ["file-*.ts"],
                },
            },
        },
    }
}

const RuleTesterExport = function (config = defaultConfig) {
    if (config.languageOptions.env?.node === false)
        config.languageOptions.globals = config.languageOptions.globals || {}
    delete config.languageOptions.env

    config.languageOptions = Object.assign(
        {},
        defaultConfig.languageOptions,
        config.languageOptions
    )

    const ruleTester = new FlatRuleTesterExport(config)
    const $run = ruleTester.run.bind(ruleTester)
    ruleTester.run = function (name, rule, tests) {
        tests.valid = tests.valid.filter(shouldRun)
        tests.invalid = tests.invalid.filter(shouldRun)

        $run(name, rule, tests)
    }
    return ruleTester
}
export { RuleTesterExport as RuleTester }

/**
 * @param {string | import('eslint').Linter.Config} configOrFixturePath
 * @returns
 */
export function TsRuleTester(configOrFixturePath) {
    const config =
        typeof configOrFixturePath === "object"
            ? configOrFixturePath
            : getTsConfig(configOrFixturePath)

    const ruleTester = RuleTesterExport.call(this, config)
    const $run = ruleTester.run.bind(ruleTester)
    ruleTester.run = function (name, rule, tests) {
        tests.valid = tests.valid.map(setTsFilename)
        tests.invalid = tests.invalid.map(setTsFilename)

        $run(name, rule, tests)
    }
    return ruleTester
}
Object.setPrototypeOf(TsRuleTester.prototype, RuleTesterExport.prototype)

// support skip in tests
function shouldRun(item) {
    if (typeof item === "string") return true

    const skip = item.skip
    delete item.skip
    return skip === void 0 || skip === false
}

// Counter for unique filenames to avoid singleRun cache issues in CI
// (typescript-eslint uses isolated programs after first parse of same filename)
let tsFileCounter = 0

function setTsFilename(item) {
    const filename = `file-${++tsFileCounter}.ts`

    if (typeof item === "string") {
        return {
            code: item,
            filename,
        }
    }

    item.filename ??= filename
    return item
}
