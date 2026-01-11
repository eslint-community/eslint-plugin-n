/**
 * @author Matt DuVall <http://www.mattduvall.com>
 * See LICENSE file in root directory for full license.
 */

import { RuleTester, TsRuleTester } from "#test-helpers"
import Module from "node:module"
import assert from "node:assert"
import rule from "../../../lib/rules/no-sync.js"
import sinon from "sinon"

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
                },
            ],
        },
        {
            code: "var foo = fs.fooSync.apply();",
            errors: [
                {
                    messageId: "noSync",
                    data: { propertyName: "fooSync" },
                },
            ],
        },
        {
            code: "var foo = fooSync();",
            errors: [
                {
                    messageId: "noSync",
                    data: { propertyName: "fooSync" },

                },
            ],
        },
        {
            code: "var foo = fooSync.apply();",
            errors: [
                {
                    messageId: "noSync",
                    data: { propertyName: "fooSync" },
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
                },
            ],
        },
        {
            code: "if (true) {fs.fooSync();}",
            errors: [
                {
                    messageId: "noSync",
                    data: { propertyName: "fooSync" },
                },
            ],
        },
        {
            code: "function someFunction() {fs.fooSync();}",
            errors: [
                {
                    messageId: "noSync",
                    data: { propertyName: "fooSync" },
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
                },
            ],
        },
    ],
})

describe("no-sync type-aware cases", function () {
    this.timeout(10000)

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
                    },
                ],
            },
        ],
    })
})

describe("no-sync rule with missing dependencies", () => {
    const originalRequire = Module.prototype.require
    let mockRequire
    let importCounter = 0

    async function loadFreshRule() {
        return (
            await import(
                new URL(
                    `../../../lib/rules/no-sync.js?test=${importCounter++}`,
                    import.meta.url
                ).href
            )
        ).default
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
    async function testWithMissingDependency(options) {
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

        const testRule = await loadFreshRule()

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
            sourceCode: {
                parserServices: options.mockTypeScriptServices ? null : {},
            },
        }

        // Node that triggers the rule.
        const node = {
            name: "fooSync",
        }

        // Test if the rule throws the expected error.
        let errorThrown = false
        try {
            const ruleListener = testRule.create(context)
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

    afterEach(() => {
        if (mockRequire && typeof mockRequire.restore === "function") {
            mockRequire.restore()
        }

        sinon.restore()
    })

    it("should throw if `ts-declaration-location` is not installed", async function () {
        await testWithMissingDependency({
            mockTsDeclarationLocation: true,
            mockTypeScriptServices: false,
            expectedError: /ts-declaration-location not available/,
        })
    })

    it("should throw if TypeScript parser services are not available", async function () {
        await testWithMissingDependency({
            mockTsDeclarationLocation: false,
            mockTypeScriptServices: true,
            expectedError: /TypeScript parser services not available/,
        })
    })

    it("should throw if both `ts-declaration-location` and `typescript` are not available", async function () {
        await testWithMissingDependency({
            mockTsDeclarationLocation: true,
            mockTypeScriptServices: true,
            expectedError:
                /TypeScript parser services not available|ts-declaration-location not available/,
        })
    })
})