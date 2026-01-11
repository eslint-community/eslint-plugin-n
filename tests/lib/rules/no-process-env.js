/**
 * @author Vignesh Anand
 * See LICENSE file in root directory for full license.
 */

import { RuleTester } from "#test-helpers"
import rule from "../../../lib/rules/no-process-env.js"

new RuleTester().run("no-process-env", rule, {
    valid: [
        "Process.env",
        "process[env]",
        "process.nextTick",
        "process.execArgv",

        // allowedVariables
        {
            code: "process.env.NODE_ENV",
            options: [{ allowedVariables: ["NODE_ENV"] }],
        },
        {
            code: "process.env['NODE_ENV']",
            options: [{ allowedVariables: ["NODE_ENV"] }],
        },
        {
            code: "process['env'].NODE_ENV",
            options: [{ allowedVariables: ["NODE_ENV"] }],
        },
        {
            code: "process['env']['NODE_ENV']",
            options: [{ allowedVariables: ["NODE_ENV"] }],
        },
    ],

    invalid: [
        {
            code: "process.env",
            errors: [
                {
                    messageId: "unexpectedProcessEnv",
                },
            ],
        },
        {
            code: "process['env']",
            errors: [
                {
                    messageId: "unexpectedProcessEnv",
                },
            ],
        },
        {
            code: "process.env.ENV",
            errors: [
                {
                    messageId: "unexpectedProcessEnv",
                },
            ],
        },
        {
            code: "f(process.env)",
            errors: [
                {
                    messageId: "unexpectedProcessEnv",
                },
            ],
        },

        // allowedVariables
        {
            code: "process.env['OTHER_VARIABLE']",
            options: [{ allowedVariables: ["NODE_ENV"] }],
            errors: [{ messageId: "unexpectedProcessEnv" }],
        },
        {
            code: "process.env.OTHER_VARIABLE",
            options: [{ allowedVariables: ["NODE_ENV"] }],
            errors: [{ messageId: "unexpectedProcessEnv" }],
        },
        {
            code: "process['env']['OTHER_VARIABLE']",
            options: [{ allowedVariables: ["NODE_ENV"] }],
            errors: [{ messageId: "unexpectedProcessEnv" }],
        },
        {
            code: "process['env'].OTHER_VARIABLE",
            options: [{ allowedVariables: ["NODE_ENV"] }],
            errors: [{ messageId: "unexpectedProcessEnv" }],
        },
        {
            code: "process.env[NODE_ENV]",
            options: [{ allowedVariables: ["NODE_ENV"] }],
            errors: [{ messageId: "unexpectedProcessEnv" }],
        },
        {
            code: "process['env'][NODE_ENV]",
            options: [{ allowedVariables: ["NODE_ENV"] }],
            errors: [{ messageId: "unexpectedProcessEnv" }],
        },
    ],
})
