/**
 * @author Nicholas C. Zakas
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("#test-helpers").RuleTester
const rule = require("../../../lib/rules/no-path-concat")

new RuleTester().run("no-path-concat", rule, {
    valid: [
        'var fullPath = dirname + "foo.js";',
        'var fullPath = __dirname == "foo.js";',
        "if (fullPath === __dirname) {}",
        "if (__dirname === fullPath) {}",
        'var fullPath = "/foo.js" + __filename;',
        'var fullPath = "/foo.js" + __dirname;',
        'var fullPath = __filename + ".map";',
        "var fullPath = `${__filename}.map`;",
        'var fullPath = __filename + (test ? ".js" : ".ts");',
        'var fullPath = __filename + (ext || ".js");',
    ],

    invalid: [
        {
            code: 'var fullPath = __dirname + "/foo.js";',
            errors: [
                {
                    messageId: "usePathFunctions",
                },
            ],
        },
        {
            code: 'var fullPath = __filename + "/foo.js";',
            errors: [
                {
                    messageId: "usePathFunctions",
                },
            ],
        },
        {
            code: "var fullPath = `${__dirname}/foo.js`;",
            errors: [
                {
                    messageId: "usePathFunctions",
                },
            ],
        },
        {
            code: "var fullPath = `${__filename}/foo.js`;",
            errors: [
                {
                    messageId: "usePathFunctions",
                },
            ],
        },
        {
            code: 'var path = require("path"); var fullPath = `${__dirname}${path.sep}foo.js`;',
            errors: [
                {
                    messageId: "usePathFunctions",
                },
            ],
        },
        {
            code: 'var path = require("path"); var fullPath = `${__filename}${path.sep}foo.js`;',
            errors: [
                {
                    messageId: "usePathFunctions",
                },
            ],
        },
        {
            code: 'var path = require("path"); var fullPath = __dirname + path.sep + `foo.js`;',
            errors: [
                {
                    messageId: "usePathFunctions",
                },
            ],
        },
        {
            code: 'var fullPath = __dirname + "/" + "foo.js";',
            errors: [
                {
                    messageId: "usePathFunctions",
                },
            ],
        },
        {
            code: 'var fullPath = __dirname + ("/" + "foo.js");',
            errors: [
                {
                    messageId: "usePathFunctions",
                },
            ],
        },
        {
            code: 'var fullPath = __dirname + (test ? "/foo.js" : "/bar.js");',
            errors: [
                {
                    messageId: "usePathFunctions",
                },
            ],
        },
        {
            code: 'var fullPath = __dirname + (extraPath || "/default.js");',
            errors: [
                {
                    messageId: "usePathFunctions",
                },
            ],
        },
        {
            code: `var fullPath = __dirname + "\\${path.sep}foo.js";`,
            errors: [
                {
                    messageId: "usePathFunctions",
                },
            ],
        },
        {
            code: `var fullPath = __filename + "\\${path.sep}foo.js";`,
            errors: [
                {
                    messageId: "usePathFunctions",
                },
            ],
        },
        {
            code: `var fullPath = \`\${__dirname}\\${path.sep}foo.js\`;`,
            errors: [
                {
                    messageId: "usePathFunctions",
                },
            ],
        },
        {
            code: `var fullPath = \`\${__filename}\\${path.sep}foo.js\`;`,
            errors: [
                {
                    messageId: "usePathFunctions",
                },
            ],
        },
    ],
})
