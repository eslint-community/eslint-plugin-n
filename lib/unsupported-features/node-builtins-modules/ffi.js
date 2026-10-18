import { READ } from "@eslint-community/eslint-utils"

/**
 * @satisfies {import('../types.js').SupportVersionTraceMap}
 */
const ffi = {
    DynamicLibrary: { [READ]: { experimental: ["26.1.0"] } },
    dlclose: { [READ]: { experimental: ["26.1.0"] } },
    dlopen: { [READ]: { experimental: ["26.1.0"] } },
    dlsym: { [READ]: { experimental: ["26.1.0"] } },
    exportArrayBuffer: { [READ]: { experimental: ["26.1.0"] } },
    exportArrayBufferView: { [READ]: { experimental: ["26.1.0"] } },
    exportBuffer: { [READ]: { experimental: ["26.1.0"] } },
    exportString: { [READ]: { experimental: ["26.1.0"] } },
    getCurrentEventLoop: { [READ]: { experimental: ["26.6.0"] } },
    getFloat32: { [READ]: { experimental: ["26.1.0"] } },
    getFloat64: { [READ]: { experimental: ["26.1.0"] } },
    getInt16: { [READ]: { experimental: ["26.1.0"] } },
    getInt32: { [READ]: { experimental: ["26.1.0"] } },
    getInt64: { [READ]: { experimental: ["26.1.0"] } },
    getInt8: { [READ]: { experimental: ["26.1.0"] } },
    getRawPointer: { [READ]: { experimental: ["26.1.0"] } },
    getUint16: { [READ]: { experimental: ["26.1.0"] } },
    getUint32: { [READ]: { experimental: ["26.1.0"] } },
    getUint64: { [READ]: { experimental: ["26.1.0"] } },
    getUint8: { [READ]: { experimental: ["26.1.0"] } },
    setFloat32: { [READ]: { experimental: ["26.1.0"] } },
    setFloat64: { [READ]: { experimental: ["26.1.0"] } },
    setInt16: { [READ]: { experimental: ["26.1.0"] } },
    setInt32: { [READ]: { experimental: ["26.1.0"] } },
    setInt64: { [READ]: { experimental: ["26.1.0"] } },
    setInt8: { [READ]: { experimental: ["26.1.0"] } },
    setUint16: { [READ]: { experimental: ["26.1.0"] } },
    setUint32: { [READ]: { experimental: ["26.1.0"] } },
    setUint64: { [READ]: { experimental: ["26.1.0"] } },
    setUint8: { [READ]: { experimental: ["26.1.0"] } },
    suffix: { [READ]: { experimental: ["26.1.0"] } },
    toArrayBuffer: { [READ]: { experimental: ["26.1.0"] } },
    toBuffer: { [READ]: { experimental: ["26.1.0"] } },
    toString: { [READ]: { experimental: ["26.1.0"] } },
    types: { [READ]: { experimental: ["26.1.0"] } },
}

/**
 * @satisfies {import('../types.js').SupportVersionTraceMap}
 */
export default {
    "node:ffi": {
        [READ]: { experimental: ["26.1.0"] },
        ...ffi,
    },
}
