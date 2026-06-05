/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */

import path from "node:path"
import { RuleTester } from "#test-helpers"
import rule from "../../../lib/rules/no-extraneous-require.js"

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

const tester = new RuleTester()
const workspaceResolveSettings = {
    n: {
        tryExtensions: [".js", ".json", ".node", ".mjs", ".cjs"],
    },
}

tester.run("no-extraneous-require", rule, {
    valid: [
        {
            filename: fixture("dependencies/a.js"),
            code: "$.require('bbb')",
        },
        {
            filename: fixture("dependencies/a.js"),
            code: "require('./bbb')",
        },
        {
            filename: fixture("dependencies/a.js"),
            code: "require(bbb)",
        },
        {
            filename: fixture("dependencies/a.js"),
            code: "require('aaa')",
        },
        {
            filename: fixture("dependencies/a.js"),
            code: "require('aaa/bbb')",
        },
        {
            filename: fixture("dependencies/a.js"),
            code: "require('@bbb/aaa')",
        },
        {
            filename: fixture("dependencies/a.js"),
            code: "require('@bbb/aaa/bbb')",
        },
        {
            filename: fixture("devDependencies/a.js"),
            code: "require('aaa')",
        },
        {
            filename: fixture("peerDependencies/a.js"),
            code: "require('aaa')",
        },
        {
            filename: fixture("optionalDependencies/a.js"),
            code: "require('aaa')",
        },
        {
            filename: fixture("workspace/packages/app/src/index.js"),
            code: "require('root-dep')",
            settings: workspaceResolveSettings,
        },
        {
            filename: fixture("workspace-object/packages/app/src/index.js"),
            code: "require('root-dep')",
            settings: workspaceResolveSettings,
        },
        {
            filename: fixture(
                "workspace-nested/inner/packages/app/src/index.js"
            ),
            code: "require('root-dep')",
            settings: workspaceResolveSettings,
        },

        // missing packages are warned by no-missing-require
        {
            filename: fixture("dependencies/a.js"),
            code: "require('ccc')",
        },

        // virtual modules
        {
            filename: fixture("test.js"),
            code: "require('virtual:package-name');",
        },
        {
            filename: fixture("test.js"),
            code: "require('virtual:package-scope/name');",
        },
    ],
    invalid: [
        {
            filename: fixture("dependencies/a.js"),
            code: "require('bbb')",
            errors: ['"bbb" is extraneous.'],
        },
        {
            filename: fixture("devDependencies/a.js"),
            code: "require('bbb')",
            errors: ['"bbb" is extraneous.'],
        },
        {
            filename: fixture("peerDependencies/a.js"),
            code: "require('bbb')",
            errors: ['"bbb" is extraneous.'],
        },
        {
            filename: fixture("optionalDependencies/a.js"),
            code: "require('bbb')",
            errors: ['"bbb" is extraneous.'],
        },
        {
            filename: fixture(
                "workspace-negated/packages/excluded/src/index.js"
            ),
            code: "require('root-dep')",
            settings: workspaceResolveSettings,
            errors: ['"root-dep" is extraneous.'],
        },
        {
            filename: fixture(
                "workspace-nested/inner/packages/app/src/index.js"
            ),
            code: "require('outer-dep')",
            settings: workspaceResolveSettings,
            errors: ['"outer-dep" is extraneous.'],
        },
        {
            filename: fixture("dependencies/a.js"),
            code: "require('b'+'bb')",
            errors: ['"bbb" is extraneous.'],
        },
    ],
})
