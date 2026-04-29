/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import cp from "child_process"
import fs from "fs"
import path from "path"
const logger = console

    // main
    ; (ruleId => {
        if (ruleId == null) {
            logger.error("Usage: npm run new <RuleID>")
            process.exitCode = 1
            return
        }
        if (!/^[\w-]+$/u.test(ruleId)) {
            logger.error("Invalid RuleID '%s'.", ruleId)
            process.exitCode = 1
            return
        }

        const ruleFile = path.resolve(import.meta.dirname, `../lib/rules/${ruleId}.js`)
        const testFile = path.resolve(import.meta.dirname, `../tests/lib/rules/${ruleId}.js`)
        const docFile = path.resolve(import.meta.dirname, `../docs/rules/${ruleId}.md`)

        fs.writeFileSync(
            ruleFile,
            `/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    meta: {
        docs: {
            description: "",
            category: "",
            recommended: false,
            url: "",
        },
        fixable: void 0,
        messages: {
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {}
    },
}
`
        )
        fs.writeFileSync(
            testFile,
            `/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"
const { RuleTester } = require("eslint")
const rule = require("../../../lib/rules/${ruleId}.js")

new RuleTester().run("${ruleId}", rule, {
    valid: [],
    invalid: [],
})
`
        )
        fs.writeFileSync(
            docFile,
            `#  (es/${ruleId})

(TODO: Why this rule is useful.)

## 📖 Rule Details

(TODO: How this rule will report code.)

👍 Examples of **correct** code for this rule:

\`\`\`js
/*eslint n/${ruleId}: error */
\`\`\`

👎 Examples of **incorrect** code for this rule:

\`\`\`js
/*eslint n/${ruleId}: error */
\`\`\`

## ⚙ Options

\`\`\`json
{
    "n/${ruleId}": ["error", ...]
}
\`\`\`
`
        )

        cp.execSync(`code "${ruleFile}"`)
        cp.execSync(`code "${testFile}"`)
        cp.execSync(`code "${docFile}"`)
    })(process.argv[2])
