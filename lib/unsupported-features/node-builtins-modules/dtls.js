import { READ } from "@eslint-community/eslint-utils"

/**
 * @satisfies {import('../types.js').SupportVersionTraceMap}
 */
const dtls = {
    connect: { [READ]: { experimental: ["26.9.0"] } },
    createSecureContext: { [READ]: { experimental: ["26.10.0"] } },
    listen: { [READ]: { experimental: ["26.9.0"] } },
}

/**
 * @satisfies {import('../types.js').SupportVersionTraceMap}
 */
export default {
    "node:dtls": {
        [READ]: { experimental: ["26.9.0"] },
        ...dtls,
    },
}
