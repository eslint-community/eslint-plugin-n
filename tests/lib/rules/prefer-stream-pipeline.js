/**
 * See LICENSE file in root directory for full license.
 */
import { RuleTester } from "eslint"
import rule from "../../../lib/rules/prefer-stream-pipeline.js"

new RuleTester().run("prefer-stream-pipeline", rule, {
    valid: [
        "pipeline(a, b, (err) => {})",
        "await pipeline(a, b)",
        "stream.pipeline(a, b, cb)",
        "a.pipe",
        "pipe(a, b)",
    ],
    invalid: [
        {
            code: "a.pipe(b)",
            errors: [{ messageId: "preferPipeline" }],
        },
        {
            code: "a.pipe(b).pipe(c)",
            errors: [
                { messageId: "preferPipeline" },
                { messageId: "preferPipeline" },
            ],
        },
    ],
})
