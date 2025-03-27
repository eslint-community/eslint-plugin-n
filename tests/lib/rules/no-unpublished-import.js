/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const { Linter } = require("eslint")
const RuleTester = require("#test-helpers").RuleTester
const rule = require("../../../lib/rules/no-unpublished-import")
const globals = require("globals")

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

/**
 * Makes a file path to a fixture.
 * @param {string} name - A name.
 * @returns {string} A file path to a fixture.
 */
function fixture(name) {
    return path.resolve(__dirname, "../../fixtures/no-unpublished", name)
}

const ruleTester = new RuleTester({
    languageOptions: {
        sourceType: "module",
        env: { node: false },
    },
})
ruleTester.run("no-unpublished-import", rule, {
    valid: [
        {
            filename: fixture("1/test.js"),
            code: "import fs from 'fs';",
        },
        {
            filename: fixture("1/test.js"),
            code: "import aaa from 'aaa'; aaa();",
        },
        {
            filename: fixture("1/test.js"),
            code: "import c from 'aaa/a/b/c';",
        },
        {
            filename: fixture("1/test.js"),
            code: "import a from './a';",
        },
        {
            filename: fixture("1/test.js"),
            code: "import a from './a.js';",
        },
        {
            filename: fixture("2/ignore1.js"),
            code: "import test from './test';",
        },
        {
            filename: fixture("2/ignore1.js"),
            code: "import bbb from 'bbb';",
        },
        {
            filename: fixture("2/ignore1.js"),
            code: "import c from 'bbb/a/b/c';",
        },
        {
            filename: fixture("2/ignore1.js"),
            code: "import ignore2 from './ignore2';",
        },
        {
            filename: fixture("3/test.js"),
            code: "import a from './pub/a';",
        },
        {
            filename: fixture("3/test.js"),
            code: "import test2 from './test2';",
        },
        {
            filename: fixture("3/test.js"),
            code: "import aaa from 'aaa';",
        },
        {
            filename: fixture("3/test.js"),
            code: "import bbb from 'bbb';",
        },
        {
            filename: fixture("3/pub/ignore1.js"),
            code: "import bbb from 'bbb';",
        },
        {
            filename: fixture("3/pub/test.js"),
            code: "import p from '../package.json';",
        },
        {
            filename: fixture("3/src/pub/test.js"),
            code: "import bbb from 'bbb';",
        },
        {
            filename: fixture("3/src/pub/test.js"),
            code: "import bbb from 'bbb!foo?a=b&c=d';",
        },

        // Ignores it if the filename is unknown.
        "import noExistPackage0 from 'no-exist-package-0';",
        "import b from './b';",

        // Should work fine if the filename is relative.
        {
            filename: "tests/fixtures/no-unpublished/2/test.js",
            code: "import aaa from 'aaa';",
        },
        {
            filename: "tests/fixtures/no-unpublished/2/test.js",
            code: "import a from './a';",
        },

        // allow module
        {
            filename: fixture("1/test.js"),
            code: "import electron from 'electron';",
            options: [{ allowModules: ["electron"] }],
        },
        // allow virtual modules
        {
            filename: fixture("test.js"),
            code: "import a from 'virtual:package-name';",
            options: [{ allowModules: ["virtual:package-name"] }],
        },
        {
            filename: fixture("test.js"),
            code: "import a from 'virtual:package-scope/name';",
            options: [{ allowModules: ["virtual:package-scope"] }],
        },
        // try extensions
        {
            filename: fixture("4/index.jsx"),
            code: "import abc from './abc';",
            options: [
                {
                    tryExtensions: [".jsx"],
                },
            ],
        },

        // Auto-published files only apply to root package directory
        {
            filename: fixture("3/src/readme.js"),
            code: "import bbb from 'bbb';",
            languageOptions: { globals: globals.node },
        },

        // Negative patterns in files field.
        {
            filename: fixture("negative-in-files/lib/__test__/index.js"),
            code: "import bbb from 'bbb';",
        },

        // devDependency in a private package
        {
            filename: fixture("private-package/index.js"),
            code: "import bbb from 'bbb';",
        },

        // https://github.com/eslint-community/eslint-plugin-n/issues/78
        {
            filename: fixture("1/test.ts"),
            languageOptions: { parser: require("@typescript-eslint/parser") },
            code: "import type foo from 'foo';",
            options: [{ ignoreTypeImport: true }],
        },

        // imports using `tsconfig.json > compilerOptions > paths` setting
        // https://github.com/eslint-community/eslint-plugin-n/issues/421
        {
            filename: fixture("tsconfig-paths-wildcard/index.ts"),
            code: "import foo from '@test/dev'",
            options: [
                {
                    allowModules: ["@test/dev"],
                },
            ],
        },
    ],
    invalid: [
        {
            filename: fixture("2/test.js"),
            code: "import ignore1 from './ignore1.js';",
            errors: ['"./ignore1.js" is not published.'],
        },
        {
            filename: fixture("3/pub/test.js"),
            code: "import bbb from 'bbb';",
            errors: ['"bbb" is not published.'],
        },
        {
            filename: fixture("3/pub/test.js"),
            code: "import ignore1 from './ignore1.js';",
            errors: ['"./ignore1.js" is not published.'],
        },
        {
            filename: fixture("3/pub/test.js"),
            code: "import abc from './abc.json';",
            errors: ['"./abc.json" is not published.'],
        },
        {
            filename: fixture("3/pub/test.js"),
            code: "import test from '../test';",
            errors: ['"../test" is not published.'],
        },
        {
            filename: fixture("3/pub/test.js"),
            code: "import a from '../src/pub/a.js';",
            errors: ['"../src/pub/a.js" is not published.'],
        },

        {
            filename: fixture("1/test.js"),
            code: "import a from '../a.js';",
            errors: ['"../a.js" is not published.'],
        },

        // Should work fine if the filename is relative.
        {
            filename: "tests/fixtures/no-unpublished/2/test.js",
            code: "import ignore1 from './ignore1.js';",
            errors: ['"./ignore1.js" is not published.'],
        },

        // `convertPath` option.
        {
            filename: fixture("3/src/test.jsx"),
            code: "import a from '../test.jsx';",
            errors: ['"../test.jsx" is not published.'],
            settings: {
                node: {
                    convertPath: {
                        "src/**/*.jsx": ["src/(.+?)\\.jsx", "pub/$1.js"],
                    },
                },
            },
        },
        {
            filename: fixture("3/src/test.jsx"),
            code: "import a from '../test.jsx';",
            options: [
                {
                    convertPath: {
                        "src/**/*.jsx": ["src/(.+?)\\.jsx", "pub/$1.js"],
                    },
                },
            ],
            errors: ['"../test.jsx" is not published.'],
        },
        {
            filename: fixture("3/src/test.jsx"),
            code: "import a from '../test.jsx';",
            errors: ['"../test.jsx" is not published.'],
            settings: {
                node: {
                    convertPath: [
                        {
                            include: ["src/**/*.jsx"],
                            replace: ["src/(.+?)\\.jsx", "pub/$1.js"],
                        },
                    ],
                },
            },
        },
        {
            filename: fixture("3/src/test.jsx"),
            code: "import a from '../test.jsx';",
            options: [
                {
                    convertPath: [
                        {
                            include: ["src/**/*.jsx"],
                            replace: ["src/(.+?)\\.jsx", "pub/$1.js"],
                        },
                    ],
                },
            ],
            errors: ['"../test.jsx" is not published.'],
        },
        // try extensions
        {
            filename: fixture("4/index.jsx"),
            code: "import abc from './abc';",
            errors: ['"./abc" is not published.'],
            // Without setting tryExtensions, it defaults to [".js", ".json", ".node"], and thus
            // cannot find the abc.jsx file, which is published.
            //
            // options: [{ tryExtensions: [".jsx"], }],
        },

        // outside of the package.
        {
            filename: fixture("1/test.js"),
            code: "import a from '../2/a.js';",
            languageOptions: { globals: globals.node },
            errors: ['"../2/a.js" is not published.'],
        },

        // import()
        ...(DynamicImportSupported
            ? [
                  {
                      filename: fixture("2/test.js"),
                      code: "function f() { import('./ignore1.js') }",
                      languageOptions: { ecmaVersion: 2020 },
                      errors: ['"./ignore1.js" is not published.'],
                  },
              ]
            : []),

        // https://github.com/eslint-community/eslint-plugin-n/issues/78
        {
            filename: fixture("1/test.ts"),
            languageOptions: { parser: require("@typescript-eslint/parser") },
            code: "import type foo from 'foo';",
            options: [{ ignoreTypeImport: false }],
            errors: [{ messageId: "notPublished" }],
        },

        {
            filename: fixture("1/test.ts"),
            languageOptions: { parser: require("@typescript-eslint/parser") },
            code: "import type foo from 'foo';",
            errors: [{ messageId: "notPublished" }],
        },

        // devDependency in a private package
        {
            filename: fixture("private-package/index.js"),
            code: "import bbb from 'bbb';",
            errors: ['"bbb" is not published.'],
            options: [{ ignorePrivate: false }],
        },
    ],
})
