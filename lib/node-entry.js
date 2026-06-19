import plugin from "./index.js"

function renameRules(rules) {
    if (!rules) return rules
    const newRules = {}
    for (const key in rules) {
        if (key.startsWith("n/")) {
            newRules["node/" + key.slice(2)] = rules[key]
        } else {
            newRules[key] = rules[key]
        }
    }
    return newRules
}

const nodePlugin = {
    meta: plugin.meta,
    rules: plugin.rules,
}

const configs = {}

for (const configName in plugin.configs) {
    const config = plugin.configs[configName]
    if (Array.isArray(config)) {
        configs[configName] = config.map(c => ({
            ...c,
            plugins:
                c.plugins && c.plugins.n ? { node: nodePlugin } : c.plugins,
            rules: renameRules(c.rules),
        }))
    } else {
        configs[configName] = {
            ...config,
            plugins:
                config.plugins && config.plugins.n
                    ? { node: nodePlugin }
                    : config.plugins,
            rules: renameRules(config.rules),
        }
        // also for legacy format
        if (Array.isArray(configs[configName].plugins)) {
            configs[configName].plugins = configs[configName].plugins.map(p =>
                p === "n" ? "node" : p
            )
        }
    }
}

nodePlugin.configs = configs

export default nodePlugin
