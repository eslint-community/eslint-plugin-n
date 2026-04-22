
import assert from "node:assert/strict";

it("should export shebang as alias ", () => {
    const shebang = require("../../../lib/rules/shebang.js")
    const hashbang = require("../../../lib/rules/hashbang.js")

    assert.strictEqual(shebang.meta.deprecated, true)
    assert.deepStrictEqual(shebang.meta.replacedBy, ["n/hashbang"])
    assert.strictEqual(shebang.create, hashbang.create)
})
