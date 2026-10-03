import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { getTSConfig, getTSConfigForFile } from "../../lib/util/get-tsconfig.js"

let freshImports = 0

/**
 * Relative lookups share the module-level fs cache, so tests that change the cwd load their own copy
 * @returns {Promise<typeof import("../../lib/util/get-tsconfig.js")>}
 */
function importFresh() {
    freshImports += 1
    return import(`../../lib/util/get-tsconfig.js?fresh=${freshImports}`)
}

/**
 * @param {string} dir
 * @param {Record<string, string[]>} paths
 */
function writeTSConfig(dir, paths) {
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(
        path.join(dir, "tsconfig.json"),
        JSON.stringify({ compilerOptions: { paths } })
    )
}

describe("getTSConfigForFile", () => {
    /** @type {string} */
    let root

    beforeEach(() => {
        root = fs.mkdtempSync(path.join(os.tmpdir(), "n-tsconfig-"))
    })

    afterEach(() => {
        fs.rmSync(root, { recursive: true, force: true })
    })

    it("resolves the nearest tsconfig for each directory", () => {
        writeTSConfig(root, { "@root/*": ["./src/*"] })
        writeTSConfig(path.join(root, "packages", "a"), {
            "@a/*": ["./src/*"],
        })

        const fromRoot = getTSConfigForFile(path.join(root, "src", "index.ts"))
        const fromPackage = getTSConfigForFile(
            path.join(root, "packages", "a", "src", "index.ts")
        )
        const fromSibling = getTSConfigForFile(
            path.join(root, "packages", "b", "src", "index.ts")
        )

        assert.equal(
            path.resolve(fromRoot?.path ?? ""),
            path.join(root, "tsconfig.json")
        )
        assert.equal(
            path.resolve(fromPackage?.path ?? ""),
            path.join(root, "packages", "a", "tsconfig.json")
        )
        assert.ok(fromPackage?.config.compilerOptions?.paths?.["@a/*"])
        assert.equal(
            path.resolve(fromSibling?.path ?? ""),
            path.join(root, "tsconfig.json")
        )
    })

    it("reuses the parsed tsconfig for files in the same directory", () => {
        writeTSConfig(root, { "@root/*": ["./src/*"] })

        const first = getTSConfigForFile(path.join(root, "src", "a.ts"))
        const second = getTSConfigForFile(path.join(root, "src", "b.ts"))

        assert.ok(first)
        assert.equal(second, first)
    })

    it("resolves relative filenames against the current working directory", async () => {
        const { getTSConfigForFile } = await importFresh()
        const originalCwd = process.cwd()
        writeTSConfig(path.join(root, "one"), { "@one/*": ["./*"] })
        writeTSConfig(path.join(root, "two"), { "@two/*": ["./*"] })

        try {
            process.chdir(path.join(root, "one"))
            const fromOne = getTSConfigForFile("index.ts")
            process.chdir(path.join(root, "two"))
            const fromTwo = getTSConfigForFile("index.ts")

            assert.ok(fromOne?.config.compilerOptions?.paths?.["@one/*"])
            assert.ok(fromTwo?.config.compilerOptions?.paths?.["@two/*"])
        } finally {
            process.chdir(originalCwd)
        }
    })

    it("keeps relative lookups separate from absolute ones in the same directory", async () => {
        const { getTSConfigForFile } = await importFresh()
        const originalCwd = process.cwd()
        const child = path.join(root, "child")
        writeTSConfig(root, { "@root/*": ["./*"] })
        fs.mkdirSync(child)

        try {
            process.chdir(child)
            // An absolute path walks up to the filesystem root, a relative one only to the cwd
            const absolute = getTSConfigForFile(path.join(child, "index.ts"))
            const relative = getTSConfigForFile("<text>")

            assert.equal(
                path.resolve(absolute?.path ?? ""),
                path.join(root, "tsconfig.json")
            )
            assert.equal(relative, null)
        } finally {
            process.chdir(originalCwd)
        }
    })
})

describe("getTSConfig", () => {
    it("reuses the parsed tsconfig for a path", () => {
        const root = fs.mkdtempSync(path.join(os.tmpdir(), "n-tsconfig-"))

        try {
            writeTSConfig(root, { "@root/*": ["./src/*"] })
            const tsconfigPath = path.join(root, "tsconfig.json")

            assert.equal(getTSConfig(tsconfigPath), getTSConfig(tsconfigPath))
        } finally {
            fs.rmSync(root, { recursive: true, force: true })
        }
    })
})
