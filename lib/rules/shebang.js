/**
 * @fileoverview the rule has been renamed to `hashbang`. Please use `hashbang` instead.
 * @deprecated
 * @author 唯然<weiran.zsd@outlook.com>
 */
import hashbang from "./hashbang.js"

export default {
    meta: {
        ...hashbang.meta,
        deprecated: true,
        replacedBy: ["n/hashbang"],
        docs: { ...hashbang.meta?.docs, recommended: false },
    },
    create: hashbang.create,
}
