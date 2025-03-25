/**
 * @author Matt DuVall<http://mattduvall.com/>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const selectors = [
    // fs.readFileSync()
    // readFileSync.call(null, 'path')
    "CallExpression > MemberExpression.callee Identifier[name=/Sync$/]",
    // readFileSync()
    "CallExpression > Identifier[name=/Sync$/]",
]

/**
 * @typedef {[
 *   {
 *     allowAtRootLevel?: boolean
 *     ignores?: string[]
 *   }?
 * ]} RuleOptions
 */
/** @type {import('./rule-module').RuleModule<{RuleOptions: RuleOptions}>} */
module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "disallow synchronous methods",
            recommended: false,
            url: "https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-sync.md",
        },
        fixable: null,
        schema: [
            {
                type: "object",
                properties: {
                    allowAtRootLevel: {
                        type: "boolean",
                        default: false,
                    },
                    ignores: {
                        type: "array",
                        items: { type: "string" },
                        default: [],
                    },
                },
                additionalProperties: false,
            },
        ],
        messages: {
            noSync: "Unexpected sync method: '{{propertyName}}'.",
        },
    },

    create(context) {
        const options = context.options[0] ?? {}
        const ignores = options.ignores ?? []

        const selector = options.allowAtRootLevel
            ? selectors.map(selector => `:function ${selector}`)
            : selectors
        return {
            /**
             * @param {import('estree').Identifier & {parent: import('estree').Node}} node
             * @returns {void}
             */
            [selector.join(",")](node) {
                if (ignores.includes(node.name)) {
                    return
                }

                context.report({
                    node: node.parent,
                    messageId: "noSync",
                    data: {
                        propertyName: node.name,
                    },
                })
            },
        }
    },
}
