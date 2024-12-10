/**
 * @author Matt DuVall<http://mattduvall.com/>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const typeMatchesSpecifier =
    /** @type {import('ts-declaration-location').default} */ (
        /** @type {unknown} */ (require("ts-declaration-location"))
    )
const getTypeOfNode = require("../util/get-type-of-node")
const getParserServices = require("../util/get-parser-services")

const selectors = [
    // fs.readFileSync()
    // readFileSync.call(null, 'path')
    "CallExpression > MemberExpression.callee Identifier[name=/Sync$/]",
    // readFileSync()
    "CallExpression > Identifier[name=/Sync$/]",
]

/** @type {import('eslint').Rule.RuleModule} */
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
                        items: {
                            oneOf: [
                                { type: "string" },
                                {
                                    type: "object",
                                    properties: {
                                        from: {
                                            type: "string",
                                            enum: ["file"],
                                        },
                                        path: {
                                            type: "string",
                                        },
                                        name: {
                                            type: "array",
                                            items: {
                                                type: "string",
                                            },
                                        },
                                    },
                                    additionalProperties: false,
                                },
                                {
                                    type: "object",
                                    properties: {
                                        from: {
                                            type: "string",
                                            enum: ["lib"],
                                        },
                                        name: {
                                            type: "array",
                                            items: {
                                                type: "string",
                                            },
                                        },
                                    },
                                    additionalProperties: false,
                                },
                                {
                                    type: "object",
                                    properties: {
                                        from: {
                                            type: "string",
                                            enum: ["package"],
                                        },
                                        package: {
                                            type: "string",
                                        },
                                        name: {
                                            type: "array",
                                            items: {
                                                type: "string",
                                            },
                                        },
                                    },
                                    additionalProperties: false,
                                },
                            ],
                        },
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
                const parserServices = getParserServices(context)

                for (const ignore of ignores) {
                    if (typeof ignore === "string") {
                        if (ignore === node.name) {
                            return
                        }

                        continue
                    }

                    if (parserServices !== null) {
                        const type = getTypeOfNode(node, parserServices)
                        if (
                            typeMatchesSpecifier(
                                parserServices.program,
                                ignore,
                                type
                            ) &&
                            (ignore.name === undefined ||
                                ignore.name.includes(node.name))
                        ) {
                            return
                        }
                    }
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
