
import fs from "node:fs";
import path from "node:path";

import { NodeBuiltinModules } from "../../../lib/unsupported-features/node-builtins.js";
import assert from "node:assert";

const RESOURCES_ROOT = path.resolve(
    __dirname,
    "../../../lib/unsupported-features/node-builtins-modules"
)

describe("unsupported-features/node-builtins", () => {
    for (const dirent of fs.readdirSync(RESOURCES_ROOT, {
        withFileTypes: true,
    })) {
        if (!dirent.isFile() || !dirent.name.endsWith(".js")) continue
        const filePath = path.join(RESOURCES_ROOT, dirent.name)
        const resource = require(filePath)
        it(`should be the same resource defined in ${dirent.name} that is defined in NodeBuiltinModules.`, () => {
            const picked = Object.fromEntries(
                Object.entries(NodeBuiltinModules).filter(
                    ([key]) => resource[key]
                )
            )
            assert.deepStrictEqual(picked, resource)
        })
    }
})
