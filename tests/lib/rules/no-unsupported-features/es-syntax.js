/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("#test-helpers").RuleTester
const rule = require("../../../../lib/rules/no-unsupported-features/es-syntax")

/**
 * Makes a file path to a fixture.
 * @param {string} name - A name.
 * @returns {string} A file path to a fixture.
 */
function fixture(name) {
    return path.resolve(
        __dirname,
        "../../../fixtures/no-unsupported-features--ecma",
        name
    )
}

/**
 * Clone given invalid patterns with adding `ignores` option.
 * @param {string} keyword The keyword of `ignores` option.
 * @returns {function(pattern:object):object} The cloned pattern.
 */
function ignores(keyword) {
    return original => {
        const pattern = Object.assign({}, original)
        delete pattern.error

        if (pattern.options) {
            pattern.options = pattern.options.slice()
        } else {
            pattern.options = []
        }

        if (pattern.options[0]) {
            pattern.options[0] = Object.assign({}, pattern.options[0])
        } else {
            pattern.options.push({})
        }

        if (pattern.options[0].ignores) {
            pattern.options[0].ignores = pattern.options[0].ignores.concat([
                keyword,
            ])
        } else {
            pattern.options[0].ignores = [keyword]
        }

        return pattern
    }
}

function runTests(patterns) {
    const ruleTester = new RuleTester({
        languageOptions: { ecmaVersion: "latest", env: { node: false } },
    })

    for (const pattern of patterns) {
        const tests = {
            valid: pattern.valid,
            invalid: pattern.invalid,
        }

        // Add the invalid patterns with `ignores` option into the valid patterns.
        if (typeof pattern.keyword === "string") {
            pattern.keyword = [pattern.keyword]
        }

        if (Array.isArray(pattern.keyword)) {
            for (const keyword of pattern.keyword) {
                const additionalValid = pattern.invalid
                    .map(ignores(keyword))
                    .map(it => {
                        const item = { ...it }
                        delete item.errors
                        return item
                    })
                tests.valid.push(...additionalValid)
            }
        }

        ruleTester.run("no-unsupported-features/es-builtins", rule, tests)
    }
}

