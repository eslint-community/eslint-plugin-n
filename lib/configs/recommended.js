"use strict"

const { getPackageJson } = require("../util/get-package-json")
const moduleConfig = require("./recommended-module")
const scriptConfig = require("./recommended-script")

const packageJson = getPackageJson()

const isModule =
    packageJson != null &&
    typeof packageJson === "object" &&
    "type" in packageJson &&
    packageJson.type === "module"
const recommendedConfig = isModule ? moduleConfig : scriptConfig

module.exports.flat = recommendedConfig.flat
