/**
 * @author Matt DuVall <http://www.mattduvall.com>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { RuleTester, TsRuleTester } = require("#test-helpers")
const rule = require("../../../lib/rules/no-sync")

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
