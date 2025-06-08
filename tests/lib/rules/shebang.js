"use strict"
const assert = require("assert/strict")

it("should export shebang as alias ", () => {
    const shebang = require("../../../lib/rules/shebang.js")
    const hashbang = require("../../../lib/rules/hashbang.js")

    assert.strictEqual(typeof shebang.meta.deprecated, "object")
    assert.strictEqual(typeof shebang.meta.replacedBy, "undefined")
    assert.strictEqual(shebang.create, hashbang.create)
})
