/**
 * See LICENSE file in root directory for full license.
 */

/** @type {import('../rule-module.js').RuleModule} */
export default {
    meta: {
        type: "suggestion",
        docs: {
            description:
                "require `stream.pipeline()` instead of `Stream#pipe()`",
            recommended: false,
            url: "https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/prefer-stream-pipeline.md",
        },
        fixable: null,
        messages: {
            preferPipeline:
                "Use 'stream.pipeline()' instead of 'Stream#pipe()'.",
        },
        schema: [],
    },
    create(context) {
        return {
            CallExpression(node) {
                if (
                    node.callee.type === "MemberExpression" &&
                    !node.callee.computed &&
                    node.callee.property.type === "Identifier" &&
                    node.callee.property.name === "pipe"
                ) {
                    context.report({
                        node: node.callee.property,
                        messageId: "preferPipeline",
                    })
                }
            },
        }
    },
}
