"use strict"

/**
 * @param {unknown} node
 * @returns {node is (import('estree').Node & { parent: import('estree').Node })}
 */
function hasParentNode(node) {
    if (node == null || typeof node !== "object") {
        return false
    }
    return (
        typeof node.type === "string" &&
        "parent" in node &&
        node.parent != null &&
        typeof node.parent === "object" &&
        "type" in node.parent &&
        typeof node.parent.type === "string"
    )
}

module.exports = { hasParentNode }
