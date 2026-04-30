import assert from "node:assert/strict"
import shebang from "../../../lib/rules/shebang.js"
import hashbang from "../../../lib/rules/hashbang.js"

it("should export shebang as alias ", () => {
    assert.strictEqual(shebang.meta.deprecated, true)
    assert.deepStrictEqual(shebang.meta.replacedBy, ["n/hashbang"])
    assert.strictEqual(shebang.create, hashbang.create)
})
