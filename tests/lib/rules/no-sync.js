/**
 * @author Matt DuVall <http://www.mattduvall.com>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { RuleTester, TsRuleTester } = require("#test-helpers")
const Module = require("node:module")
const assert = require("node:assert")
const rule = require("../../../lib/rules/no-sync")
const sinon = require("sinon")

new RuleTester().run("no-sync", rule, {
    valid: [
        "var foo = fs.foo.foo();",
        // Allow non-function called to be ignored
        "fs.fooSync;",
        "fooSync;",
        "() => fooSync;",
        {
            code: "var foo = fs.fooSync;",
            options: [{ allowAtRootLevel: true }],
        },
        {
            code: "var foo = fooSync;",
            options: [{ allowAtRootLevel: true }],
        },
        {
            code: "if (true) {fs.fooSync();}",
            options: [{ allowAtRootLevel: true }],
        },
        {
            code: "if (true) {fooSync();}",
            options: [{ allowAtRootLevel: true }],
        },
        // ignores
        {
            code: "fooSync();",
            options: [{ ignores: ["fooSync"] }],
        },
    ],
    invalid: [
        {
            code: "var foo = fs.fooSync();",
            errors: [
                {
                    messageId: "noSync",
                    data: { propertyName: "fooSync" },
                    type: "MemberExpression",
                },
            ],
        },
        {
            code: "var foo = fs.fooSync.apply();",
            errors: [
                {
                    messageId: "noSync",
                    data: { propertyName: "fooSync" },
                    type: "MemberExpression",
                },
            ],
        },
        {
            code: "var foo = fooSync();",
            errors: [
                {
                    messageId: "noSync",
                    data: { propertyName: "fooSync" },
                    type: "CallExpression",
                },
            ],
        },
        {
            code: "var foo = fooSync.apply();",
            errors: [
                {
                    messageId: "noSync",
                    data: { propertyName: "fooSync" },
                    type: "MemberExpression",
                },
            ],
        },
        {
            code: "var foo = fs.fooSync();",
            options: [{ allowAtRootLevel: false }],
            errors: [
                {
                    messageId: "noSync",
                    data: { propertyName: "fooSync" },
                    type: "MemberExpression",
                },
            ],
        },
        {
            code: "if (true) {fs.fooSync();}",
            errors: [
                {
                    messageId: "noSync",
                    data: { propertyName: "fooSync" },
                    type: "MemberExpression",
                },
            ],
        },
        {
            code: "function someFunction() {fs.fooSync();}",
            errors: [
                {
                    messageId: "noSync",
                    data: { propertyName: "fooSync" },
                    type: "MemberExpression",
                },
            ],
        },
        {
            code: "function someFunction() {fs.fooSync();}",
            options: [{ allowAtRootLevel: true }],
            errors: [
                {
                    messageId: "noSync",
                    data: { propertyName: "fooSync" },
                    type: "MemberExpression",
                },
            ],
        },
        {
            code: "var a = function someFunction() {fs.fooSync();}",
            options: [{ allowAtRootLevel: true }],
            errors: [
                {
                    messageId: "noSync",
                    data: { propertyName: "fooSync" },
                    type: "MemberExpression",
                },
            ],
        },
        // ignores
        {
            code: "() => {fs.fooSync();}",
            options: [
                {
                    allowAtRootLevel: true,
                    ignores: ["barSync"],
                },
            ],
            errors: [
                {
                    messageId: "noSync",
                    data: { propertyName: "fooSync" },
                    type: "MemberExpression",
                },
            ],
        },
    ],
})

new (TsRuleTester("no-sync/base").run)("no-sync", rule, {
    valid: [
        {
            code: `
declare function fooSync(): void;
fooSync();
`,
            options: [
                {
                    ignores: [
                        {
                            from: "file",
                        },
                    ],
                },
            ],
        },
        {
            code: `
declare function fooSync(): void;
fooSync();
`,
            options: [
                {
                    ignores: [
                        {
                            from: "file",
                            name: ["fooSync"],
                        },
                    ],
                },
            ],
        },
        {
            code: `
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync("body { font-size: 1.4em; } p { color: red; }");
`,
            options: [
                {
                    ignores: [
                        {
                            from: "lib",
                            name: ["CSSStyleSheet.replaceSync"],
                        },
                    ],
                },
            ],
        },
    ],
    invalid: [
        {
            code: `
declare function fooSync(): void;
fooSync();
`,
            options: [
                {
                    ignores: [
                        {
                            from: "file",
                            path: "**/bar.ts",
                        },
                    ],
                },
            ],
            errors: [
                {
                    messageId: "noSync",
                    data: { propertyName: "fooSync" },
                    type: "CallExpression",
                },
            ],
        },
        {
            code: `
declare function fooSync(): void;
fooSync();
`,
            options: [
                {
                    ignores: [
                        {
                            from: "file",
                            name: ["barSync"],
                        },
                    ],
                },
            ],
            errors: [
                {
                    messageId: "noSync",
                    data: { propertyName: "fooSync" },
                    type: "CallExpression",
                },
            ],
        },
        {
            code: `
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync("body { font-size: 1.4em; } p { color: red; }");
`,
            options: [
                {
                    ignores: [
                        {
                            from: "file",
                            name: ["CSSStyleSheet.replaceSync"],
                        },
                    ],
                },
            ],
            errors: [
                {
                    messageId: "noSync",
                    data: { propertyName: "CSSStyleSheet.replaceSync" },
                    type: "MemberExpression",
                },
            ],
        },
    ],
})

