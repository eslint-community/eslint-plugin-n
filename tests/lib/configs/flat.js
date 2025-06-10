"use strict"

const assert = require("assert")
const pkg = require("eslint-plugin-n")

describe("flat configs", () => {
    it("should correctly export the plugin", () => {
        assert.strictEqual(typeof pkg, "object")
        assert.strictEqual(pkg.meta.name, "eslint-plugin-n")
        assert(pkg.configs)
        assert(pkg.rules)
    })

    it("should export flat/recommended-module", () => {
        const config = pkg.configs["flat/recommended-module"]
        assert.strictEqual(config.plugins.n, pkg)
        assert(config.rules, "should have rules configured")
    })

    it("should export flat/recommeded-script", () => {
        const config = pkg.configs["flat/recommended-script"]
        assert.strictEqual(config.plugins.n, pkg)
        assert(config.rules, "should have rules configured")
    })

    it("should export flat/all", () => {
        const config = pkg.configs["flat/all"]
        assert.strictEqual(config.plugins.n, pkg)
        assert(config.rules, "should have rules configured")
    })
})