runTests([
    //----------------------------------------------------------------------
    // ES2015
    //----------------------------------------------------------------------
    {
        keyword: "arrowFunctions",
        valid: [
            {
                code: "function f() {}",
                options: [{ version: "3.9.9" }],
            },
            {
                code: "!function f() {}",
                options: [{ version: "3.9.9" }],
            },
            {
                code: "(() => 1)",
                options: [{ version: "4.0.0" }],
            },
            {
                code: "(() => {})",
                options: [{ version: "4.0.0" }],
            },
        ],
        invalid: [
            {
                code: "(() => 1)",
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "arrow-functions",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
            {
                code: "(() => {})",
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "arrow-functions",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "binaryNumericLiterals",
        valid: [
            {
                code: "0x01",
                options: [{ version: "3.9.9" }],
            },
            {
                code: "1",
                options: [{ version: "3.9.9" }],
            },
            {
                code: "0b01",
                options: [{ version: "4.0.0" }],
            },
        ],
        invalid: [
            {
                code: "0b01",
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "binary-numeric-literals",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "blockScopedFunctions",
        valid: [
            {
                code: "'use strict'; if (a) { function f() {} }",
                options: [{ version: "4.0.0" }],
            },
            {
                code: "'use strict'; function wrap() { if (a) { function f() {} } }",
                options: [{ version: "4.0.0" }],
            },
            {
                code: "function wrap() { 'use strict'; if (a) { function f() {} } }",
                options: [{ version: "4.0.0" }],
            },
            {
                code: "if (a) { function f() {} }",
                options: [{ version: "6.0.0" }],
            },
        ],
        invalid: [
            {
                code: "'use strict'; if (a) { function f() {} }",
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "block-scoped-functions",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
            {
                code: "if (a) { function f() {} }",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "block-scoped-functions",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "blockScopedVariables",
        valid: [
            {
                code: "var a = 0",
                options: [{ version: "3.9.9" }],
            },
            {
                code: "'use strict'; let a = 0",
                options: [{ version: "4.0.0" }],
            },
            {
                code: "'use strict'; const a = 0",
                options: [{ version: "4.0.0" }],
            },
            {
                code: "'use strict'; function wrap() { const a = 0 }",
                options: [{ version: "4.0.0" }],
            },
            {
                code: "function wrap() { 'use strict'; const a = 0 }",
                options: [{ version: "4.0.0" }],
            },
            {
                code: "let a = 0",
                options: [{ version: "6.0.0" }],
            },
            {
                code: "const a = 0",
                options: [{ version: "6.0.0" }],
            },
        ],
        invalid: [
            {
                code: "'use strict'; let a = 0",
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "block-scoped-variables",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
            {
                code: "'use strict'; const a = 0",
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "block-scoped-variables",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
            {
                code: "let a = 0",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "block-scoped-variables",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
            {
                code: "const a = 0",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "block-scoped-variables",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "classes",
        valid: [
            {
                code: "'use strict'; class A {}",
                options: [{ version: "4.0.0" }],
            },
            {
                code: "'use strict'; function wrap() { class A {} }",
                options: [{ version: "4.0.0" }],
            },
            {
                code: "function wrap() { 'use strict'; class A {} }",
                options: [{ version: "4.0.0" }],
            },
            {
                code: "class A {}",
                options: [{ version: "6.0.0" }],
            },
        ],
        invalid: [
            {
                code: "'use strict'; class A {}",
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "classes",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
            {
                code: "class A {}",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "classes",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "computedProperties",
        valid: [
            {
                code: "({ 0: 0, key: 1, 'key2': 2, key3, key4() {} })",
                options: [
                    { version: "3.9.9", ignores: ["propertyShorthands"] },
                ],
            },
            {
                code: "({ [key]: 1 })",
                options: [{ version: "4.0.0" }],
            },
            {
                code: "({ [key]() {} })",
                options: [{ version: "4.0.0" }],
            },
            {
                code: "class A { [key]() {} }",
                options: [{ version: "4.0.0", ignores: ["classes"] }],
            },
            {
                code: "(class { [key]() {} })",
                options: [{ version: "4.0.0", ignores: ["classes"] }],
            },
        ],
        invalid: [
            {
                code: "({ [key]: 1 })",
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "computed-properties",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
            {
                code: "({ [key]() {} })",
                options: [
                    { version: "3.9.9", ignores: ["propertyShorthands"] },
                ],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "computed-properties",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
            {
                code: "class A { [key]() {} }",
                options: [{ version: "3.9.9", ignores: ["classes"] }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "computed-properties",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
            {
                code: "(class { [key]() {} })",
                options: [{ version: "3.9.9", ignores: ["classes"] }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "computed-properties",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "defaultParameters",
        valid: [
            {
                code: "a = 0",
                options: [{ version: "5.9.9" }],
            },
            {
                code: "var a = 0",
                options: [{ version: "5.9.9" }],
            },
            {
                code: "var [a = 0] = []",
                options: [{ version: "5.9.9", ignores: ["destructuring"] }],
            },
            {
                code: "var {a = 0} = {}",
                options: [{ version: "5.9.9", ignores: ["destructuring"] }],
            },
            {
                code: "function f(a = 0) {}",
                options: [{ version: "6.0.0" }],
            },
            {
                code: "(function(a = 0) {})",
                options: [{ version: "6.0.0" }],
            },
            {
                code: "((a = 0) => a)",
                options: [{ version: "6.0.0" }],
            },
            {
                code: "({ key(a = 0) {} })",
                options: [{ version: "6.0.0" }],
            },
            {
                code: "class A { key(a = 0) {} }",
                options: [{ version: "6.0.0" }],
            },
            {
                code: "(class { key(a = 0) {} })",
                options: [{ version: "6.0.0" }],
            },

            // detected duplicate tests by eslint v9
            // {
            //     code: "function f(a = 0) {}",
            //     options: [{ version: "5.9.9", ignores: ["defaultParameters"] }],
            // },
            // {
            //     code: "(function(a = 0) {})",
            //     options: [{ version: "5.9.9", ignores: ["defaultParameters"] }],
            // },
            // {
            //     code: "((a = 0) => a)",
            //     options: [{ version: "5.9.9", ignores: ["defaultParameters"] }],
            // },
            // {
            //     code: "({ key(a = 0) {} })",
            //     options: [{ version: "5.9.9", ignores: ["defaultParameters"] }],
            // },
            // {
            //     code: "class A { key(a = 0) {} }",
            //     options: [
            //         {
            //             version: "5.9.9",
            //             ignores: ["classes", "defaultParameters"],
            //         },
            //     ],
            // },
            // {
            //     code: "(class { key(a = 0) {} })",
            //     options: [
            //         {
            //             version: "5.9.9",
            //             ignores: ["classes", "defaultParameters"],
            //         },
            //     ],
            // },
        ],
        invalid: [
            {
                code: "function f(a = 0) {}",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "default-parameters",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
            {
                code: "(function(a = 0) {})",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "default-parameters",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
            {
                code: "((a = 0) => a)",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "default-parameters",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
            {
                code: "({ key(a = 0) {} })",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "default-parameters",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
            {
                code: "class A { key(a = 0) {} }",
                options: [{ version: "5.9.9", ignores: ["classes"] }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "default-parameters",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
            {
                code: "(class { key(a = 0) {} })",
                options: [{ version: "5.9.9", ignores: ["classes"] }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "default-parameters",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "destructuring",
        valid: [
            {
                code: "function f(a = 0) {}",
                options: [{ version: "5.9.9", ignores: ["defaultParameters"] }],
            },
            {
                code: "[...a]",
                options: [{ version: "5.9.9" }],
            },
            {
                code: "f(...a)",
                options: [{ version: "5.9.9" }],
            },
            {
                code: "new A(...a)",
                options: [{ version: "5.9.9" }],
            },
            {
                code: "var a = {}",
                options: [{ version: "5.9.9" }],
            },
            {
                code: "var {a} = {}",
                options: [{ version: "6.0.0" }],
            },
            {
                code: "var [a] = {}",
                options: [{ version: "6.0.0" }],
            },
            {
                code: "function f({a}) {}",
                options: [{ version: "6.0.0" }],
            },
            {
                code: "function f([a]) {}",
                options: [{ version: "6.0.0" }],
            },
        ],
        invalid: [
            {
                code: "var {a} = {}",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "destructuring",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
            {
                code: "var [a] = {}",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "destructuring",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
            {
                code: "function f({a}) {}",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "destructuring",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
            {
                code: "function f([a]) {}",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "destructuring",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
            // One error even if it's nested.
            {
                code: "var {a: {b: [c = 0]}} = {}",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "destructuring",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
            {
                code: "var [{a: [b = 0]}] = {}",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "destructuring",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
            {
                code: "function f({a: {b: [c = 0]}}) {}",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "destructuring",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
            {
                code: "function f([{a: [b = 0]}]) {}",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "destructuring",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "forOfLoops",
        valid: [
            {
                code: "for (;;);",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "for (a in b);",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "for (var a in b);",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "for (a of b);",
                options: [{ version: "0.12.0" }],
            },
            {
                code: "for (var a of b);",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "for (a of b);",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "for-of-loops",
                            supported: ">=0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
            {
                code: "for (var a of b);",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "for-of-loops",
                            supported: ">=0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
            {
                code: "async function wrap() { for await (var a of b); }",
                options: [
                    {
                        version: "0.11.9",
                        ignores: ["asyncFunctions", "asyncIteration"],
                    },
                ],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "for-of-loops",
                            supported: ">=0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "generators",
        valid: [
            {
                code: "function f() {}",
                options: [{ version: "3.9.9" }],
            },
            {
                code: "async function f() {}",
                options: [{ version: "3.9.9", ignores: ["asyncFunctions"] }],
            },
            {
                code: "function* f() {}",
                options: [{ version: "4.0.0" }],
            },
            {
                code: "(function*() {})",
                options: [{ version: "4.0.0" }],
            },
            {
                code: "({ *f() {} })",
                options: [
                    { version: "4.0.0", ignores: ["propertyShorthands"] },
                ],
            },
            {
                code: "class A { *f() {} }",
                options: [{ version: "4.0.0", ignores: ["classes"] }],
            },
            {
                code: "(class { *f() {} })",
                options: [{ version: "4.0.0", ignores: ["classes"] }],
            },
        ],
        invalid: [
            {
                code: "function* f() {}",
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "generators",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
            {
                code: "(function*() {})",
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "generators",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
            {
                code: "({ *f() {} })",
                options: [
                    { version: "3.9.9", ignores: ["propertyShorthands"] },
                ],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "generators",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
            {
                code: "class A { *f() {} }",
                options: [{ version: "3.9.9", ignores: ["classes"] }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "generators",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
            {
                code: "(class { *f() {} })",
                options: [{ version: "3.9.9", ignores: ["classes"] }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "generators",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "modules",
        valid: [
            {
                code: "require('a')",
                options: [{ version: "0.0.0" }],
            },
            {
                code: "module.exports = {}",
                options: [{ version: "0.0.0" }],
            },
            {
                code: "exports.a = {}",
                options: [{ version: "0.0.0" }],
            },
            {
                code: "import a from 'a'",
                languageOptions: { sourceType: "module" },
                options: [{ version: "13.1.0", ignores: ["modules"] }],
            },
            {
                code: "export default {}",
                languageOptions: { sourceType: "module" },
                options: [{ version: "13.1.0", ignores: ["modules"] }],
            },
            {
                code: "export const a = {}",
                languageOptions: { sourceType: "module" },
                options: [{ version: "13.1.0", ignores: ["modules"] }],
            },
            {
                code: "export {}",
                languageOptions: { sourceType: "module" },
                options: [{ version: "13.1.0", ignores: ["modules"] }],
            },
        ],
        invalid: [
            {
                code: "import a from 'a'",
                languageOptions: { sourceType: "module" },
                options: [{ version: "10.0.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "modules",
                            supported: "^12.17.0 || >=13.2.0",
                            version: "10.0.0",
                        },
                    },
                ],
            },
            {
                code: "export default {}",
                languageOptions: { sourceType: "module" },
                options: [{ version: "10.0.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "modules",
                            supported: "^12.17.0 || >=13.2.0",
                            version: "10.0.0",
                        },
                    },
                ],
            },
            {
                code: "export const a = {}",
                languageOptions: { sourceType: "module" },
                options: [{ version: "10.0.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "modules",
                            supported: "^12.17.0 || >=13.2.0",
                            version: "10.0.0",
                        },
                    },
                ],
            },
            {
                code: "export {}",
                languageOptions: { sourceType: "module" },
                options: [{ version: "10.0.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "modules",
                            supported: "^12.17.0 || >=13.2.0",
                            version: "10.0.0",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: ["newTarget", "new.target"],
        valid: [
            {
                code: "new target",
                options: [{ version: "4.9.9" }],
            },
            {
                code: "class A { constructor() { new.target } }",
                options: [{ version: "5.0.0", ignores: ["classes"] }],
            },
            {
                code: "function A() { new.target }",
                options: [{ version: "5.0.0" }],
            },
        ],
        invalid: [
            {
                code: "class A { constructor() { new.target } }",
                options: [{ version: "4.9.9", ignores: ["classes"] }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "new-target",
                            supported: ">=5.0.0",
                            version: "4.9.9",
                        },
                    },
                ],
            },
            {
                code: "function A() { new.target }",
                options: [{ version: "4.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "new-target",
                            supported: ">=5.0.0",
                            version: "4.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "objectSuperProperties",
        valid: [
            {
                code: "class A { foo() { super.foo } }",
                options: [{ version: "3.9.9", ignores: ["classes"] }],
            },
            {
                code: "(class { foo() { super.foo } })",
                options: [{ version: "3.9.9", ignores: ["classes"] }],
            },
            {
                code: "class A extends B { constructor() { super() } }",
                options: [{ version: "3.9.9", ignores: ["classes"] }],
            },
            {
                code: "({ foo() { super.foo } })",
                options: [
                    { version: "4.0.0", ignores: ["propertyShorthands"] },
                ],
            },
            {
                code: "({ foo() { super.foo() } })",
                options: [
                    { version: "4.0.0", ignores: ["propertyShorthands"] },
                ],
            },
        ],
        invalid: [
            {
                code: "({ foo() { super.foo } })",
                options: [
                    { version: "3.9.9", ignores: ["propertyShorthands"] },
                ],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "object-super-properties",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
            {
                code: "({ foo() { super.foo() } })",
                options: [
                    { version: "3.9.9", ignores: ["propertyShorthands"] },
                ],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "object-super-properties",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "octalNumericLiterals",
        valid: [
            {
                code: "0755",
                options: [{ version: "3.9.9" }],
            },
            {
                code: "0x755",
                options: [{ version: "3.9.9" }],
            },
            {
                code: "0X755",
                options: [{ version: "3.9.9" }],
            },
            {
                code: "0b01",
                options: [
                    {
                        version: "3.9.9",
                        ignores: ["binaryNumericLiterals"],
                    },
                ],
            },
            {
                code: "0B01",
                options: [
                    {
                        version: "3.9.9",
                        ignores: ["binaryNumericLiterals"],
                    },
                ],
            },
            {
                code: "0o755",
                options: [{ version: "4.0.0" }],
            },
            {
                code: "0O755",
                options: [{ version: "4.0.0" }],
            },
        ],
        invalid: [
            {
                code: "0o755",
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "octal-numeric-literals",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
            {
                code: "0O755",
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "octal-numeric-literals",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "propertyShorthands",
        valid: [
            {
                code: "({ a: 1 })",
                options: [{ version: "3.9.9" }],
            },
            {
                code: "({ get: get })",
                options: [{ version: "3.9.9" }],
            },
            {
                code: "({ get a() {} })",
                options: [{ version: "3.9.9" }],
            },
            {
                code: "({ a })",
                options: [{ version: "4.0.0" }],
            },
            {
                code: "({ b() {} })",
                options: [{ version: "4.0.0" }],
            },
            {
                code: "({ get() {} })",
                options: [{ version: "4.0.0" }],
            },
            {
                code: "({ [c]() {} })",
                options: [
                    { version: "4.0.0", ignores: ["computedProperties"] },
                ],
            },
            {
                code: "({ get })",
                options: [{ version: "6.0.0" }],
            },
            {
                code: "({ set })",
                options: [{ version: "6.0.0" }],
            },
        ],
        invalid: [
            {
                code: "({ a })",
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "property-shorthands",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
            {
                code: "({ b() {} })",
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "property-shorthands",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
            {
                code: "({ [c]() {} })",
                options: [
                    { version: "3.9.9", ignores: ["computedProperties"] },
                ],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "property-shorthands",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
            // TODO: Additional es-syntax
            // {
            //     code: "({ get })",
            //     options: [{ version: "3.9.9" }],
            //     errors: [
            //         {
            //             messageId: "not-supported-till",
            //             data: { featureName: "property-shorthands-getset", supported: ">=6.0.0", version: "3.9.9" },
            //         },
            //     ],
            // },
            // {
            //     code: "({ set })",
            //     options: [{ version: "3.9.9" }],
            //     errors: [
            //         {
            //             messageId: "not-supported-till",
            //             data: { featureName: "property-shorthands-getset", supported: ">=6.0.0", version: "3.9.9" },
            //         },
            //     ],
            // },
            // {
            //     code: "({ get })",
            //     options: [{ version: "5.9.9" }],
            //     errors: [
            //         {
            //             messageId: "not-supported-till",
            //             data: { featureName: "property-shorthands-getset", supported: ">=6.0.0", version: "5.9.9" },
            //         },
            //     ],
            // },
            // {
            //     code: "({ set })",
            //     options: [{ version: "5.9.9" }],
            //     errors: [
            //         {
            //             messageId: "not-supported-till",
            //             data: { featureName: "property-shorthands-getset", supported: ">=6.0.0", version: "5.9.9" },
            //         },
            //     ],
            // },
        ],
    },
    {
        keyword: ["regexpU", "regexpUFlag"],
        valid: [
            {
                code: "/foo/",
                options: [{ version: "5.9.9" }],
            },
            {
                code: "/foo/gmi",
                options: [{ version: "5.9.9" }],
            },
            {
                code: "/foo/y",
                options: [{ version: "5.9.9", ignores: ["regexpYFlag"] }],
            },
            {
                code: "/foo/u",
                options: [{ version: "6.0.0" }],
            },
        ],
        invalid: [
            {
                code: "/foo/u",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "regexp-u-flag",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: ["regexpY", "regexpYFlag"],
        valid: [
            {
                code: "/foo/",
                options: [{ version: "5.9.9" }],
            },
            {
                code: "/foo/gmi",
                options: [{ version: "5.9.9" }],
            },
            {
                code: "/foo/u",
                options: [{ version: "5.9.9", ignores: ["regexpUFlag"] }],
            },
            {
                code: "/foo/y",
                options: [{ version: "6.0.0" }],
            },
        ],
        invalid: [
            {
                code: "/foo/y",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "regexp-y-flag",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "restParameters",
        valid: [
            {
                code: "var [...a] = b",
                options: [{ version: "5.9.9", ignores: ["destructuring"] }],
            },
            {
                code: "var {...a} = b",
                options: [
                    {
                        version: "5.9.9",
                        ignores: ["destructuring", "restSpreadProperties"],
                    },
                ],
            },
            {
                code: "var a = [...b]",
                options: [{ version: "5.9.9" }],
            },
            {
                code: "var a = {...b}",
                options: [
                    { version: "5.9.9", ignores: ["restSpreadProperties"] },
                ],
            },
            {
                code: "f(...a)",
                options: [{ version: "5.9.9" }],
            },
            {
                code: "function f(...a) {}",
                options: [{ version: "6.0.0" }],
            },
            {
                code: "function f(...[a, b = 0]) {}",
                options: [{ version: "6.0.0", ignores: ["destructuring"] }],
            },
            {
                code: "(function(...a) {})",
                options: [{ version: "6.0.0" }],
            },
            {
                code: "((...a) => {})",
                options: [{ version: "6.0.0" }],
            },
            {
                code: "({ f(...a) {} })",
                options: [{ version: "6.0.0" }],
            },
            {
                code: "class A { f(...a) {} }",
                options: [{ version: "6.0.0", ignores: ["classes"] }],
            },
            {
                code: "(class { f(...a) {} })",
                options: [{ version: "6.0.0", ignores: ["classes"] }],
            },
        ],
        invalid: [
            {
                code: "function f(...a) {}",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "rest-parameters",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
            {
                code: "function f(...[a, b = 0]) {}",
                options: [{ version: "5.9.9", ignores: ["destructuring"] }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "rest-parameters",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
            {
                code: "(function(...a) {})",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "rest-parameters",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
            {
                code: "((...a) => {})",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "rest-parameters",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
            {
                code: "({ f(...a) {} })",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "rest-parameters",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
            {
                code: "class A { f(...a) {} }",
                options: [{ version: "5.9.9", ignores: ["classes"] }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "rest-parameters",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
            {
                code: "(class { f(...a) {} })",
                options: [{ version: "5.9.9", ignores: ["classes"] }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "rest-parameters",
                            supported: ">=6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "spreadElements",
        valid: [
            {
                code: "var [...a] = b",
                options: [{ version: "4.9.9", ignores: ["destructuring"] }],
            },
            {
                code: "var {...a} = b",
                options: [
                    {
                        version: "4.9.9",
                        ignores: ["destructuring", "restSpreadProperties"],
                    },
                ],
            },
            {
                code: "var a = {...b}",
                options: [
                    {
                        version: "4.9.9",
                        ignores: ["restSpreadProperties"],
                    },
                ],
            },
            {
                code: "function f(...a) {}",
                options: [{ version: "4.9.9", ignores: ["restParameters"] }],
            },
            {
                code: "[...a]",
                options: [{ version: "5.0.0" }],
            },
            {
                code: "[...a, ...b]",
                options: [{ version: "5.0.0" }],
            },
            {
                code: "f(...a)",
                options: [{ version: "5.0.0" }],
            },
            {
                code: "new F(...a)",
                options: [{ version: "5.0.0" }],
            },
        ],
        invalid: [
            {
                code: "[...a]",
                options: [{ version: "4.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "spread-elements",
                            supported: ">=5.0.0",
                            version: "4.9.9",
                        },
                    },
                ],
            },
            {
                code: "[...a, ...b]",
                options: [{ version: "4.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "spread-elements",
                            supported: ">=5.0.0",
                            version: "4.9.9",
                        },
                    },
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "spread-elements",
                            supported: ">=5.0.0",
                            version: "4.9.9",
                        },
                    },
                ],
            },
            {
                code: "f(...a)",
                options: [{ version: "4.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "spread-elements",
                            supported: ">=5.0.0",
                            version: "4.9.9",
                        },
                    },
                ],
            },
            {
                code: "new F(...a)",
                options: [{ version: "4.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "spread-elements",
                            supported: ">=5.0.0",
                            version: "4.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "templateLiterals",
        valid: [
            {
                code: "'`foo`'",
                options: [{ version: "3.9.9" }],
            },
            {
                code: "`foo`",
                options: [{ version: "4.0.0" }],
            },
            {
                code: "`foo${a}bar`",
                options: [{ version: "4.0.0" }],
            },
            {
                code: "tag`foo`",
                options: [{ version: "4.0.0" }],
            },
            {
                code: "tag`foo${a}bar`",
                options: [{ version: "4.0.0" }],
            },
        ],
        invalid: [
            {
                code: "`foo`",
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "template-literals",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
            {
                code: "`foo${a}bar`",
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "template-literals",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
            {
                code: "tag`foo`",
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "template-literals",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
            {
                code: "tag`foo${a}bar`",
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "template-literals",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: ["unicodeCodePointEscapes", "unicodeCodepointEscapes"],
        valid: [
            {
                code: String.raw`var a = "\x61"`,
                options: [{ version: "3.9.9" }],
            },
            {
                code: String.raw`var a = "\u0061"`,
                options: [{ version: "3.9.9" }],
            },
            {
                code: String.raw`var a = "\\u{61}"`,
                options: [{ version: "3.9.9" }],
            },
            {
                code: String.raw`var \u{61} = 0`,
                options: [{ version: "4.0.0" }],
            },
            {
                code: String.raw`var a = "\u{61}"`,
                options: [{ version: "4.0.0" }],
            },
            {
                code: String.raw`var a = '\u{61}'`,
                options: [{ version: "4.0.0" }],
            },
            {
                code: "var a = `\\u{61}`",
                options: [{ version: "4.0.0" }],
            },
        ],
        invalid: [
            {
                code: String.raw`var \u{61} = 0`,
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "unicode-codepoint-escapes",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
            {
                code: String.raw`var a = "\u{61}"`,
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "unicode-codepoint-escapes",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
            {
                code: String.raw`var a = "\\\u{61}"`,
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "unicode-codepoint-escapes",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
            {
                code: String.raw`var a = '\u{61}'`,
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "unicode-codepoint-escapes",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
            {
                code: "var a = `\\u{61}`",
                options: [{ version: "3.9.9", ignores: ["templateLiterals"] }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "unicode-codepoint-escapes",
                            supported: ">=4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
        ],
    },

    //----------------------------------------------------------------------
    // ES2016
    //----------------------------------------------------------------------
    {
        keyword: "exponentialOperators",
        valid: [
            {
                code: "a ** b",
                options: [{ version: "7.0.0" }],
            },
            {
                code: "a **= b",
                options: [{ version: "7.0.0" }],
            },
            {
                code: "a * b",
                options: [{ version: "6.9.9" }],
            },
            {
                code: "a *= b",
                options: [{ version: "6.9.9" }],
            },
        ],
        invalid: [
            {
                code: "a ** b",
                options: [{ version: "6.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "exponential-operators",
                            supported: ">=7.0.0",
                            version: "6.9.9",
                        },
                    },
                ],
            },
            {
                code: "a **= b",
                options: [{ version: "6.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "exponential-operators",
                            supported: ">=7.0.0",
                            version: "6.9.9",
                        },
                    },
                ],
            },
        ],
    },

    //----------------------------------------------------------------------
    // ES2017
    //----------------------------------------------------------------------
    {
        keyword: "asyncFunctions",
        valid: [
            {
                code: "async function f() {}",
                options: [{ version: "7.6.0" }],
            },
            {
                code: "async function f() { await 1 }",
                options: [{ version: "7.6.0" }],
            },
            {
                code: "(async function() { await 1 })",
                options: [{ version: "7.6.0" }],
            },
            {
                code: "(async() => { await 1 })",
                options: [{ version: "7.6.0" }],
            },
            {
                code: "({ async method() { await 1 } })",
                options: [{ version: "7.6.0" }],
            },
            {
                code: "class A { async method() { await 1 } }",
                options: [{ version: "7.6.0" }],
            },
            {
                code: "(class { async method() { await 1 } })",
                options: [{ version: "7.6.0" }],
            },
        ],
        invalid: [
            {
                code: "async function f() {}",
                options: [{ version: "7.5.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "async-functions",
                            supported: ">=7.6.0",
                            version: "7.5.9",
                        },
                    },
                ],
            },
            {
                code: "async function f() { await 1 }",
                options: [{ version: "7.5.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "async-functions",
                            supported: ">=7.6.0",
                            version: "7.5.9",
                        },
                    },
                ],
            },
            {
                code: "(async function() { await 1 })",
                options: [{ version: "7.5.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "async-functions",
                            supported: ">=7.6.0",
                            version: "7.5.9",
                        },
                    },
                ],
            },
            {
                code: "(async() => { await 1 })",
                options: [{ version: "7.5.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "async-functions",
                            supported: ">=7.6.0",
                            version: "7.5.9",
                        },
                    },
                ],
            },
            {
                code: "({ async method() { await 1 } })",
                options: [{ version: "7.5.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "async-functions",
                            supported: ">=7.6.0",
                            version: "7.5.9",
                        },
                    },
                ],
            },
            {
                code: "class A { async method() { await 1 } }",
                options: [{ version: "7.5.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "async-functions",
                            supported: ">=7.6.0",
                            version: "7.5.9",
                        },
                    },
                ],
            },
            {
                code: "(class { async method() { await 1 } })",
                options: [{ version: "7.5.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "async-functions",
                            supported: ">=7.6.0",
                            version: "7.5.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: ["trailingCommasInFunctions", "trailingFunctionCommas"],
        valid: [
            {
                code: "function f(a,) {}",
                options: [{ version: "8.0.0" }],
            },
            {
                code: "(function(a,) {})",
                options: [{ version: "8.0.0" }],
            },
            {
                code: "((a,) => {})",
                options: [{ version: "8.0.0" }],
            },
            {
                code: "({ method(a,) {} })",
                options: [{ version: "8.0.0" }],
            },
            {
                code: "class A { method(a,) {} }",
                options: [{ version: "8.0.0" }],
            },
            {
                code: "(class { method(a,) {} })",
                options: [{ version: "8.0.0" }],
            },
            {
                code: "f(1,)",
                options: [{ version: "8.0.0" }],
            },
            {
                code: "new A(1,)",
                options: [{ version: "8.0.0" }],
            },
        ],
        invalid: [
            {
                code: "function f(a,) {}",
                options: [{ version: "7.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "trailing-function-commas",
                            supported: ">=8.0.0",
                            version: "7.9.9",
                        },
                    },
                ],
            },
            {
                code: "(function(a,) {})",
                options: [{ version: "7.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "trailing-function-commas",
                            supported: ">=8.0.0",
                            version: "7.9.9",
                        },
                    },
                ],
            },
            {
                code: "((a,) => {})",
                options: [{ version: "7.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "trailing-function-commas",
                            supported: ">=8.0.0",
                            version: "7.9.9",
                        },
                    },
                ],
            },
            {
                code: "({ method(a,) {} })",
                options: [{ version: "7.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "trailing-function-commas",
                            supported: ">=8.0.0",
                            version: "7.9.9",
                        },
                    },
                ],
            },
            {
                code: "class A { method(a,) {} }",
                options: [{ version: "7.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "trailing-function-commas",
                            supported: ">=8.0.0",
                            version: "7.9.9",
                        },
                    },
                ],
            },
            {
                code: "(class { method(a,) {} })",
                options: [{ version: "7.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "trailing-function-commas",
                            supported: ">=8.0.0",
                            version: "7.9.9",
                        },
                    },
                ],
            },
            {
                code: "f(1,)",
                options: [{ version: "7.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "trailing-function-commas",
                            supported: ">=8.0.0",
                            version: "7.9.9",
                        },
                    },
                ],
            },
            {
                code: "new A(1,)",
                options: [{ version: "7.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "trailing-function-commas",
                            supported: ">=8.0.0",
                            version: "7.9.9",
                        },
                    },
                ],
            },
        ],
    },

    //----------------------------------------------------------------------
    // ES2018
    //----------------------------------------------------------------------
    {
        keyword: "asyncIteration",
        valid: [
            {
                code: "async function f() { for await (const x of xs) {} }",
                options: [{ version: "10.0.0" }],
            },
            {
                code: "async function* f() { }",
                options: [{ version: "10.0.0" }],
            },
            {
                code: "(async function* () { })",
                options: [{ version: "10.0.0" }],
            },
            {
                code: "({ async* method() { } })",
                options: [{ version: "10.0.0" }],
            },
            {
                code: "class A { async* method() { } }",
                options: [{ version: "10.0.0" }],
            },
            {
                code: "(class { async* method() { } })",
                options: [{ version: "10.0.0" }],
            },
            {
                code: "function f() { for (const x of xs) {} }",
                options: [{ version: "9.9.9" }],
            },
            {
                code: "async function f() { }",
                options: [{ version: "9.9.9" }],
            },
            {
                code: "function* f() { }",
                options: [{ version: "9.9.9" }],
            },
        ],
        invalid: [
            {
                code: "async function f() { for await (const x of xs) {} }",
                options: [{ version: "9.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "async-iteration",
                            supported: ">=10.0.0",
                            version: "9.9.9",
                        },
                    },
                ],
            },
            {
                code: "async function* f() { }",
                options: [{ version: "9.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "async-iteration",
                            supported: ">=10.0.0",
                            version: "9.9.9",
                        },
                    },
                ],
            },
            {
                code: "(async function* () { })",
                options: [{ version: "9.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "async-iteration",
                            supported: ">=10.0.0",
                            version: "9.9.9",
                        },
                    },
                ],
            },
            {
                code: "({ async* method() { } })",
                options: [{ version: "9.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "async-iteration",
                            supported: ">=10.0.0",
                            version: "9.9.9",
                        },
                    },
                ],
            },
            {
                code: "class A { async* method() { } }",
                options: [{ version: "9.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "async-iteration",
                            supported: ">=10.0.0",
                            version: "9.9.9",
                        },
                    },
                ],
            },
            {
                code: "(class { async* method() { } })",
                options: [{ version: "9.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "async-iteration",
                            supported: ">=10.0.0",
                            version: "9.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "malformedTemplateLiterals",
        valid: [
            {
                code: "tag`\\unicode`",
                options: [{ version: "8.10.0" }],
            },
        ],
        invalid: [
            {
                code: "tag`\\unicode`",
                options: [{ version: "8.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "malformed-template-literals",
                            supported: ">=8.10.0",
                            version: "8.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: ["regexpLookbehind", "regexpLookbehindAssertions"],
        valid: [
            {
                code: "var a = /(?<=a)foo/",
                options: [{ version: "8.10.0" }],
            },
            {
                code: "var a = /(?<!a)foo/",
                options: [{ version: "8.10.0" }],
            },
            {
                code: 'var a = new RegExp("/(?<=a)foo/")',
                options: [{ version: "8.10.0" }],
            },
            {
                code: "var a = new RegExp(pattern)",
                options: [{ version: "8.9.9" }],
            },
            {
                code: 'var a = new RegExp("(?<=")',
                options: [{ version: "8.9.9" }],
            },
            {
                code: "var a = /\\(?<=a\\)foo/",
                options: [{ version: "8.9.9" }],
            },
        ],
        invalid: [
            {
                code: "var a = /(?<=a)foo/",
                options: [{ version: "8.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "regexp-lookbehind-assertions",
                            supported: ">=8.10.0",
                            version: "8.9.9",
                        },
                    },
                ],
            },
            {
                code: "var a = /(?<!a)foo/",
                options: [{ version: "8.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "regexp-lookbehind-assertions",
                            supported: ">=8.10.0",
                            version: "8.9.9",
                        },
                    },
                ],
            },
            {
                code: 'var a = new RegExp("/(?<=a)foo/")',
                options: [{ version: "8.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "regexp-lookbehind-assertions",
                            supported: ">=8.10.0",
                            version: "8.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "regexpNamedCaptureGroups",
        valid: [
            {
                code: "var a = /(?<key>a)foo/",
                options: [{ version: "10.0.0" }],
            },
            {
                code: "var a = /(?<key>a)\\k<key>/",
                options: [{ version: "10.0.0" }],
            },
            {
                code: 'var a = new RegExp("(?<key>a)foo")',
                options: [{ version: "10.0.0" }],
            },
            {
                code: "var a = new RegExp(pattern)",
                options: [{ version: "8.9.9" }],
            },
            {
                code: 'var a = new RegExp("(?<key")',
                options: [{ version: "8.9.9" }],
            },
            {
                code: "var a = /\\(?<key>a\\)foo/",
                options: [{ version: "8.9.9" }],
            },
        ],
        invalid: [
            {
                code: "var a = /(?<key>a)foo/",
                options: [{ version: "9.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "regexp-named-capture-groups",
                            supported: ">=10.0.0",
                            version: "9.9.9",
                        },
                    },
                ],
            },
            {
                code: "var a = /(?<key>a)\\k<key>/",
                options: [{ version: "9.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "regexp-named-capture-groups",
                            supported: ">=10.0.0",
                            version: "9.9.9",
                        },
                    },
                ],
            },
            {
                code: 'var a = new RegExp("(?<key>a)foo")',
                options: [{ version: "9.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "regexp-named-capture-groups",
                            supported: ">=10.0.0",
                            version: "9.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: ["regexpS", "regexpSFlag"],
        valid: [
            {
                code: "var a = /foo/s",
                options: [{ version: "8.10.0" }],
            },
            {
                code: 'var a = new RegExp("foo", "s")',
                options: [{ version: "8.10.0" }],
            },
            {
                code: "var a = new RegExp(a, b)",
                options: [{ version: "8.9.9" }],
            },
            {
                code: 'var a = new RegExp("(aaaaa", b)',
                options: [{ version: "8.9.9" }],
            },
        ],
        invalid: [
            {
                code: "var a = /foo/s",
                options: [{ version: "8.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "regexp-s-flag",
                            supported: ">=8.10.0",
                            version: "8.9.9",
                        },
                    },
                ],
            },
            {
                code: 'var a = new RegExp("foo", "s")',
                options: [{ version: "8.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "regexp-s-flag",
                            supported: ">=8.10.0",
                            version: "8.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: ["regexpUnicodeProperties", "regexpUnicodePropertyEscapes"],
        valid: [
            {
                code: "var a = /\\p{Letter}/u",
                options: [{ version: "10.0.0" }],
            },
            {
                code: "var a = /\\P{Letter}/u",
                options: [{ version: "10.0.0" }],
            },
            {
                code: 'var a = new RegExp("\\\\p{Letter}", "u")',
                options: [{ version: "10.0.0" }],
            },
            {
                code: 'var a = new RegExp("\\\\p{Letter}")',
                options: [{ version: "9.9.9" }],
            },
            {
                code: 'var a = new RegExp(pattern, "u")',
                options: [{ version: "9.9.9" }],
            },
            {
                code: 'var a = new RegExp("\\\\p{Letter")',
                options: [{ version: "9.9.9" }],
            },
        ],
        invalid: [
            {
                code: "var a = /\\p{Letter}/u",
                options: [{ version: "9.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "regexp-unicode-property-escapes",
                            supported: ">=10.0.0",
                            version: "9.9.9",
                        },
                    },
                ],
            },
            {
                code: "var a = /\\P{Letter}/u",
                options: [{ version: "9.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "regexp-unicode-property-escapes",
                            supported: ">=10.0.0",
                            version: "9.9.9",
                        },
                    },
                ],
            },
            {
                code: 'var a = new RegExp("\\\\p{Letter}", "u")',
                options: [{ version: "9.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "regexp-unicode-property-escapes",
                            supported: ">=10.0.0",
                            version: "9.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "restSpreadProperties",
        valid: [
            {
                code: "({ ...obj })",
                options: [{ version: "8.3.0" }],
            },
            {
                code: "({ ...rest } = obj)",
                options: [{ version: "8.3.0" }],
            },
            {
                code: "({ obj })",
                options: [{ version: "8.2.9" }],
            },
            {
                code: "({ obj: 1 })",
                options: [{ version: "8.2.9" }],
            },
            {
                code: "({ obj } = a)",
                options: [{ version: "8.2.9" }],
            },
            {
                code: "({ obj: a } = b)",
                options: [{ version: "8.2.9" }],
            },
            {
                code: "([...xs])",
                options: [{ version: "8.2.9" }],
            },
            {
                code: "([a, ...xs] = ys)",
                options: [{ version: "8.2.9" }],
            },
        ],
        invalid: [
            {
                code: "({ ...obj })",
                options: [{ version: "8.2.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "rest-spread-properties",
                            supported: ">=8.3.0",
                            version: "8.2.9",
                        },
                    },
                ],
            },
            {
                code: "({ ...rest } = obj)",
                options: [{ version: "8.2.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "rest-spread-properties",
                            supported: ">=8.3.0",
                            version: "8.2.9",
                        },
                    },
                ],
            },
        ],
    },

    //----------------------------------------------------------------------
    // ES2019
    //----------------------------------------------------------------------
    {
        keyword: "jsonSuperset",
        valid: [
            {
                code: "var s = 'foo'",
                options: [{ version: "9.99.99" }],
            },
            {
                code: "var s = '\\\u2028'",
                options: [{ version: "9.99.99" }],
            },
            {
                code: "var s = '\\\u2029'",
                options: [{ version: "9.99.99" }],
            },
            {
                code: "var s = '\u2028'",
                options: [{ version: "10.0.0" }],
            },
            {
                code: "var s = '\u2029'",
                options: [{ version: "10.0.0" }],
            },
        ],
        invalid: [
            {
                code: "var s = '\u2028'",
                options: [{ version: "9.99.99" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "json-superset",
                            code: "2028",
                            supported: ">=10.0.0",
                            version: "9.99.99",
                        },
                    },
                ],
            },
            {
                code: "var s = '\u2029'",
                options: [{ version: "9.99.99" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "json-superset",
                            code: "2029",
                            supported: ">=10.0.0",
                            version: "9.99.99",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "optionalCatchBinding",
        valid: [
            {
                code: "try {} catch {}",
                options: [{ version: "10.0.0" }],
            },
            {
                code: "try {} catch (error) {}",
                options: [{ version: "9.99.99" }],
            },
        ],
        invalid: [
            {
                code: "try {} catch {}",
                options: [{ version: "9.99.99" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "optional-catch-binding",
                            supported: ">=10.0.0",
                            version: "9.99.99",
                        },
                    },
                ],
            },
        ],
    },

    //----------------------------------------------------------------------
    // ES2020
    //----------------------------------------------------------------------
    {
        keyword: "bigint",
        requiredEcmaVersion: 2020,
        valid: [
            {
                code: "var n = 0n",
                options: [{ version: "10.4.0" }],
            },
            {
                code: "var n = BigInt(0)",
                options: [{ version: "10.4.0" }],
            },
            {
                code: "var n = new BigInt64Array()",
                options: [{ version: "10.4.0" }],
            },
            {
                code: "var n = new BigUint64Array()",
                options: [{ version: "10.4.0" }],
            },
            {
                code: "var n = { [0n]: 0 }",
                options: [{ version: "10.4.0" }],
            },
            {
                code: "var n = class { [0n]() {} }",
                options: [{ version: "10.4.0" }],
            },
        ],
        invalid: [
            {
                code: "var n = 0n",
                options: [{ version: "10.3.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "bigint",
                            supported: ">=10.4.0",
                            version: "10.3.0",
                        },
                    },
                ],
            },
            // {
            //     code: "var n = { 0n: 0 }",
            //     options: [{ version: "12.0.0" }],
            //     errors: [
            //         {
            //             messageId: "not-supported-till",
            //             data: {
            //                 featureName: "bigint-property-names",
            //                 supported: null,
            //                 version: "12.0.0",
            //             },
            //         },
            //     ],
            // },
            // {
            //     code: "var n = class { 0n() {} }",
            //     options: [{ version: "12.0.0" }],
            //     errors: [
            //         {
            //             messageId: "not-supported-till",
            //             data: {
            //                 featureName: "bigint-property-names",
            //                 supported: null,
            //                 version: "12.0.0",
            //             },
            //         },
            //     ],
            // },
        ],
    },
    {
        keyword: "dynamicImport",
        requiredEcmaVersion: 2020,
        valid: [
            {
                code: "obj.import(source)",
                options: [{ version: "12.0.0" }],
            },
            {
                code: "import(source)",
                options: [{ version: "12.17.0" }],
            },
            {
                code: "import(source)",
                options: [{ version: "13.2.0" }],
            },
        ],
        invalid: ["12.16.0", "13.0.0", "13.1.0", ">=8.0.0"].map(version => ({
            code: "import(source)",
            options: [{ version: version }],
            errors: [
                {
                    messageId: "not-supported-till",
                    data: {
                        featureName: "dynamic-import",
                        supported: "^12.17.0 || >=13.2.0",
                        version: version,
                    },
                },
            ],
        })),
    },
    {
        keyword: "optionalChaining",
        requiredEcmaVersion: 2020,
        valid: [
            {
                code: "foo?.bar;",
                options: [{ version: "14.0.0" }],
            },
        ],
        invalid: [
            {
                code: "foo?.bar",
                options: [{ version: "13.0.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "optional-chaining",
                            supported: ">=14.0.0",
                            version: "13.0.0",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "nullishCoalescingOperators",
        requiredEcmaVersion: 2020,
        valid: [
            {
                code: "foo ?? bar;",
                options: [{ version: "14.0.0" }],
            },
            {
                code: "foo ?? bar;",
                settings: {
                    node: { version: "14.0.0" },
                },
            },
        ],
        invalid: [
            {
                code: "foo ?? bar",
                options: [{ version: "13.0.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "nullish-coalescing-operators",
                            supported: ">=14.0.0",
                            version: "13.0.0",
                        },
                    },
                ],
            },
            {
                code: "foo ?? bar",
                settings: {
                    node: { version: "13.0.0" },
                },
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "nullish-coalescing-operators",
                            supported: ">=14.0.0",
                            version: "13.0.0",
                        },
                    },
                ],
            },
        ],
    },

    //----------------------------------------------------------------------
    // ES2021
    //----------------------------------------------------------------------
    {
        keyword: "logicalAssignmentOperators",
        requiredEcmaVersion: 2021,
        valid: [
            {
                code: "a ||= b",
                options: [{ version: "15.0.0" }],
            },
            {
                code: "a &&= b",
                options: [{ version: "15.0.0" }],
            },
            {
                code: "a ??= b",
                options: [{ version: "15.0.0" }],
            },
        ],
        invalid: [
            {
                code: "a ||= b",
                options: [{ version: "14.0.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "logical-assignment-operators",
                            supported: ">=15.0.0",
                            version: "14.0.0",
                        },
                    },
                ],
            },
            {
                code: "a &&= b",
                options: [{ version: "14.0.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "logical-assignment-operators",
                            supported: ">=15.0.0",
                            version: "14.0.0",
                        },
                    },
                ],
            },
            {
                code: "a ??= b",
                options: [{ version: "14.0.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "logical-assignment-operators",
                            supported: ">=15.0.0",
                            version: "14.0.0",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "numericSeparators",
        requiredEcmaVersion: 2021,
        valid: [
            {
                code: "a = 123_456_789",
                options: [{ version: "12.5.0" }],
            },
        ],
        invalid: [
            {
                code: "a = 123_456_789",
                options: [{ version: "12.4.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "numeric-separators",
                            supported: ">=12.5.0",
                            version: "12.4.0",
                        },
                    },
                ],
            },
        ],
    },
    //----------------------------------------------------------------------
    // MISC
    //----------------------------------------------------------------------
    {
        keywords: [],
        valid: [
            {
                filename: fixture("gte-4.0.0/a.js"),
                code: "var a = () => 1",
            },
            {
                filename: fixture("gte-4.4.0-lt-5.0.0/a.js"),
                code: "var a = () => 1",
            },
            {
                filename: fixture("hat-4.1.2/a.js"),
                code: "var a = () => 1",
            },
            {
                code: "'\\\\u{0123}'",
            },
            {
                filename: fixture("gte-4.0.0/a.js"),
                code: "var a = async () => 1",
                options: [{ ignores: ["asyncFunctions"] }],
            },
            {
                filename: fixture("gte-7.6.0/a.js"),
                code: "var a = async () => 1",
            },
            {
                filename: fixture("gte-7.10.0/a.js"),
                code: "var a = async () => 1",
            },
            {
                filename: fixture("invalid/a.js"),
                code: "var a = () => 1",
            },
            {
                filename: fixture("nothing/a.js"),
                code: "var a = () => 1",
            },
            {
                code: "var a = async () => 1",
                options: [{ version: "7.10.0" }],
            },
            {
                code: "var a = async () => 1",
                settings: {
                    node: { version: "7.10.0" },
                },
            },
            {
                filename: fixture("without-node/a.js"),
                code: "var a = () => 1",
            },
        ],
        invalid: [
            {
                filename: fixture("gte-0.12.8/a.js"),
                code: "var a = () => 1",
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "arrow-functions",
                            supported: ">=4.0.0",
                            version: ">=0.12.8",
                        },
                    },
                ],
            },
            {
                filename: fixture("invalid/a.js"),
                code: "var a = { ...obj }",
                options: [{ version: ">=8.0.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "rest-spread-properties",
                            supported: ">=8.3.0",
                            version: ">=8.0.0",
                        },
                    },
                ],
            },
            {
                filename: fixture("lt-6.0.0/a.js"),
                code: "var a = () => 1",
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "arrow-functions",
                            supported: ">=4.0.0",
                            version: "<6.0.0",
                        },
                    },
                ],
            },
            {
                filename: fixture("nothing/a.js"),
                code: "var a = { ...obj }",
                options: [{ version: ">=8.0.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "rest-spread-properties",
                            supported: ">=8.3.0",
                            version: ">=8.0.0",
                        },
                    },
                ],
            },
            {
                filename: fixture("gte-7.5.0/a.js"),
                code: "var a = async () => 1",
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "async-functions",
                            supported: ">=7.6.0",
                            version: ">=7.5.0",
                        },
                    },
                ],
            },
            {
                filename: fixture("star/a.js"),
                code: '"use strict"; let a = 1',
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "block-scoped-variables",
                            supported: ">=4.0.0",
                            version: "*",
                        },
                    },
                ],
            },
            {
                code: "var a = async () => 1",
                options: [{ version: "7.1.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "async-functions",
                            supported: ">=7.6.0",
                            version: "7.1.0",
                        },
                    },
                ],
            },
            {
                code: "var a = async () => 1",
                settings: {
                    node: { version: "7.1.0" },
                },
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            featureName: "async-functions",
                            supported: ">=7.6.0",
                            version: "7.1.0",
                        },
                    },
                ],
            },
        ],
    },
])
