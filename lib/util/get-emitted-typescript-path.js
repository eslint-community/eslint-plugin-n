import path from "node:path"
import { getTSConfigForContext } from "./get-tsconfig.js"
import { getTypescriptExtensionMap } from "./get-typescript-extension-map.js"

/**
 * Resolve the TypeScript source root only when its output layout is predictable.
 * @param {import('get-tsconfig').TsConfigResult} tsconfig
 * @returns {string | null}
 */
function getSourceRoot(tsconfig) {
    const configDirectory = path.dirname(tsconfig.path)
    const options = tsconfig.config.compilerOptions ?? {}

    if (typeof options.rootDir === "string") {
        return path.resolve(configDirectory, options.rootDir)
    }
    if (options.composite === true) {
        return configDirectory
    }

    // With one source directory, TypeScript uses that directory as the
    // common source root. Multiple includes need a full file-list scan.
    const includes = tsconfig.config.include
    if (!Array.isArray(includes) || includes.length !== 1) {
        return null
    }
    const [include] = includes
    if (typeof include !== "string") {
        return null
    }
    const wildcardIndex = include.search(/[*?[\]{}]/u)
    const prefix =
        wildcardIndex === -1 ? include : include.slice(0, wildcardIndex)
    if (
        !prefix ||
        (wildcardIndex !== -1 && !prefix.endsWith("/")) ||
        /\.[cm]?tsx?$/u.test(prefix)
    ) {
        return null
    }
    return path.resolve(configDirectory, prefix)
}

/**
 * Get the emitted path of a TypeScript source, if its layout is unambiguous.
 * @param {import('eslint').Rule.RuleContext} context
 * @param {string} sourcePath
 * @returns {string | null}
 */
export function getEmittedTypeScriptPath(context, sourcePath) {
    const ext = path.extname(sourcePath)
    if (![".ts", ".mts", ".cts", ".tsx"].includes(ext)) {
        return null
    }

    const tsconfig = getTSConfigForContext(context)
    const options = tsconfig?.config.compilerOptions
    if (
        !tsconfig ||
        typeof options?.outDir !== "string" ||
        options.noEmit === true ||
        options.emitDeclarationOnly === true ||
        options.outFile != null
    ) {
        return null
    }

    const sourceRoot = getSourceRoot(tsconfig)
    if (!sourceRoot) {
        return null
    }
    const relativePath = path.relative(sourceRoot, sourcePath)
    if (
        !relativePath ||
        relativePath === ".." ||
        relativePath.startsWith(`..${path.sep}`) ||
        path.isAbsolute(relativePath)
    ) {
        return null
    }

    const mappedExtension = getTypescriptExtensionMap(context).forward[ext]
    if (!mappedExtension) {
        return null
    }

    return path.resolve(
        path.dirname(tsconfig.path),
        options.outDir,
        relativePath.slice(0, -ext.length) + mappedExtension
    )
}
