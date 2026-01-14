/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"
const { RuleTester } = require("#test-helpers")
const rule = require("../../../../lib/rules/no-unsupported-features/es-builtins")
const globals = require("globals")

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
        languageOptions: {
            ecmaVersion: "latest",
            globals: globals.builtin,
        },
    })

    for (const pattern of patterns) {
        const tests = {
            valid: pattern.valid,
            invalid: pattern.invalid,
        }

        // Add the invalid patterns with `ignores` option into the valid patterns.
        const additionalValid = pattern.invalid
            .map(ignores(pattern.keyword))
            .map(it => {
                const item = { ...it }
                delete item.errors
                return item
            })

        tests.valid.push(...additionalValid)

        ruleTester.run("no-unsupported-features/es-builtins", rule, tests)
    }
}

runTests([
    {
        keyword: "AggregateError",
        valid: [
            {
                code: "if (error instanceof AggregateError) {}",
                options: [{ version: "15.0.0" }],
            },
        ],
        invalid: [
            {
                code: "if (error instanceof AggregateError) {}",
                options: [{ version: "14.0.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "AggregateError",
                            supported: "15.0.0",
                            version: "14.0.0",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Array.from",
        valid: [
            {
                code: "Array.foo(a)",
                options: [{ version: "3.9.9" }],
            },
            {
                code: "(function(Array) { Array.from(a) }(b))",
                options: [{ version: "3.9.9" }],
            },
            {
                code: "Array.from(a)",
                options: [{ version: "4.0.0" }],
            },
        ],
        invalid: [
            {
                code: "Array.from(a)",
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Array.from",
                            supported: "4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Array.of",
        valid: [
            {
                code: "Array.foo(a)",
                options: [{ version: "3.9.9" }],
            },
            {
                code: "(function(Array) { Array.of(a) }(b))",
                options: [{ version: "3.9.9" }],
            },
            {
                code: "Array.of(a)",
                options: [{ version: "4.0.0" }],
            },
        ],
        invalid: [
            {
                code: "Array.of(a)",
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Array.of",
                            supported: "4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "BigInt",
        valid: [
            {
                code: "bigint",
                options: [{ version: "10.3.0" }],
            },
            {
                code: "(function(BigInt) { BigInt }(b))",
                options: [{ version: "10.3.0" }],
            },
            {
                code: "BigInt",
                options: [{ version: "10.4.0" }],
            },
        ],
        invalid: [
            {
                code: "BigInt",
                options: [{ version: "10.3.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "BigInt",
                            supported: "10.4.0",
                            version: "10.3.0",
                        },
                    },
                ],
            },
            {
                code: "(function() { BigInt })()",
                options: [{ version: "10.3.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "BigInt",
                            supported: "10.4.0",
                            version: "10.3.0",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "FinalizationRegistry",
        valid: [
            {
                code: "new FinalizationRegistry(() => {})",
                options: [{ version: "14.6.0" }],
            },
        ],
        invalid: [
            {
                code: "new FinalizationRegistry(() => {})",
                options: [{ version: "14.5.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "FinalizationRegistry",
                            supported: "14.6.0",
                            version: "14.5.0",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Map",
        valid: [
            {
                code: "map",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "(function(Map) { Map }(b))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Map",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Map",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Map",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
            {
                code: "(function() { Map })()",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Map",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Math.acosh",
        valid: [
            {
                code: "Math.foo(a)",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "(function(Math) { Math.acosh(a) }(b))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Math.acosh(a)",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Math.acosh(a)",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Math.acosh",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Math.asinh",
        valid: [
            {
                code: "Math.foo(a)",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "(function(Math) { Math.asinh(a) }(b))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Math.asinh(a)",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Math.asinh(a)",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Math.asinh",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Math.atanh",
        valid: [
            {
                code: "Math.foo(a)",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "(function(Math) { Math.atanh(a) }(b))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Math.atanh(a)",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Math.atanh(a)",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Math.atanh",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Math.cbrt",
        valid: [
            {
                code: "Math.foo(a)",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "(function(Math) { Math.cbrt(a) }(b))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Math.cbrt(a)",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Math.cbrt(a)",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Math.cbrt",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Math.clz32",
        valid: [
            {
                code: "Math.foo(a)",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "(function(Math) { Math.clz32(a) }(b))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Math.clz32(a)",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Math.clz32(a)",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Math.clz32",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Math.cosh",
        valid: [
            {
                code: "Math.foo(a)",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "(function(Math) { Math.cosh(a) }(b))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Math.cosh(a)",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Math.cosh(a)",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Math.cosh",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Math.expm1",
        valid: [
            {
                code: "Math.foo(a)",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "(function(Math) { Math.expm1(a) }(b))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Math.expm1(a)",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Math.expm1(a)",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Math.expm1",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Math.fround",
        valid: [
            {
                code: "Math.foo(a)",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "(function(Math) { Math.fround(a) }(b))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Math.fround(a)",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Math.fround(a)",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Math.fround",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Math.hypot",
        valid: [
            {
                code: "Math.foo(a)",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "(function(Math) { Math.hypot(a) }(b))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Math.hypot(a)",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Math.hypot(a)",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Math.hypot",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Math.imul",
        valid: [
            {
                code: "Math.foo(a)",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "(function(Math) { Math.imul(a) }(b))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Math.imul(a)",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Math.imul(a)",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Math.imul",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Math.log10",
        valid: [
            {
                code: "Math.foo(a)",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "(function(Math) { Math.log10(a) }(b))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Math.log10(a)",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Math.log10(a)",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Math.log10",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Math.log1p",
        valid: [
            {
                code: "Math.foo(a)",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "(function(Math) { Math.log1p(a) }(b))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Math.log1p(a)",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Math.log1p(a)",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Math.log1p",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Math.log2",
        valid: [
            {
                code: "Math.foo(a)",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "(function(Math) { Math.log2(a) }(b))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Math.log2(a)",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Math.log2(a)",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Math.log2",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Math.sign",
        valid: [
            {
                code: "Math.foo(a)",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "(function(Math) { Math.sign(a) }(b))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Math.sign(a)",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Math.sign(a)",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Math.sign",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Math.sinh",
        valid: [
            {
                code: "Math.foo(a)",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "(function(Math) { Math.sinh(a) }(b))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Math.sinh(a)",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Math.sinh(a)",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Math.sinh",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Math.tanh",
        valid: [
            {
                code: "Math.foo(a)",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "(function(Math) { Math.tanh(a) }(b))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Math.tanh(a)",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Math.tanh(a)",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Math.tanh",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Math.trunc",
        valid: [
            {
                code: "Math.foo(a)",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "(function(Math) { Math.trunc(a) }(b))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Math.trunc(a)",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Math.trunc(a)",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Math.trunc",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Number.isFinite",
        valid: [
            {
                code: "Number.foo(a)",
                options: [{ version: "0.9.9" }],
            },
            {
                code: "(function(Number) { Number.isFinite(a) }(b))",
                options: [{ version: "0.9.9" }],
            },
            {
                code: "Number.isFinite(a)",
                options: [{ version: "0.10.0" }],
            },
        ],
        invalid: [
            {
                code: "Number.isFinite(a)",
                options: [{ version: "0.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Number.isFinite",
                            supported: "0.10.0",
                            version: "0.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Number.isInteger",
        valid: [
            {
                code: "Number.foo(a)",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "(function(Number) { Number.isInteger(a) }(b))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Number.isInteger(a)",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Number.isInteger(a)",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Number.isInteger",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Number.isNaN",
        valid: [
            {
                code: "Number.foo(a)",
                options: [{ version: "0.9.9" }],
            },
            {
                code: "(function(Number) { Number.isNaN(a) }(b))",
                options: [{ version: "0.9.9" }],
            },
            {
                code: "Number.isNaN(a)",
                options: [{ version: "0.10.0" }],
            },
        ],
        invalid: [
            {
                code: "Number.isNaN(a)",
                options: [{ version: "0.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Number.isNaN",
                            supported: "0.10.0",
                            version: "0.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Number.isSafeInteger",
        valid: [
            {
                code: "Number.foo(a)",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "(function(Number) { Number.isSafeInteger(a) }(b))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Number.isSafeInteger(a)",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Number.isSafeInteger(a)",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Number.isSafeInteger",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Number.parseFloat",
        valid: [
            {
                code: "Number.foo(a)",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "(function(Number) { Number.parseFloat(a) }(b))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Number.parseFloat(a)",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Number.parseFloat(a)",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Number.parseFloat",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Number.parseInt",
        valid: [
            {
                code: "Number.foo(a)",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "(function(Number) { Number.parseInt(a) }(b))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Number.parseInt(a)",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Number.parseInt(a)",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Number.parseInt",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Object.assign",
        valid: [
            {
                code: "Object.foo(a)",
                options: [{ version: "3.9.9" }],
            },
            {
                code: "(function(Object) { Object.assign(a) }(b))",
                options: [{ version: "3.9.9" }],
            },
            {
                code: "Object.assign(a)",
                options: [{ version: "4.0.0" }],
            },
        ],
        invalid: [
            {
                code: "Object.assign(a)",
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Object.assign",
                            supported: "4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Object.getOwnPropertySymbols",
        valid: [
            {
                code: "Object.foo(a)",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "(function(Object) { Object.getOwnPropertySymbols(a) }(b))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Object.getOwnPropertySymbols(a)",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Object.getOwnPropertySymbols(a)",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Object.getOwnPropertySymbols",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Object.is",
        valid: [
            {
                code: "Object.foo(a)",
                options: [{ version: "0.9.9" }],
            },
            {
                code: "(function(Object) { Object.is(a) }(b))",
                options: [{ version: "0.9.9" }],
            },
            {
                code: "Object.is(a)",
                options: [{ version: "0.10.0" }],
            },
        ],
        invalid: [
            {
                code: "Object.is(a)",
                options: [{ version: "0.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Object.is",
                            supported: "0.10.0",
                            version: "0.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Object.setPrototypeOf",
        valid: [
            {
                code: "Object.foo(a)",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "(function(Object) { Object.setPrototypeOf(a) }(b))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Object.setPrototypeOf(a)",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Object.setPrototypeOf(a)",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Object.setPrototypeOf",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Promise",
        valid: [
            {
                code: "(function(Promise) { Promise }(a))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Promise",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Promise",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Promise",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
            {
                code: "function wrap() { Promise }",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Promise",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Promise.allSettled",
        valid: [
            {
                code: "(function(Promise) { Promise.allSettled }(a))",
                options: [{ version: "12.8.1" }],
            },
            {
                code: "Promise.allSettled",
                options: [{ version: "12.9.0" }],
            },
        ],
        invalid: [
            {
                code: "Promise.allSettled",
                options: [{ version: "12.8.1" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Promise.allSettled",
                            supported: "12.9.0",
                            version: "12.8.1",
                        },
                    },
                ],
            },
            {
                code: "function wrap() { Promise.allSettled }",
                options: [{ version: "12.8.1" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Promise.allSettled",
                            supported: "12.9.0",
                            version: "12.8.1",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Promise.any",
        valid: [
            {
                code: "(function(Promise) { Promise.any }(a))",
                options: [{ version: "14.0.0" }],
            },
            {
                code: "Promise.any",
                options: [{ version: "15.0.0" }],
            },
        ],
        invalid: [
            {
                code: "Promise.any",
                options: [{ version: "14.0.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Promise.any",
                            supported: "15.0.0",
                            version: "14.0.0",
                        },
                    },
                ],
            },
            {
                code: "function wrap() { Promise.any }",
                options: [{ version: "14.0.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Promise.any",
                            supported: "15.0.0",
                            version: "14.0.0",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Proxy",
        valid: [
            {
                code: "(function(Proxy) { Proxy }(a))",
                options: [{ version: "5.9.9" }],
            },
            {
                code: "Proxy",
                options: [{ version: "6.0.0" }],
            },
        ],
        invalid: [
            {
                code: "Proxy",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Proxy",
                            supported: "6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
            {
                code: "function wrap() { Proxy }",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Proxy",
                            supported: "6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Reflect",
        valid: [
            {
                code: "(function(Reflect) { Reflect }(a))",
                options: [{ version: "5.9.9" }],
            },
            {
                code: "Reflect",
                options: [{ version: "6.0.0" }],
            },
        ],
        invalid: [
            {
                code: "Reflect",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Reflect",
                            supported: "6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
            {
                code: "function wrap() { Reflect }",
                options: [{ version: "5.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Reflect",
                            supported: "6.0.0",
                            version: "5.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Set",
        valid: [
            {
                code: "(function(Set) { Set }(a))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Set",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Set",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Set",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
            {
                code: "function wrap() { Set }",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Set",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "String.fromCodePoint",
        valid: [
            {
                code: "String.foo(a)",
                options: [{ version: "3.9.9" }],
            },
            {
                code: "(function(String) { String.fromCodePoint(a) }(b))",
                options: [{ version: "3.9.9" }],
            },
            {
                code: "String.fromCodePoint(a)",
                options: [{ version: "4.0.0" }],
            },
        ],
        invalid: [
            {
                code: "String.fromCodePoint(a)",
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "String.fromCodePoint",
                            supported: "4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "String.raw",
        valid: [
            {
                code: "String.foo(a)",
                options: [{ version: "3.9.9" }],
            },
            {
                code: "(function(String) { String.raw(a) }(b))",
                options: [{ version: "3.9.9" }],
            },
            {
                code: "String.raw(a)",
                options: [{ version: "4.0.0" }],
            },
        ],
        invalid: [
            {
                code: "String.raw(a)",
                options: [{ version: "3.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "String.raw",
                            supported: "4.0.0",
                            version: "3.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Symbol",
        valid: [
            {
                code: "(function(Symbol) { Symbol }(a))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "Symbol",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "Symbol",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Symbol",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
            {
                code: "function wrap() { Symbol }",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Symbol",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Int8Array",
        valid: [
            {
                code: "(function(Int8Array) { Int8Array }(a))",
                options: [{ version: "0.9.9" }],
            },
            {
                code: "Int8Array",
                options: [{ version: "0.10.0" }],
            },
        ],
        invalid: [
            {
                code: "Int8Array",
                options: [{ version: "0.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Int8Array",
                            supported: "0.10.0",
                            version: "0.9.9",
                        },
                    },
                ],
            },
            {
                code: "function wrap() { Int8Array }",
                options: [{ version: "0.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Int8Array",
                            supported: "0.10.0",
                            version: "0.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Uint8Array",
        valid: [
            {
                code: "(function(Uint8Array) { Uint8Array }(a))",
                options: [{ version: "0.9.9" }],
            },
            {
                code: "Uint8Array",
                options: [{ version: "0.10.0" }],
            },
        ],
        invalid: [
            {
                code: "Uint8Array",
                options: [{ version: "0.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Uint8Array",
                            supported: "0.10.0",
                            version: "0.9.9",
                        },
                    },
                ],
            },
            {
                code: "function wrap() { Uint8Array }",
                options: [{ version: "0.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Uint8Array",
                            supported: "0.10.0",
                            version: "0.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Uint8ClampedArray",
        valid: [
            {
                code: "(function(Uint8ClampedArray) { Uint8ClampedArray }(a))",
                options: [{ version: "0.9.9" }],
            },
            {
                code: "Uint8ClampedArray",
                options: [{ version: "0.10.0" }],
            },
        ],
        invalid: [
            {
                code: "Uint8ClampedArray",
                options: [{ version: "0.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Uint8ClampedArray",
                            supported: "0.10.0",
                            version: "0.9.9",
                        },
                    },
                ],
            },
            {
                code: "function wrap() { Uint8ClampedArray }",
                options: [{ version: "0.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Uint8ClampedArray",
                            supported: "0.10.0",
                            version: "0.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Int16Array",
        valid: [
            {
                code: "(function(Int16Array) { Int16Array }(a))",
                options: [{ version: "0.9.9" }],
            },
            {
                code: "Int16Array",
                options: [{ version: "0.10.0" }],
            },
        ],
        invalid: [
            {
                code: "Int16Array",
                options: [{ version: "0.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Int16Array",
                            supported: "0.10.0",
                            version: "0.9.9",
                        },
                    },
                ],
            },
            {
                code: "function wrap() { Int16Array }",
                options: [{ version: "0.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Int16Array",
                            supported: "0.10.0",
                            version: "0.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Uint16Array",
        valid: [
            {
                code: "(function(Uint16Array) { Uint16Array }(a))",
                options: [{ version: "0.9.9" }],
            },
            {
                code: "Uint16Array",
                options: [{ version: "0.10.0" }],
            },
        ],
        invalid: [
            {
                code: "Uint16Array",
                options: [{ version: "0.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Uint16Array",
                            supported: "0.10.0",
                            version: "0.9.9",
                        },
                    },
                ],
            },
            {
                code: "function wrap() { Uint16Array }",
                options: [{ version: "0.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Uint16Array",
                            supported: "0.10.0",
                            version: "0.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Int32Array",
        valid: [
            {
                code: "(function(Int32Array) { Int32Array }(a))",
                options: [{ version: "0.9.9" }],
            },
            {
                code: "Int32Array",
                options: [{ version: "0.10.0" }],
            },
        ],
        invalid: [
            {
                code: "Int32Array",
                options: [{ version: "0.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Int32Array",
                            supported: "0.10.0",
                            version: "0.9.9",
                        },
                    },
                ],
            },
            {
                code: "function wrap() { Int32Array }",
                options: [{ version: "0.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Int32Array",
                            supported: "0.10.0",
                            version: "0.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Uint32Array",
        valid: [
            {
                code: "(function(Uint32Array) { Uint32Array }(a))",
                options: [{ version: "0.9.9" }],
            },
            {
                code: "Uint32Array",
                options: [{ version: "0.10.0" }],
            },
        ],
        invalid: [
            {
                code: "Uint32Array",
                options: [{ version: "0.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Uint32Array",
                            supported: "0.10.0",
                            version: "0.9.9",
                        },
                    },
                ],
            },
            {
                code: "function wrap() { Uint32Array }",
                options: [{ version: "0.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Uint32Array",
                            supported: "0.10.0",
                            version: "0.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "BigInt64Array",
        valid: [
            {
                code: "(function(BigInt64Array) { BigInt64Array }(b))",
                options: [{ version: "10.3.0" }],
            },
            {
                code: "BigInt64Array",
                options: [{ version: "10.4.0" }],
            },
        ],
        invalid: [
            {
                code: "BigInt64Array",
                options: [{ version: "10.3.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "BigInt64Array",
                            supported: "10.4.0",
                            version: "10.3.0",
                        },
                    },
                ],
            },
            {
                code: "(function() { BigInt64Array })()",
                options: [{ version: "10.3.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "BigInt64Array",
                            supported: "10.4.0",
                            version: "10.3.0",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "BigUint64Array",
        valid: [
            {
                code: "(function(BigUint64Array) { BigUint64Array }(b))",
                options: [{ version: "10.3.0" }],
            },
            {
                code: "BigUint64Array",
                options: [{ version: "10.4.0" }],
            },
        ],
        invalid: [
            {
                code: "BigUint64Array",
                options: [{ version: "10.3.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "BigUint64Array",
                            supported: "10.4.0",
                            version: "10.3.0",
                        },
                    },
                ],
            },
            {
                code: "(function() { BigUint64Array })()",
                options: [{ version: "10.3.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "BigUint64Array",
                            supported: "10.4.0",
                            version: "10.3.0",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Float32Array",
        valid: [
            {
                code: "(function(Float32Array) { Float32Array }(a))",
                options: [{ version: "0.9.9" }],
            },
            {
                code: "Float32Array",
                options: [{ version: "0.10.0" }],
            },
        ],
        invalid: [
            {
                code: "Float32Array",
                options: [{ version: "0.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Float32Array",
                            supported: "0.10.0",
                            version: "0.9.9",
                        },
                    },
                ],
            },
            {
                code: "function wrap() { Float32Array }",
                options: [{ version: "0.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Float32Array",
                            supported: "0.10.0",
                            version: "0.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Float64Array",
        valid: [
            {
                code: "(function(Float64Array) { Float64Array }(a))",
                options: [{ version: "0.9.9" }],
            },
            {
                code: "Float64Array",
                options: [{ version: "0.10.0" }],
            },
        ],
        invalid: [
            {
                code: "Float64Array",
                options: [{ version: "0.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Float64Array",
                            supported: "0.10.0",
                            version: "0.9.9",
                        },
                    },
                ],
            },
            {
                code: "function wrap() { Float64Array }",
                options: [{ version: "0.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Float64Array",
                            supported: "0.10.0",
                            version: "0.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "DataView",
        valid: [
            {
                code: "(function(DataView) { DataView }(a))",
                options: [{ version: "0.9.9" }],
            },
            {
                code: "DataView",
                options: [{ version: "0.10.0" }],
            },
        ],
        invalid: [
            {
                code: "DataView",
                options: [{ version: "0.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "DataView",
                            supported: "0.10.0",
                            version: "0.9.9",
                        },
                    },
                ],
            },
            {
                code: "function wrap() { DataView }",
                options: [{ version: "0.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "DataView",
                            supported: "0.10.0",
                            version: "0.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "WeakMap",
        valid: [
            {
                code: "(function(WeakMap) { WeakMap }(a))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "WeakMap",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "WeakMap",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "WeakMap",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
            {
                code: "function wrap() { WeakMap }",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "WeakMap",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "WeakRef",
        valid: [
            {
                code: "(function(WeakRef) { WeakRef }(a))",
                options: [{ version: "14.5.0" }],
            },
            {
                code: "WeakRef",
                options: [{ version: "14.6.0" }],
            },
        ],
        invalid: [
            {
                code: "WeakRef",
                options: [{ version: "14.5.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "WeakRef",
                            supported: "14.6.0",
                            version: "14.5.0",
                        },
                    },
                ],
            },
            {
                code: "function wrap() { WeakRef }",
                options: [{ version: "14.5.0" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "WeakRef",
                            supported: "14.6.0",
                            version: "14.5.0",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "WeakSet",
        valid: [
            {
                code: "(function(WeakSet) { WeakSet }(a))",
                options: [{ version: "0.11.9" }],
            },
            {
                code: "WeakSet",
                options: [{ version: "0.12.0" }],
            },
        ],
        invalid: [
            {
                code: "WeakSet",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "WeakSet",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
            {
                code: "function wrap() { WeakSet }",
                options: [{ version: "0.11.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "WeakSet",
                            supported: "0.12.0",
                            version: "0.11.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Atomics",
        valid: [
            {
                code: "(function(Atomics) { Atomics }(a))",
                options: [{ version: "8.9.9" }],
            },
            {
                code: "Atomics",
                options: [{ version: "8.10.0" }],
            },
        ],
        invalid: [
            {
                code: "Atomics",
                options: [{ version: "8.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Atomics",
                            supported: "8.10.0",
                            version: "8.9.9",
                        },
                    },
                ],
            },
            {
                code: "function wrap() { Atomics }",
                options: [{ version: "8.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Atomics",
                            supported: "8.10.0",
                            version: "8.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Object.values",
        valid: [
            {
                code: "Object.foo(a)",
                options: [{ version: "6.9.9" }],
            },
            {
                code: "(function(Object) { Object.values(a) }(b))",
                options: [{ version: "6.9.9" }],
            },
            {
                code: "Object.values(a)",
                options: [{ version: "7.0.0" }],
            },
        ],
        invalid: [
            {
                code: "Object.values(a)",
                options: [{ version: "6.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Object.values",
                            supported: "7.0.0",
                            version: "6.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Object.entries",
        valid: [
            {
                code: "Object.foo(a)",
                options: [{ version: "6.9.9" }],
            },
            {
                code: "(function(Object) { Object.entries(a) }(b))",
                options: [{ version: "6.9.9" }],
            },
            {
                code: "Object.entries(a)",
                options: [{ version: "7.0.0" }],
            },
        ],
        invalid: [
            {
                code: "Object.entries(a)",
                options: [{ version: "6.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Object.entries",
                            supported: "7.0.0",
                            version: "6.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "Object.getOwnPropertyDescriptors",
        valid: [
            {
                code: "Object.foo(a)",
                options: [{ version: "6.9.9" }],
            },
            {
                code: "(function(Object) { Object.getOwnPropertyDescriptors(a) }(b))",
                options: [{ version: "6.9.9" }],
            },
            {
                code: "Object.getOwnPropertyDescriptors(a)",
                options: [{ version: "7.0.0" }],
            },
        ],
        invalid: [
            {
                code: "Object.getOwnPropertyDescriptors(a)",
                options: [{ version: "6.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "Object.getOwnPropertyDescriptors",
                            supported: "7.0.0",
                            version: "6.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "SharedArrayBuffer",
        valid: [
            {
                code: "(function(SharedArrayBuffer) { SharedArrayBuffer }(a))",
                options: [{ version: "8.9.9" }],
            },
            {
                code: "SharedArrayBuffer",
                options: [{ version: "8.10.0" }],
            },
        ],
        invalid: [
            {
                code: "SharedArrayBuffer",
                options: [{ version: "8.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "SharedArrayBuffer",
                            supported: "8.10.0",
                            version: "8.9.9",
                        },
                    },
                ],
            },
            {
                code: "function wrap() { SharedArrayBuffer }",
                options: [{ version: "8.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "SharedArrayBuffer",
                            supported: "8.10.0",
                            version: "8.9.9",
                        },
                    },
                ],
            },
        ],
    },
    {
        keyword: "globalThis",
        valid: [
            {
                code: "(function(globalThis) { globalThis }(a))",
                options: [{ version: "12.0.0" }],
            },
            {
                code: "globalThis",
                options: [{ version: "12.0.0" }],
            },
            {
                code: "globalThis",
                settings: {
                    node: { version: "12.0.0" },
                },
            },
        ],
        invalid: [
            {
                code: "globalThis",
                options: [{ version: "11.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "globalThis",
                            supported: "12.0.0",
                            version: "11.9.9",
                        },
                    },
                ],
            },
            {
                code: "function wrap() { globalThis }",
                options: [{ version: "11.9.9" }],
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "globalThis",
                            supported: "12.0.0",
                            version: "11.9.9",
                        },
                    },
                ],
            },
            {
                code: "function wrap() { globalThis }",
                settings: {
                    node: { version: "11.9.9" },
                },
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "globalThis",
                            supported: "12.0.0",
                            version: "11.9.9",
                        },
                    },
                ],
            },
            // https://github.com/eslint-community/eslint-plugin-n/issues/250
            {
                code: "function wrap() { globalThis }",
                settings: {
                    node: { version: ">=11.9.9" },
                },
                errors: [
                    {
                        messageId: "not-supported-till",
                        data: {
                            name: "globalThis",
                            supported: "12.0.0",
                            version: ">=11.9.9",
                        },
                    },
                ],
            },
        ],
    },
])
