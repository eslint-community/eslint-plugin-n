import assert from "node:assert"
import nodeEntry from "../../lib/node-entry.js"
import plugin from "../../lib/index.js"

describe("node-entry", () => {
    it("should export the same meta and rules as the main plugin", () => {
        assert.strictEqual(nodeEntry.meta, plugin.meta)
        assert.strictEqual(nodeEntry.rules, plugin.rules)
    })

    it("should rename rules in configs to use the node/ prefix", () => {
        const flatRecommended = nodeEntry.configs["flat/recommended"]
        assert.strictEqual(flatRecommended.plugins.node, nodeEntry)
        assert.strictEqual(
            flatRecommended.rules["node/no-process-exit"],
            "error"
        )
        assert.strictEqual(
            flatRecommended.rules["n/no-process-exit"],
            undefined
        )
    })

    it("should correctly prefix array configs", () => {
        const mixed = nodeEntry.configs["flat/mixed-esm-and-cjs"]
        assert.strictEqual(Array.isArray(mixed), true)
        assert.strictEqual(mixed[0].plugins.node, nodeEntry)
        assert.strictEqual(mixed[0].rules["node/no-process-exit"], "error")
    })

    it("should not mutate the original plugin configs", () => {
        const flatRecommended = plugin.configs["flat/recommended"]
        assert.strictEqual(flatRecommended.plugins.n, plugin)
        assert.strictEqual(flatRecommended.rules["n/no-process-exit"], "error")
        assert.strictEqual(
            flatRecommended.rules["node/no-process-exit"],
            undefined
        )
    })
})
