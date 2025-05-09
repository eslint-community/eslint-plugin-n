/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { RuleTester } = require("#test-helpers")
const rule = require("../../../lib/rules/no-top-level-await.js")
const path = require("path")

/**
 * Makes a file path to a fixture.
 * @param {string} name - A name.
 * @returns {string} A file path to a fixture.
 */
function fixture(name) {
    return path.resolve(__dirname, "../../fixtures/no-top-level-await", name)
}

new RuleTester({
    languageOptions: { ecmaVersion: 2022, sourceType: "module" },
}).run("no-top-level-await", rule, {
    valid: [
        {
            filename: fixture("simple-files/lib/a.js"),
            code: "import * as foo from 'foo'",
        },
        {
            filename: fixture("simple-files/lib/a.js"),
            code: "for (const e of iterate()) { /* ... */ }",
        },
        // Non Top-level `await`
        {
            filename: fixture("simple-bin/lib/a.js"),
            code: "async function fn () { const foo = await import('foo') }",
        },
        {
            filename: fixture("simple-bin/lib/a.js"),
            code: "async function fn () { for await (const e of asyncIterate()) { /* ... */ } }",
        },
        {
            filename: fixture("simple-bin/lib/a.js"),
            code: "const fn = async () => await import('foo')",
        },
        {
            filename: fixture("simple-bin/lib/a.js"),
            code: "const fn = async () => { for await (const e of asyncIterate()) { /* ... */ } }",
        },
        // Ignore files
        {
            filename: fixture("simple-files/src/a.js"),
            code: "const foo = await import('foo')",
        },
        {
            filename: fixture("simple-files/src/a.js"),
            code: "for await (const e of asyncIterate()) { /* ... */ }",
        },
        {
            filename: fixture("simple-npmignore/src/a.js"),
            code: "const foo = await import('foo')",
        },
        {
            filename: fixture("simple-npmignore/src/a.js"),
            code: "for await (const e of asyncIterate()) { /* ... */ }",
        },
        // ignoreBin
        {
            filename: fixture("simple-bin/a.js"),
            code: "const foo = await import('foo')",
            options: [
                {
                    ignoreBin: true,
                },
            ],
        },
        {
            filename: fixture("simple-bin/a.js"),
            code: "for await (const e of asyncIterate()) { /* ... */ }",
            options: [
                {
                    ignoreBin: true,
                },
            ],
        },
        {
            filename: fixture("simple-files/lib/a.js"),
            code: "#!/usr/bin/env node\nconst foo = await import('foo')",
            options: [
                {
                    ignoreBin: true,
                },
            ],
        },
        {
            filename: fixture("simple-files/lib/a.js"),
            code: "#!/usr/bin/env node\nfor await (const e of asyncIterate()) { /* ... */ }",
            options: [
                {
                    ignoreBin: true,
                },
            ],
        },
        // Unknown files
        {
            code: "const foo = await import('foo')",
        },
        {
            filename: "unknown.js",
            code: "const foo = await import('foo')",
        },
    ],
    invalid: [
        {
            filename: fixture("simple-files/lib/a.js"),
            code: "const foo = await import('foo')",
            errors: [
                {
                    message:
                        "Top-level `await` is forbidden in published modules.",
                    line: 1,
                    column: 13,
                },
            ],
        },
        {
            filename: fixture("simple-files/lib/a.js"),
            code: "for await (const e of asyncIterate()) { /* ... */ }",
            errors: [
                {
                    message:
                        "Top-level `await` is forbidden in published modules.",
                    line: 1,
                    column: 1,
                },
            ],
        },
        {
            filename: fixture("simple-npmignore/lib/a.js"),
            code: "const foo = await import('foo')",
            errors: [
                {
                    message:
                        "Top-level `await` is forbidden in published modules.",
                    line: 1,
                    column: 13,
                },
            ],
        },
        {
            filename: fixture("simple-npmignore/lib/a.js"),
            code: "for await (const e of asyncIterate()) { /* ... */ }",
            errors: [
                {
                    message:
                        "Top-level `await` is forbidden in published modules.",
                    line: 1,
                    column: 1,
                },
            ],
        },
        {
            filename: fixture("simple-bin/a.js"),
            code: "const foo = await import('foo')",
            errors: [
                {
                    message:
                        "Top-level `await` is forbidden in published modules.",
                    line: 1,
                    column: 13,
                },
            ],
        },
        {
            filename: fixture("simple-bin/a.js"),
            code: "for await (const e of asyncIterate()) { /* ... */ }",
            errors: [
                {
                    message:
                        "Top-level `await` is forbidden in published modules.",
                    line: 1,
                    column: 1,
                },
            ],
        },
        {
            filename: fixture("simple-files/lib/a.js"),
            code: "#!/usr/bin/env node\nconst foo = await import('foo')",
            errors: [
                {
                    message:
                        "Top-level `await` is forbidden in published modules.",
                    line: 2,
                    column: 13,
                },
            ],
        },
        {
            filename: fixture("simple-files/lib/a.js"),
            code: "#!/usr/bin/env node\nfor await (const e of asyncIterate()) { /* ... */ }",
            errors: [
                {
                    message:
                        "Top-level `await` is forbidden in published modules.",
                    line: 2,
                    column: 1,
                },
            ],
        },
    ],
})
