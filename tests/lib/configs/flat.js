import assert from "node:assert"
import pkg from "eslint-plugin-n"
import { Linter } from "eslint"

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

    it("should let ESLint select the source type for flat/recommended", () => {
        const config = pkg.configs["flat/recommended"]
        assert(config.languageOptions)
        assert.strictEqual(
            Object.hasOwn(config.languageOptions, "sourceType"),
            false
        )
        assert.strictEqual(
            pkg.configs["flat/recommended-module"].languageOptions?.sourceType,
            "module"
        )
        assert.strictEqual(
            pkg.configs["flat/recommended-script"].languageOptions?.sourceType,
            "commonjs"
        )
    })

    it("should parse ESM and CommonJS with flat/recommended", () => {
        const linter = new Linter({ configType: "flat" })
        const config = { ...pkg.configs["flat/recommended"], rules: {} }

        assert.deepStrictEqual(
            linter.verify("export const value = 1", [config], {
                filename: "example.mjs",
            }),
            []
        )
        assert.deepStrictEqual(
            linter.verify("return;", [config], {
                filename: "example.cjs",
            }),
            []
        )
    })

    it("should export flat/all", () => {
        const config = pkg.configs["flat/all"]
        assert.strictEqual(config.plugins.n, pkg)
        assert(config.rules, "should have rules configured")
    })
})
