/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */

import path from "node:path"
import typescriptParser from "@typescript-eslint/parser"
import { Linter } from "eslint"
import { RuleTester } from "#test-helpers"
import rule from "../../../lib/rules/no-extraneous-import.js"

const DynamicImportSupported = (() => {
    const config = { languageOptions: { ecmaVersion: 2020 } }
    const messages = new Linter().verify("import(s)", config)
    return messages.length === 0
})()

if (!DynamicImportSupported) {
    console.warn(
        "[%s] Skip tests for 'import()'",
        path.basename(import.meta.filename, ".js")
    )
}

/**
 * Makes a file path to a fixture.
 * @param {string} name - A name.
 * @returns {string} A file path to a fixture.
 */
function fixture(name) {
    return path.resolve(
        import.meta.dirname,
        "../../fixtures/no-extraneous",
        name
    )
}

const ruleTester = new RuleTester({
    languageOptions: { sourceType: "module" },
    settings: {
        n: {
            tryExtensions: [".ts"],
        },
    },
})
const workspaceResolveSettings = {
    n: {
        tryExtensions: [".js", ".json", ".node", ".mjs", ".cjs"],
    },
}
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
        {
            filename: fixture("workspace/packages/app/src/index.js"),
            code: "import rootDep from 'root-dep'",
            settings: workspaceResolveSettings,
        },
        {
            filename: fixture("workspace/packages/app/src/index.js"),
            code: "import rootDevDep from 'root-dev-dep'",
            settings: workspaceResolveSettings,
        },
        {
            filename: fixture("workspace-object/packages/app/src/index.js"),
            code: "import rootDep from 'root-dep'",
            settings: workspaceResolveSettings,
        },
        {
            filename: fixture(
                "workspace-nested/inner/packages/app/src/index.js"
            ),
            code: "import rootDep from 'root-dep'",
            settings: workspaceResolveSettings,
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
        {
            filename: fixture(
                "workspace-negated/packages/excluded/src/index.js"
            ),
            code: "import rootDep from 'root-dep'",
            settings: workspaceResolveSettings,
            errors: ['"root-dep" is extraneous.'],
        },
        {
            filename: fixture(
                "workspace-nested/inner/packages/app/src/index.js"
            ),
            code: "import outerDep from 'outer-dep'",
            settings: workspaceResolveSettings,
            errors: ['"outer-dep" is extraneous.'],
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

const tsRuleTester = new RuleTester({
    languageOptions: {
        parser: typescriptParser,
        sourceType: "module",
    },
})
tsRuleTester.run("no-extraneous-import/typescript", rule, {
    valid: [
        {
            filename: fixture("typesOnly/a.ts"),
            code: "import type { Glob } from 'picomatch'",
        },
        {
            filename: fixture("typesOnly/a.ts"),
            code: "export type { Glob } from 'picomatch'",
        },
    ],
    invalid: [
        {
            filename: fixture("typesOnly/a.ts"),
            code: "import { scan } from 'picomatch'",
            errors: ['"picomatch" is extraneous.'],
        },
        {
            filename: fixture("typesOnly/a.ts"),
            code: "export { scan } from 'picomatch'",
            errors: ['"picomatch" is extraneous.'],
        },
    ],
})
