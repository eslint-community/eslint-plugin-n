import { READ } from "@eslint-community/eslint-utils"

/**
 * @satisfies {import('../types.js').SupportVersionTraceMap}
 */
const bench = {
    after: { [READ]: { experimental: ["26.9.0"] } },
    afterEach: { [READ]: { experimental: ["26.9.0"] } },
    before: { [READ]: { experimental: ["26.9.0"] } },
    beforeEach: { [READ]: { experimental: ["26.9.0"] } },
    bench: {
        [READ]: { experimental: ["26.9.0"] },
        only: { [READ]: { experimental: ["26.9.0"] } },
        skip: { [READ]: { experimental: ["26.9.0"] } },
    },
    createRunner: { [READ]: { experimental: ["26.9.0"] } },
    describe: { [READ]: { experimental: ["26.9.0"] } },
    only: { [READ]: { experimental: ["26.9.0"] } },
    run: { [READ]: { experimental: ["26.9.0"] } },
    runFile: { [READ]: { experimental: ["26.9.0"] } },
    skip: { [READ]: { experimental: ["26.9.0"] } },
    suite: { [READ]: { experimental: ["26.9.0"] } },
}

/**
 * @satisfies {import('../types.js').SupportVersionTraceMap}
 */
const reporters = {
    json: { [READ]: { experimental: ["26.9.0"] } },
    spec: { [READ]: { experimental: ["26.9.0"] } },
}

/**
 * @satisfies {import('../types.js').SupportVersionTraceMap}
 */
export default {
    "node:bench": {
        [READ]: { experimental: ["26.9.0"] },
        ...bench,
    },
    "node:bench/reporters": {
        [READ]: { experimental: ["26.9.0"] },
        ...reporters,
    },
}
