/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const { Linter } = require("eslint")
const { RuleTester } = require("#test-helpers")
const rule = require("../../../lib/rules/no-extraneous-import")

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
    return path.resolve(__dirname, "../../fixtures/no-extraneous", name)
}

const ruleTester = new RuleTester({
    languageOptions: { sourceType: "module" },
    settings: {
        n: {
            tryExtensions: [".ts"],
        },
    },
})
ruleTester.run("no-extraneous-import", rule, {
    valid: [
        {
            filename: fixture("dependencies/a.js"),
            code: "import bbb from './bbb'",
        },
        {
            filename: fixture("dependencies/a.js"),
            code: "import aaa from 'aaa'",
        },
        {
            filename: fixture("dependencies/a.js"),
            code: "import bbb from 'aaa/bbb'",
        },
        {
            filename: fixture("dependencies/a.js"),
            code: "import aaa from '@bbb/aaa'",
        },
        {
            filename: fixture("dependencies/a.js"),
            code: "import bbb from '@bbb/aaa/bbb'",
        },
        {
            filename: fixture("devDependencies/a.js"),
            code: "import aaa from 'aaa'",
        },
        {
            filename: fixture("peerDependencies/a.js"),
            code: "import aaa from 'aaa'",
        },
        {
            filename: fixture("optionalDependencies/a.js"),
            code: "import aaa from 'aaa'",
        },
        {
            filename: fixture("import-map/a.js"),
            code: "import '#b'",
        },

        // missing packages are warned by no-missing-import
        {
            filename: fixture("dependencies/a.js"),
            code: "import ccc from 'ccc'",
        },

        // imports using `tsconfig.json > compilerOptions > paths` setting
        // https://github.com/eslint-community/eslint-plugin-n/issues/379
        {
            filename: fixture("tsconfig-paths/index.ts"),
            code: "import foo from '@configurations/foo'",
        },
        {
            filename: fixture("tsconfig-paths/index.ts"),
            code: "import foo from '~configurations/foo'",
        },
        {
            filename: fixture("tsconfig-paths/index.ts"),
            code: "import foo from '#configurations/foo'",
        },

        // virtual modules
        {
            filename: fixture("test.js"),
            code: "import a from 'virtual:package-name';",
        },
        {
            filename: fixture("test.js"),
            code: "import a from 'virtual:package-scope/name';",
        },
    ],
    invalid: [
        {
            filename: fixture("dependencies/a.js"),
            code: "import bbb from 'bbb'",
            errors: ['"bbb" is extraneous.'],
        },
        {
            filename: fixture("devDependencies/a.js"),
            code: "import bbb from 'bbb'",
            errors: ['"bbb" is extraneous.'],
        },
        {
            filename: fixture("peerDependencies/a.js"),
            code: "import bbb from 'bbb'",
            errors: ['"bbb" is extraneous.'],
        },
        {
            filename: fixture("optionalDependencies/a.js"),
            code: "import bbb from 'bbb'",
            errors: ['"bbb" is extraneous.'],
        },

        // import()
        ...(DynamicImportSupported
            ? [
                  {
                      filename: fixture("dependencies/a.js"),
                      code: "function f() { import('bbb') }",
                      languageOptions: { ecmaVersion: 2020 },
                      errors: ['"bbb" is extraneous.'],
                  },
              ]
            : []),
    ],
})
