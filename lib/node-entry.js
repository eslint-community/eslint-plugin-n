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

function mapPlugins(plugins) {
    if (!plugins) return plugins
    if (Array.isArray(plugins)) {
        return plugins.map(p => (p === "n" ? "node" : p))
    }
    if (plugins.n) {
        const newPlugins = { ...plugins, node: nodePlugin }
        delete newPlugins.n
        return newPlugins
    }
    return plugins
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
            plugins: mapPlugins(c.plugins),
            rules: renameRules(c.rules),
        }))
    } else {
        configs[configName] = {
            ...config,
            plugins: mapPlugins(config.plugins),
            rules: renameRules(config.rules),
        }
    }
}

nodePlugin.configs = configs

export default nodePlugin
