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

    // Tests for new primary config names
    it("should export recommended-module", () => {
        const config = pkg.configs["recommended-module"]
        assert.strictEqual(config.plugins.n, pkg)
        assert(config.rules, "should have rules configured")
    })

    it("should export recommended-script", () => {
        const config = pkg.configs["recommended-script"]
        assert.strictEqual(config.plugins.n, pkg)
        assert(config.rules, "should have rules configured")
    })

    it("should export recommended", () => {
        const config = pkg.configs["recommended"]
        assert.strictEqual(config.plugins.n, pkg)
        assert(config.rules, "should have rules configured")
    })

    it("should export mixed-esm-and-cjs", () => {
        const config = pkg.configs["mixed-esm-and-cjs"]
        assert(Array.isArray(config), "should be an array of configs")
        assert.strictEqual(config.length, 3, "should have 3 configs")
        // Check each config has the plugin
        config.forEach((cfg, index) => {
            assert.strictEqual(
                cfg.plugins.n,
                pkg,
                `config[${index}] should have the plugin`
            )
            assert(cfg.rules, `config[${index}] should have rules configured`)
        })
        // Verify file patterns
        assert.deepStrictEqual(config[0].files, ["**/*.js"])
        assert.deepStrictEqual(config[1].files, ["**/*.mjs"])
        assert.deepStrictEqual(config[2].files, ["**/*.cjs"])
    })

    it("should export all", () => {
        const config = pkg.configs["all"]
        assert.strictEqual(config.plugins.n, pkg)
        assert(config.rules, "should have rules configured")
    })
})
