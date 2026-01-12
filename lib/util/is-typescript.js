import path from "path"
import { getPhysicalFilename, getFilename } from "./eslint-compat.js"

const typescriptExtensions = [".ts", ".tsx", ".cts", ".mts"]

/**
 * Determine if the context source file is typescript.
 *
 * @param {import('eslint').Rule.RuleContext} context - A context
 * @returns {boolean}
 */
export default function isTypescript(context) {
    const sourceFileExt = path.extname(
        getPhysicalFilename(context) ?? getFilename(context)
    )
    return typescriptExtensions.includes(sourceFileExt)
}
