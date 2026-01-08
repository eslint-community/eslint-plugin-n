/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const { Linter } = require("eslint")
const RuleTester = require("../../test-helpers").RuleTester
const rule = require("../../../lib/rules/file-extension-in-import")

const DynamicImportSupported = (() => {
    const config = { languageOptions: { ecmaVersion: 2020 } }
    const messages = new Linter().verify("import(s)", config)
    return messages.length === 0
})()

if (!DynamicImportSupported) {
    console.warn(
        "[%s] Skip tests for 'import()'",
        path.basename(__filename, ".js")
    )
}

const tsReactExtensionMap = [
    ["", ".js"],
    [".ts", ".js"],
    [".cts", ".cjs"],
    [".mts", ".mjs"],
    [".tsx", ".js"],
]

function fixture(filename) {
    return path.resolve(
        __dirname,
        "../../fixtures/file-extension-in-import",
        filename
    )
}

new RuleTester({
    languageOptions: {
        sourceType: "module",
    },
    settings: {},
}).run("file-extension-in-import", rule, {
    valid: [
        {
            filename: fixture("test.js"),
            code: "import 'eslint'",
        },
        {
            filename: fixture("test.js"),
            code: "import '@typescript-eslint/parser'",
        },
        {
            filename: fixture("test.js"),
            code: "import '@typescript-eslint\\parser'",
        },
        {
            filename: fixture("test.js"),
            code: "import 'punycode/'",
        },
        {
            filename: fixture("test.js"),
            code: "import 'xxx'",
        },
        {
            filename: fixture("test.js"),
            code: "import './a.js'",
        },
        {
            filename: fixture("test.js"),
            code: "import './b.json'",
        },
        {
            filename: fixture("test.js"),
            code: "import './c.mjs'",
        },
        {
            filename: fixture("test.js"),
            code: "import './d.js'",
        },
        {
            filename: fixture("test.ts"),
            code: "import './a.js'",
        },
        {
            filename: fixture("test.ts"),
            code: "import './d.js'",
        },
        {
            filename: fixture("test.js"),
            code: "import './a.js'",
            options: ["always"],
        },
        {
            filename: fixture("test.js"),
            code: "import './b.json'",
            options: ["always"],
        },
        {
            filename: fixture("test.js"),
            code: "import './c.mjs'",
            options: ["always"],
        },
        {
            filename: fixture("test.tsx"),
            code: "import './d.jsx'",
            options: ["always"],
        },
        {
            filename: fixture("test.js"),
            code: "import './a'",
            options: ["never"],
        },
        {
            filename: fixture("test.js"),
            code: "import './b'",
            options: ["never"],
        },
        {
            filename: fixture("test.js"),
            code: "import './c'",
            options: ["never"],
        },
        {
            filename: fixture("test.js"),
            code: "import './a'",
            options: ["always", { ".js": "never" }],
        },
        {
            filename: fixture("test.js"),
            code: "import './b.json'",
            options: ["always", { ".js": "never" }],
        },
        {
            filename: fixture("test.js"),
            code: "import './c.mjs'",
            options: ["always", { ".js": "never" }],
        },
        {
            filename: fixture("test.js"),
            code: "import './a'",
            options: ["never", { ".json": "always" }],
        },
        {
            filename: fixture("test.js"),
            code: "import './b.json'",
            options: ["never", { ".json": "always" }],
        },
        {
            filename: fixture("test.js"),
            code: "import './c'",
            options: ["never", { ".json": "always" }],
        },

        // Ignore sub-paths of modules
        {
            filename: fixture("test.js"),
            code: "import '@apollo/client/core'",
            options: ["always"],
        },
        {
            filename: fixture("test.js"),
            code: "import 'yargs/helpers'",
            options: ["always"],
        },
        {
            filename: fixture("test.js"),
            code: "import 'firebase-functions/v1/auth'",
            options: ["always"],
        },

        // typescriptExtensionMap
        {
            filename: fixture("test.tsx"),
            code: "require('./d.js');",
            settings: { node: { typescriptExtensionMap: tsReactExtensionMap } },
        },
        {
            filename: fixture("test.tsx"),
            code: "require('./e.js');",
            settings: { node: { typescriptExtensionMap: tsReactExtensionMap } },
        },
        {
            filename: fixture("test.ts"),
            code: "require('./d.js');",
            settings: { node: { typescriptExtensionMap: tsReactExtensionMap } },
        },
        {
            filename: fixture("test.ts"),
            code: "require('./e.js');",
            settings: { node: { typescriptExtensionMap: tsReactExtensionMap } },
        },

        {
            filename: fixture("ts-allow-extension/test.ts"),
            code: "require('./file.js');",
        },
        {
            filename: fixture("ts-allow-extension/test.ts"),
            code: "require('./file.ts');",
        },
    ],
    invalid: [
        {
            filename: fixture("test.js"),
            code: "import './a'",
            output: "import './a.js'",
            errors: [{ messageId: "requireExt", data: { ext: ".js" } }],
        },
        {
            filename: fixture("test.ts"),
            code: "import './a'",
            output: "import './a.js'",
            errors: [{ messageId: "requireExt", data: { ext: ".js" } }],
        },
        {
            filename: fixture("test.ts"),
            code: "import './d'",
            output: "import './d.js'",
            errors: [{ messageId: "requireExt", data: { ext: ".js" } }],
        },
        {
            filename: fixture("test.js"),
            code: "import { util } from './my-folder'",
            output: "import { util } from './my-folder/index.js'",
            errors: [{ messageId: "requireExt", data: { ext: ".js" } }],
        },
        {
            filename: fixture("test.js"),
            code: "import { util } from './my-folder/'",
            output: "import { util } from './my-folder/index.js'",
            errors: [{ messageId: "requireExt", data: { ext: ".js" } }],
        },
        {
            filename: fixture("test.js"),
            code: "import './b'",
            output: "import './b.json'",
            errors: [{ messageId: "requireExt", data: { ext: ".json" } }],
        },
        {
            filename: fixture("test.js"),
            code: "import './c'",
            output: "import './c.mjs'",
            errors: [{ messageId: "requireExt", data: { ext: ".mjs" } }],
        },
        {
            filename: fixture("test.js"),
            code: "import './a'",
            output: "import './a.js'",
            options: ["always"],
            errors: [{ messageId: "requireExt", data: { ext: ".js" } }],
        },
        {
            filename: fixture("test.js"),
            code: "import './b'",
            output: "import './b.json'",
            options: ["always"],
            errors: [{ messageId: "requireExt", data: { ext: ".json" } }],
        },
        {
            filename: fixture("test.js"),
            code: "import './c'",
            output: "import './c.mjs'",
            options: ["always"],
            errors: [{ messageId: "requireExt", data: { ext: ".mjs" } }],
        },
        {
            filename: fixture("test.js"),
            code: "import './a.js'",
            output: "import './a'",
            options: ["never"],
            errors: [{ messageId: "forbidExt", data: { ext: ".js" } }],
        },
        {
            filename: fixture("test.js"),
            code: "import './b.json'",
            output: "import './b'",
            options: ["never"],
            errors: [{ messageId: "forbidExt", data: { ext: ".json" } }],
        },
        {
            filename: fixture("test.js"),
            code: "import './c.mjs'",
            output: "import './c'",
            options: ["never"],
            errors: [{ messageId: "forbidExt", data: { ext: ".mjs" } }],
        },
        {
            filename: fixture("test.js"),
            code: "import './a.js'",
            output: "import './a'",
            options: ["always", { ".js": "never" }],
            errors: [{ messageId: "forbidExt", data: { ext: ".js" } }],
        },
        {
            filename: fixture("test.js"),
            code: "import './b'",
            output: "import './b.json'",
            options: ["always", { ".js": "never" }],
            errors: [{ messageId: "requireExt", data: { ext: ".json" } }],
        },
        {
            filename: fixture("test.js"),
            code: "import './c'",
            output: "import './c.mjs'",
            options: ["always", { ".js": "never" }],
            errors: [{ messageId: "requireExt", data: { ext: ".mjs" } }],
        },
        {
            filename: fixture("test.js"),
            code: "import './a.js'",
            output: "import './a'",
            options: ["never", { ".json": "always" }],
            errors: [{ messageId: "forbidExt", data: { ext: ".js" } }],
        },
        {
            filename: fixture("test.js"),
            code: "import './b'",
            output: "import './b.json'",
            options: ["never", { ".json": "always" }],
            errors: [{ messageId: "requireExt", data: { ext: ".json" } }],
        },
        {
            filename: fixture("test.js"),
            code: "import './c.mjs'",
            output: "import './c'",
            options: ["never", { ".json": "always" }],
            errors: [{ messageId: "forbidExt", data: { ext: ".mjs" } }],
        },

        {
            // name: '.js has a higher priority than .json'
            filename: fixture("test.js"),
            code: "import './multi'",
            output: "import './multi.js'",
            options: ["always"],
            errors: [{ messageId: "requireExt", data: { ext: ".js" } }],
        },
        {
            filename: fixture("test.js"),
            code: "import './multi.js'",
            output: null,
            options: ["never"],
            errors: [{ messageId: "forbidExt", data: { ext: ".js" } }],
        },
        {
            filename: fixture("test.js"),
            code: "import './multi.json'",
            output: null,
            options: ["never"],
            errors: [{ messageId: "forbidExt", data: { ext: ".json" } }],
        },

        // import()
        ...(DynamicImportSupported
            ? [
                  {
                      filename: fixture("test.js"),
                      code: "function f() { import('./a') }",
                      output: "function f() { import('./a.js') }",
                      languageOptions: { ecmaVersion: 2020 },
                      errors: [
                          { messageId: "requireExt", data: { ext: ".js" } },
                      ],
                  },
                  {
                      filename: fixture("test.js"),
                      code: "function f() { import('./a.js') }",
                      output: "function f() { import('./a') }",
                      options: ["never"],
                      languageOptions: { ecmaVersion: 2020 },
                      errors: [
                          { messageId: "forbidExt", data: { ext: ".js" } },
                      ],
                  },
              ]
            : []),
    ],
})
