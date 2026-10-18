import { READ } from "@eslint-community/eslint-utils"

/**
 * @satisfies {import('../types.js').SupportVersionTraceMap}
 */
const vfs = {
    ComposableProvider: { [READ]: { experimental: ["26.12.0"] } },
    create: { [READ]: { experimental: ["26.4.0"] } },
    MemoryProvider: { [READ]: { experimental: ["26.4.0"] } },
    registerProvider: { [READ]: { experimental: ["26.10.0"] } },
    RealFSProvider: { [READ]: { experimental: ["26.4.0"] } },
    vfsBase: { [READ]: { experimental: ["26.11.0"] } },
    VirtualFileSystem: { [READ]: { experimental: ["26.4.0"] } },
    VirtualProvider: { [READ]: { experimental: ["26.4.0"] } },
    ZipProvider: { [READ]: { experimental: ["26.9.0"] } },
}

/**
 * @satisfies {import('../types.js').SupportVersionTraceMap}
 */
export default {
    "node:vfs": {
        [READ]: { experimental: ["26.4.0"] },
        ...vfs,
    },
}
