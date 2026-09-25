import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { getPnpmWorkspacePatterns } from "../../lib/util/get-pnpm-workspace-yaml.js"

describe("getPnpmWorkspacePatterns", () => {
    it("reuses parsed patterns for a workspace root", () => {
        const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pnpm-workspace-"))
        const filePath = path.join(dir, "pnpm-workspace.yaml")

        try {
            fs.writeFileSync(filePath, "packages:\n  - 'packages/*'\n")
            assert.deepEqual(getPnpmWorkspacePatterns(dir), ["packages/*"])

            fs.writeFileSync(filePath, "packages:\n  - 'changed/*'\n")
            assert.deepEqual(getPnpmWorkspacePatterns(dir), ["packages/*"])
        } finally {
            fs.rmSync(dir, { recursive: true, force: true })
        }
    })
})
