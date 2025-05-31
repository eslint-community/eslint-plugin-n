/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const { RuleTester, isCaseSensitiveFileSystem } = require("../../test-helpers")
const rule = require("../../../lib/rules/no-missing-require")

const tsReactExtensionMap = [
    ["", ".js"],
    [".ts", ".js"],
    [".cts", ".cjs"],
    [".mts", ".mjs"],
    [".tsx", ".js"],
]

/**
 * Makes a file path to a fixture.
 * @param {string} name - A name.
 * @returns {string} A file path to a fixture.
 */
function fixture(name) {
    return path.resolve(__dirname, "../../fixtures/no-missing", name)
}

function cantResolve(name, dir = "") {
    return [
        {
            messageId: "notFound",
            data: {
                resolveError: `Can't resolve '${name}' in '${fixture(dir)}'`,
            },
        },
    ]
}

const ruleTester = new RuleTester()
ruleTester.run("no-missing-require", rule, {
    valid: [
        {
            filename: fixture("test.js"),
            code: "require('fs');",
        },
        {
            filename: fixture("test.js"),
            code: "require('node:fs');",
        },
        {
            filename: fixture("test.js"),
            code: "require('node:test');",
        },
        {
            filename: fixture("test.js"),
            code: "require('eslint');",
        },
        {
            filename: fixture("test.js"),
            code: "require('rimraf/package.json');",
        },
        {
            filename: fixture("test.js"),
            code: "require('./a');",
        },
        {
            filename: fixture("test.js"),
            code: "require('./a.js');",
        },
        {
            filename: fixture("test.js"),
            code: "require('./a.config');",
        },
        {
            filename: fixture("test.js"),
            code: "require('./a.config.js');",
        },
        {
            filename: fixture("test.js"),
            code: "require('./b');",
        },
        {
            filename: fixture("test.js"),
            code: "require('./b.json');",
        },
        {
            filename: fixture("test.js"),
            code: "require('./c.coffee');",
        },
        {
            filename: fixture("test.js"),
            code: "require('mocha');",
        },
        {
            filename: fixture("test.js"),
            code: "require(`eslint`);",
        },
        {
            filename: fixture("test.js"),
            code: "require('mocha!foo?a=b&c=d');",
        },

        // tryExtensions
        {
            filename: fixture("test.js"),
            code: "require('./c');",
            options: [{ tryExtensions: [".coffee"] }],
        },
        {
            filename: fixture("test.js"),
            code: "require('./c');",
            settings: { node: { tryExtensions: [".coffee"] } },
        },

        // resolvePaths
        {
            filename: fixture("test.js"),
            code: "require('./fixtures/no-missing/a');",
            settings: {
                node: { resolvePaths: [path.resolve(__dirname, "../../")] },
            },
        },
        {
            filename: fixture("test.js"),
            code: "require('./fixtures/no-missing/a');",
            options: [{ resolvePaths: [path.resolve(__dirname, "../../")] }],
        },
        {
            filename: fixture("test.js"),
            code: "require('./fixtures/no-missing/a');",
            options: [{ resolvePaths: ["tests"] }],
        },
        {
            filename: fixture("test.js"),
            code: "require('./fixtures/no-missing/a');",
            options: [{ resolvePaths: ["scripts", "tests"] }],
        },
        {
            filename: fixture("test.js"),
            code: "require('./a');",
            options: [{ resolvePaths: ["tests"] }],
        },

        // resolverConfig
        {
            filename: fixture("test.js"),
            code: "require('a');",
            options: [
                {
                    resolverConfig: {
                        modules: [fixture("./")],
                    },
                },
            ],
        },

        {
            filename: fixture("test.js"),
            code: "require('my-module');",
            options: [
                {
                    resolverConfig: {
                        modules: [fixture("my_modules")],
                    },
                },
            ],
        },

        // Ignores it if not callee.
        {
            filename: fixture("test.js"),
            code: "require;",
        },

        // Ignores it if the global variable of `require` is not defined.
        {
            filename: fixture("test.js"),
            code: "require('no-exist-package-0');",
            languageOptions: { globals: { require: "off" } },
        },

        // Ignores it if the filename is unknown.
        {
            code: "require('no-exist-package-0');",
        },
        {
            code: "require('./b');",
        },

        // Ignores it if the target is not string.
        {
            filename: fixture("test.js"),
            code: "require();",
        },
        {
            filename: fixture("test.js"),
            code: "require(foo);",
        },
        {
            filename: fixture("test.js"),
            code: "require(`foo${bar}`);",
        },

        // Should work fine if the filename is relative.
        {
            filename: "tests/fixtures/no-missing/test.js",
            code: "require('eslint');",
        },
        {
            filename: "tests/fixtures/no-missing/test.js",
            code: "require('./a');",
        },

        // Relative paths to a directory should work.
        {
            filename: fixture("test.js"),
            code: "require('.');",
        },
        {
            filename: fixture("test.js"),
            code: "require('./');",
        },
        {
            filename: fixture("test.js"),
            code: "require('./foo');",
        },
        {
            filename: fixture("test.js"),
            code: "require('./foo/');",
        },

        // allow option
        {
            filename: fixture("test.js"),
            code: "require('electron');",
            options: [{ allowModules: ["electron"] }],
        },
        {
            filename: fixture("test.js"),
            code: "require('jquery.cookie');",
            options: [{ allowModules: ["jquery.cookie"] }],
        },
        // allow virtual modules
        {
            filename: fixture("test.js"),
            code: "require('virtual:package-name');",
            options: [{ allowModules: ["virtual:package-name"] }],
        },
        {
            filename: fixture("test.js"),
            code: "require('virtual:package-scope/name');",
            options: [{ allowModules: ["virtual:package-scope"] }],
        },

        // typescriptExtensionMap
        {
            filename: fixture("test.tsx"),
            code: "require('./d.js');",
            settings: {
                node: { typescriptExtensionMap: tsReactExtensionMap },
            },
        },
        {
            filename: fixture("test.ts"),
            code: "require('./d.js');",
            settings: {
                node: { typescriptExtensionMap: tsReactExtensionMap },
            },
        },
        {
            filename: fixture("test.tsx"),
            code: "require('./e.js');",
            settings: {
                node: { typescriptExtensionMap: tsReactExtensionMap },
            },
        },
        {
            filename: fixture("test.ts"),
            code: "require('./e.js');",
            settings: {
                node: { typescriptExtensionMap: tsReactExtensionMap },
            },
        },
        {
            filename: fixture("test.tsx"),
            code: "require('./d.js');",
            options: [{ typescriptExtensionMap: tsReactExtensionMap }],
        },
        {
            filename: fixture("test.ts"),
            code: "require('./d.js');",
            options: [{ typescriptExtensionMap: tsReactExtensionMap }],
        },
        {
            filename: fixture("test.tsx"),
            code: "require('./e.js');",
            options: [{ typescriptExtensionMap: tsReactExtensionMap }],
        },
        {
            filename: fixture("test.ts"),
            code: "require('./e.js');",
            options: [{ typescriptExtensionMap: tsReactExtensionMap }],
        },

        // tsx mapping by name
        {
            filename: fixture("test.tsx"),
            code: "require('./e.jsx');",
            options: [{ typescriptExtensionMap: "preserve" }],
        },
        {
            filename: fixture("test.tsx"),
            code: "require('./e.js');",
            options: [{ typescriptExtensionMap: "react" }],
        },
        {
            filename: fixture("test.tsx"),
            code: "require('./e.jsx');",
            settings: { node: { typescriptExtensionMap: "preserve" } },
        },
        {
            filename: fixture("test.tsx"),
            code: "require('./e.js');",
            settings: { node: { typescriptExtensionMap: "react" } },
        },

        // explicit tsx from config
        {
            // name: "options[0] - preserve - e.tsx as e.jsx",
            filename: fixture("ts-react/test.tsx"),
            code: "require('./e.jsx');",
            options: [{ tsconfigPath: fixture("ts-preserve/tsconfig.json") }],
        },
        {
            // name: "options[0] - react - e.tsx as e.js",
            filename: fixture("ts-preserve/test.tsx"),
            code: "require('./e.js');",
            options: [{ tsconfigPath: fixture("ts-react/tsconfig.json") }],
        },
        {
            // name: "settings.node - preserve - e.tsx as e.jsx",
            filename: fixture("ts-react/test.tsx"),
            code: "require('./e.jsx');",
            settings: {
                node: { tsconfigPath: fixture("ts-preserve/tsconfig.json") },
            },
        },
        {
            // name: "settings.node - react - e.tsx as e.js",
            filename: fixture("ts-preserve/test.tsx"),
            code: "require('./e.js');",
            settings: {
                node: { tsconfigPath: fixture("ts-react/tsconfig.json") },
            },
        },

        // implicit tsx from config
        {
            filename: fixture("ts-react/test.tsx"),
            code: "require('./e.js');",
        },
        {
            filename: fixture("ts-react/test.ts"),
            code: "require('./d.js');",
        },
        {
            filename: fixture("ts-preserve/test.tsx"),
            code: "require('./e.jsx');",
        },
        {
            filename: fixture("ts-preserve/test.ts"),
            code: "require('./d.js');",
        },
        {
            filename: fixture("ts-extends/test.tsx"),
            code: "require('./e.js');",
        },
        {
            filename: fixture("ts-extends/test.ts"),
            code: "require('./d.js');",
        },

        // require.resolve
        {
            filename: fixture("test.js"),
            code: "require.resolve('eslint');",
        },
    ],
    invalid: [
        {
            filename: fixture("test.js"),
            code: "require('no-exist-package-0');",
            errors: cantResolve("no-exist-package-0"),
        },
        {
            filename: fixture("test.js"),
            code: "require('@mysticatea/test');",
            errors: cantResolve("@mysticatea/test"),
        },
        {
            filename: fixture("test.js"),
            code: "require('./c');",
            errors: cantResolve("./c"),
        },
        {
            filename: fixture("test.js"),
            code: "require('./d');",
            errors: cantResolve("./d"),
        },
        {
            filename: fixture("test.js"),
            code: "require('./a.json');",
            errors: cantResolve("./a.json"),
        },

        // Should work fine if the filename is relative.
        {
            filename: "tests/fixtures/no-missing/test.js",
            code: "require('no-exist-package-0');",
            errors: cantResolve("no-exist-package-0"),
        },
        {
            filename: "tests/fixtures/no-missing/test.js",
            code: "require('./c');",
            errors: cantResolve("./c"),
        },

        // Relative paths to a directory should work.
        {
            filename: fixture("test.js"),
            code: "require('./bar');",
            errors: cantResolve("./bar"),
        },
        {
            filename: fixture("test.js"),
            code: "require('./bar/');",
            errors: cantResolve("./bar/"),
        },

        // Case sensitive
        {
            filename: fixture("test.js"),
            code: "require('./A');",
            errors: cantResolve("./A"),
            skip: !isCaseSensitiveFileSystem,
        },

        // require.resolve
        {
            filename: fixture("test.js"),
            code: "require.resolve('no-exist-package-0');",
            errors: cantResolve("no-exist-package-0"),
        },

        // Virtual modules
        {
            filename: fixture("test.js"),
            code: "require('virtual:package-name');",
            errors: cantResolve("virtual:package-name"),
        },
        {
            filename: fixture("test.js"),
            code: "require('virtual:package-scope/name');",
            errors: cantResolve("virtual:package-scope/name"),
        },
    ],
})

describe("On specific working directory:", () => {
    const filename = fixture("test.js")
    let originalDir = null

    before(() => {
        originalDir = process.cwd()
        process.chdir(path.dirname(filename))
    })
    after(() => {
        process.chdir(originalDir)
    })

    ruleTester.run("no-missing-require", rule, {
        valid: [
            {
                filename: fixture("test.js"),
                code: "require('../../lib/rules/no-missing-require');",
            },
        ],
        invalid: [],
    })
})
