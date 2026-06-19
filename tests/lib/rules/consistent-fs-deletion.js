/**
 * @author copilot
 * See LICENSE file in root directory for full license.
 */

import { RuleTester } from "#test-helpers"
import rule from "../../../lib/rules/consistent-fs-deletion.js"

new RuleTester({
    languageOptions: { sourceType: "module" },
}).run("consistent-fs-deletion", rule, {
    valid: [
        "const fs = require('fs'); fs.rm()",
        "const fs = require('fs'); fs.rmSync()",
        "const fs = require('fs'); fs.promises.rm()",
        "const fs = require('node:fs'); fs.promises.rm()",
        "import fs from 'fs'; fs.promises.rm()",
        "import fs from 'node:fs'; fs.promises.rm()",
        "const fs = require('fs/promises'); fs.rm()",
        "import fs from 'fs/promises'; fs.rm()",
    ],
    invalid: [
        {
            code: "const fs = require('fs'); fs.unlink()",
            errors: [{ messageId: "preferFsRm", data: { name: "unlink" } }],
        },
        {
            code: "const fs = require('fs'); fs.rmdir()",
            errors: [{ messageId: "preferFsRm", data: { name: "rmdir" } }],
        },
        {
            code: "const fs = require('fs'); fs.unlinkSync()",
            errors: [{ messageId: "preferFsRm", data: { name: "unlinkSync" } }],
        },
        {
            code: "const fs = require('fs'); fs.rmdirSync()",
            errors: [{ messageId: "preferFsRm", data: { name: "rmdirSync" } }],
        },
        {
            code: "const fs = require('fs'); fs.promises.unlink()",
            errors: [
                { messageId: "preferFsRmPromises", data: { name: "unlink" } },
            ],
        },
        {
            code: "const fs = require('fs'); fs.promises.rmdir()",
            errors: [
                { messageId: "preferFsRmPromises", data: { name: "rmdir" } },
            ],
        },
        {
            code: "import fs from 'fs'; fs.unlink()",
            errors: [{ messageId: "preferFsRm", data: { name: "unlink" } }],
        },
        {
            code: "import fs from 'node:fs/promises'; fs.unlink()",
            errors: [
                { messageId: "preferFsRmPromises", data: { name: "unlink" } },
            ],
        },
        {
            code: "const { unlink } = require('fs'); unlink()",
            errors: [{ messageId: "preferFsRm", data: { name: "unlink" } }],
        },
        {
            code: "const { unlink } = require('node:fs/promises'); unlink()",
            errors: [
                { messageId: "preferFsRmPromises", data: { name: "unlink" } },
            ],
        },
        {
            code: "import { unlink } from 'fs/promises'; unlink()",
            errors: [
                { messageId: "preferFsRmPromises", data: { name: "unlink" } },
            ],
        },
    ],
})
