import pkg from "../package.json" with {type: "json"}
export const pluginName = pkg.name.replace(/^eslint-plugin-/u, "")
