import fs from "fs"
import path from "path"

const filePath = path.resolve(import.meta.dirname, "../types/index.d.ts")

// todo: this can be removed once https://github.com/microsoft/TypeScript/issues/63586 is fixed
fs.writeFileSync(
    filePath,
    fs
        .readFileSync(filePath, "utf8")
        .replace("as module.exports", 'as "module.exports"')
)
