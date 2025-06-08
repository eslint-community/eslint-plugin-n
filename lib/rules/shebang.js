/**
 * @fileoverview the rule has been renamed to `hashbang`. Please use `hashbang` instead.
 * @deprecated
 * @author 唯然<weiran.zsd@outlook.com>
 */
"use strict"

const hashbang = require("./hashbang.js")

/** @type {import('./rule-module').RuleModule<{}>} */
module.exports = {
    meta: {
        ...hashbang.meta,
        deprecated: {
            deprecatedSince: "17.0.0",
            message:
                "This rule was deprecated in eslint-plugin-n v17.0.0. Please use 'n/hashbang'",
            url: "https://github.com/eslint-community/eslint-plugin-n/issues/196",
            replacedBy: [
                {
                    rule: {
                        name: "n/hashbang",
                        url: hashbang.meta?.docs?.url,
                    },
                },
            ],
        },
        docs: { ...hashbang.meta?.docs, recommended: false },
    },
    create: hashbang.create,
}
