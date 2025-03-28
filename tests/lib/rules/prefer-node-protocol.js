/**
 * @author Yusuke Iinuma
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { RuleTester } = require("#test-helpers")
const rule = require("../../../lib/rules/prefer-node-protocol.js")

new RuleTester({
    languageOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
}).run("prefer-node-protocol", rule, {
    valid: [
        'import nodePlugin from "eslint-plugin-n";',
        'import fs from "./fs";',
        'import fs from "unknown-builtin-module";',
        'import fs from "node:fs";',
        `
            async function foo() {
			    const fs = await import(fs);
		    }
        `,
        `
            async function foo() {
                const fs = await import(0);
            }
        `,
        `
            async function foo() {
                const fs = await import(\`fs\`);
            }
        `,
        // punycode has no `node:` equivelent
        'import "punycode";',
        'import "punycode/";',
        // https://bun.sh/docs/runtime/bun-apis
        'import "bun";',
        'import "bun:jsc";',
        'import "bun:sqlite";',
        'export {promises} from "node:fs";',

        // `require`
        'const fs = require("node:fs");',
        'const fs = require("node:fs/promises");',
        "const fs = require(fs);",
        'const fs = notRequire("fs");',
        'const fs = foo.require("fs");',
        'const fs = require.resolve("fs");',
        "const fs = require(`fs`);",
        'const fs = require?.("fs");',
        'const fs = require("fs", extra);',
        "const fs = require();",
        'const fs = require(...["fs"]);',
        'const fs = require("eslint-plugin-n");',

        // check disabling by supported Node.js versions
        {
            options: [{ version: "12.19.1" }],
            code: 'import fs from "fs";',
        },
        {
            options: [{ version: "13.14.0" }],
            code: 'import fs from "fs";',
        },
        {
            options: [{ version: "14.13.0" }],
            code: 'import fs from "fs";',
        },
        {
            options: [{ version: "14.17.6" }],
            code: 'const fs = require("fs");',
        },
        {
            options: [{ version: "15.14.0" }],
            code: 'const fs = require("fs");',
        },

        // `process.getBuiltinModule`
        'const fs = process.getBuiltinModule("node:fs");',
        'const fs = globalThis.process.getBuiltinModule("node:fs");',
        'const fs = process.getBuiltinModule("node:fs/promises");',
        'const fs = process.getNotBuiltinModule("node:fs", extra);',
        "const fs = process.getBuiltinModule(fs);",
        'const fs = process.getNotBuiltinModule("fs");',
        'const fs = process.foo.getNotBuiltinModule("fs");',
        'const fs = foo.process.getNotBuiltinModule("fs");',
        'const fs = process.getNotBuiltinModule.foo("fs");',
        "const fs = process.getNotBuiltinModule(`fs`);",
        "const fs = process.getNotBuiltinModule();",
        'const fs = process.getNotBuiltinModule(...["fs"]);',
        'const fs = process.getNotBuiltinModule("eslint-plugin-n");',
        {
            options: [{ version: "12.19.1" }],
            code: 'const fs = process.getBuiltinModule("node:fs");',
        },
    ],
    invalid: [
        {
            code: 'import fs from "fs";',
            output: 'import fs from "node:fs";',
            errors: ["Prefer `node:fs` over `fs`."],
        },
        {
            code: 'export {promises} from "fs";',
            output: 'export {promises} from "node:fs";',
            errors: ["Prefer `node:fs` over `fs`."],
        },
        {
            code: `
                async function foo() {
                    const fs = await import('fs');
                }
            `,
            output: `
                async function foo() {
                    const fs = await import('node:fs');
                }
            `,
            errors: ["Prefer `node:fs` over `fs`."],
        },
        {
            code: 'import fs from "fs/promises";',
            output: 'import fs from "node:fs/promises";',
            errors: ["Prefer `node:fs/promises` over `fs/promises`."],
        },
        {
            code: 'export {default} from "fs/promises";',
            output: 'export {default} from "node:fs/promises";',
            errors: ["Prefer `node:fs/promises` over `fs/promises`."],
        },
        {
            code: `
                async function foo() {
                    const fs = await import('fs/promises');
                }
            `,
            output: `
                async function foo() {
                    const fs = await import('node:fs/promises');
                }
            `,
            errors: ["Prefer `node:fs/promises` over `fs/promises`."],
        },
        {
            code: 'import {promises} from "fs";',
            output: 'import {promises} from "node:fs";',
            errors: ["Prefer `node:fs` over `fs`."],
        },
        {
            code: 'export {default as promises} from "fs";',
            output: 'export {default as promises} from "node:fs";',
            errors: ["Prefer `node:fs` over `fs`."],
        },
        {
            code: "import {promises} from 'fs';",
            output: "import {promises} from 'node:fs';",
            errors: ["Prefer `node:fs` over `fs`."],
        },
        {
            code: `
                async function foo() {
                    const fs = await import("fs/promises");
                }
            `,
            output: `
                async function foo() {
                    const fs = await import("node:fs/promises");
                }
            `,
            errors: ["Prefer `node:fs/promises` over `fs/promises`."],
        },
        {
            code: `
                async function foo() {
                    const fs = await import(/* escaped */"\\u{66}s/promises");
                }
            `,
            output: `
                async function foo() {
                    const fs = await import(/* escaped */"node:\\u{66}s/promises");
                }
            `,
            errors: ["Prefer `node:fs/promises` over `fs/promises`."],
        },
        {
            code: 'import "buffer";',
            output: 'import "node:buffer";',
            errors: ["Prefer `node:buffer` over `buffer`."],
        },
        {
            code: 'import "child_process";',
            output: 'import "node:child_process";',
            errors: ["Prefer `node:child_process` over `child_process`."],
        },
        {
            code: 'import "timers/promises";',
            output: 'import "node:timers/promises";',
            errors: ["Prefer `node:timers/promises` over `timers/promises`."],
        },

        // `require`
        {
            code: 'const {promises} = require("fs")',
            output: 'const {promises} = require("node:fs")',
            errors: ["Prefer `node:fs` over `fs`."],
        },
        {
            code: "const fs = require('fs/promises')",
            output: "const fs = require('node:fs/promises')",
            errors: ["Prefer `node:fs/promises` over `fs/promises`."],
        },
        {
            code: `
                const express = require('express');
                const fs = require('fs/promises');
            `,
            output: `
                const express = require('express');
                const fs = require('node:fs/promises');
            `,
            errors: ["Prefer `node:fs/promises` over `fs/promises`."],
        },

        // check enabling by supported Node.js versions
        {
            options: [{ version: "12.20.0" }],
            code: 'import fs from "fs";',
            output: 'import fs from "node:fs";',
            errors: ["Prefer `node:fs` over `fs`."],
        },
        {
            options: [{ version: "14.13.1" }],
            code: 'import fs from "fs";',
            output: 'import fs from "node:fs";',
            errors: ["Prefer `node:fs` over `fs`."],
        },
        {
            options: [{ version: "14.18.0" }],
            code: 'const fs = require("fs");',
            output: 'const fs = require("node:fs");',
            errors: ["Prefer `node:fs` over `fs`."],
        },
        {
            options: [{ version: "16.0.0" }],
            code: 'const fs = require("fs");',
            output: 'const fs = require("node:fs");',
            errors: ["Prefer `node:fs` over `fs`."],
        },
        {
            options: [{ version: "12.20.0" }],
            code: `
                const fs = require("fs");
                import buffer from 'buffer'
            `,
            output: `
                const fs = require("fs");
                import buffer from 'node:buffer'
            `,
            errors: ["Prefer `node:buffer` over `buffer`."],
        },

        // https://github.com/eslint-community/eslint-plugin-n/issues/431
        {
            code: 'import https from "https";',
            output: 'import https from "node:https";',
            errors: ["Prefer `node:https` over `https`."],
        },

        // `process.getBuiltinModule`
        {
            code: 'const {promises} = process.getBuiltinModule("fs")',
            output: 'const {promises} = process.getBuiltinModule("node:fs")',
            errors: ["Prefer `node:fs` over `fs`."],
        },
        {
            code: 'const {promises} = globalThis.process.getBuiltinModule("fs")',
            output: 'const {promises} = globalThis.process.getBuiltinModule("node:fs")',
            errors: ["Prefer `node:fs` over `fs`."],
        },
        {
            code: 'const {promises} = process.getBuiltinModule("fs", extra)',
            output: 'const {promises} = process.getBuiltinModule("node:fs", extra)',
            errors: ["Prefer `node:fs` over `fs`."],
        },
        {
            code: "const fs = process.getBuiltinModule('fs/promises')",
            output: "const fs = process.getBuiltinModule('node:fs/promises')",
            errors: ["Prefer `node:fs/promises` over `fs/promises`."],
        },
        {
            code: `
                const express = process.getBuiltinModule('express');
                const fs = process.getBuiltinModule('fs/promises');
            `,
            output: `
                const express = process.getBuiltinModule('express');
                const fs = process.getBuiltinModule('node:fs/promises');
            `,
            errors: ["Prefer `node:fs/promises` over `fs/promises`."],
        },
        {
            options: [{ version: "12.19.1" }],
            code: 'const {promises} = process.getBuiltinModule("fs")',
            output: 'const {promises} = process.getBuiltinModule("node:fs")',
            errors: ["Prefer `node:fs` over `fs`."],
        },
    ],
})