new (TsRuleTester("no-sync/ignore-package").run)("no-sync", rule, {
    valid: [
        {
            code: `
import { fooSync } from "aaa";
fooSync();
`,
            options: [
                {
                    ignores: [
                        {
                            from: "package",
                            package: "aaa",
                            name: ["fooSync"],
                        },
                    ],
                },
            ],
        },
    ],
    invalid: [
        {
            code: `
import { fooSync } from "aaa";
fooSync();
`,
            options: [
                {
                    ignores: [
                        {
                            from: "file",
                            name: ["fooSync"],
                        },
                    ],
                },
            ],
            errors: [
                {
                    messageId: "noSync",
                    data: { propertyName: "fooSync" },
                    type: "CallExpression",
                },
            ],
        },
    ],
})

describe("no-sync rule with missing dependencies", () => {
    const originalRequire = module.require
    let mockRequire
    let originalModules = {}

    /**
     * Helper function to mock a module.
     * - Assigns a module object to `require.cache` with the provided mock exports to prevent TypeScript errors when the module is required, as TypeScript expects the module to exist in the cache with an 'exports' property.
     *
     * @param {string} modulePath - The path to the module.
     * @param {*} mockExports - The mock exports to use.
     */
    function mockModule(modulePath, mockExports) {
        const resolvedPath = require.resolve(modulePath)

        // Store original module if not already stored.
        if (!originalModules[resolvedPath] && require.cache[resolvedPath]) {
            originalModules[resolvedPath] = require.cache[resolvedPath]
        }

        require.cache[resolvedPath] = { exports: mockExports }
    }

    /**
     * Helper to test rule behavior with missing dependencies.
     * - Sets mocks for each dependency based on options.
     *
     * @param {object} options - Test options.
     * @param {boolean} options.mockTsDeclarationLocation - Whether to mock `ts-declaration-location` as missing.
     * @param {boolean} options.mockTypeScriptServices - Whether to mock TypeScript services as missing.
     * @param {RegExp} options.expectedError - The expected error message pattern.
     */
    function testWithMissingDependency(options) {
        const mockModules = {}

        if (options.mockTsDeclarationLocation) {
            mockModules["ts-declaration-location"] = {
                throws: new Error(
                    "Cannot find module 'ts-declaration-location'"
                ),
            }
        }

        // Stub for the require function.
        mockRequire = sinon
            .stub(Module.prototype, "require")
            .callsFake(function (id) {
                if (mockModules[id] && mockModules[id].throws) {
                    throw mockModules[id].throws
                }
                return originalRequire.apply(this, arguments)
            })

        if (options.mockTypeScriptServices) {
            const mockGetParserServices = function () {
                return null
            }

            mockModule(
                "../../../lib/util/get-parser-services",
                mockGetParserServices
            )
        }

        // Directly create and test the rule.
        const rule = require("../../../lib/rules/no-sync")

        // Context with required fields to satisfy TypeScript parser requirements.
        const context = {
            options: [
                {
                    ignores: [
                        {
                            from: "file",
                        },
                    ],
                },
            ],
        }

        // Node that triggers the rule.
        const node = {
            name: "fooSync",
        }

        // Test if the rule throws the expected error.
        let errorThrown = false
        try {
            const ruleListener = rule.create(context)
            const selectors = Object.keys(ruleListener)

            for (const selector of selectors) {
                try {
                    if (typeof ruleListener[selector] === "function") {
                        ruleListener[selector](node)
                    }
                } catch (e) {
                    if (e.message.match(options.expectedError)) {
                        errorThrown = true
                        break
                    }
                }
            }
        } catch (e) {
            if (e.message.match(options.expectedError)) {
                errorThrown = true
            } else {
                throw e
            }
        }

        assert.ok(
            errorThrown,
            `Expected error matching ${options.expectedError} was not thrown`
        )
    }

    beforeEach(() => {
        delete require.cache[require.resolve("../../../lib/rules/no-sync")]
        delete require.cache[
            require.resolve("../../../lib/util/get-parser-services")
        ]
    })

    afterEach(() => {
        if (mockRequire && typeof mockRequire.restore === "function") {
            mockRequire.restore()
        }

        sinon.restore()
        module.require = originalRequire
    })

    it("should throw if `ts-declaration-location` is not installed", function () {
        testWithMissingDependency({
            mockTsDeclarationLocation: true,
            mockTypeScriptServices: false,
            expectedError: /ts-declaration-location not available/,
        })
    })

    it("should throw if TypeScript parser services are not available", function () {
        testWithMissingDependency({
            mockTsDeclarationLocation: false,
            mockTypeScriptServices: true,
            expectedError: /TypeScript parser services not available/,
        })
    })

    it("should throw if both `ts-declaration-location` and `typescript` are not available", function () {
        testWithMissingDependency({
            mockTsDeclarationLocation: true,
            mockTypeScriptServices: true,
            expectedError:
                /TypeScript parser services not available|ts-declaration-location not available/,
        })
    })
})
