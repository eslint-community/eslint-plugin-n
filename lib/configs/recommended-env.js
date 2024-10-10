"use strict"

const globals = require("globals")
const { getPackageJson } = require("../util/get-package-json")

const packageJson = getPackageJson()

const isModule =
    packageJson != null &&
    typeof packageJson === "object" &&
    "type" in packageJson &&
    packageJson.type === "module"

const moduleEnv = {
    name: "node/env/module",
    languageOptions: {
        globals: {
            ...globals.nodeBuiltin,
        },
    },
}

const scriptEnv = {
    name: "node/env/script",
    languageOptions: {
        globals: {
            ...globals.node,
        },
    },
}

const recommendedEnv = [
    {
        ...(isModule ? { ignores: ["**/*.cjs"] } : { files: ["**/*.mjs"] }),
        ...moduleEnv,
    },
    {
        ...(isModule ? { files: ["**/*.cjs"] } : { ignores: ["**/*.mjs"] }),
        ...scriptEnv,
    },
]

module.exports = {
    isModule,
    recommendedEnv,
}
