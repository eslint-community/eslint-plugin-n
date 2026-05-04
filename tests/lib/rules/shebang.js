import assert from "node:assert/strict"
import shebang from "../../../lib/rules/shebang.js"
import hashbang from "../../../lib/rules/hashbang.js"

it("should export shebang as alias ", () => {
    assert.strictEqual(typeof shebang.meta.deprecated, "object")
    assert.strictEqual(typeof shebang.meta.replacedBy, "undefined")
    assert.strictEqual(shebang.create, hashbang.create)
})
