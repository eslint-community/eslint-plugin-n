import { CALL, READ } from "@eslint-community/eslint-utils"

/**
 * @satisfies {import('../types.js').SupportVersionTraceMap}
 */
const ZSTDConstants = {
    ZSTD_e_continue: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_e_flush: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_e_end: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_fast: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_dfast: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_greedy: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_lazy: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_lazy2: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_btlazy2: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_btopt: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_btultra: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_btultra2: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_c_compressionLevel: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_c_windowLog: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_c_hashLog: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_c_chainLog: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_c_searchLog: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_c_minMatch: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_c_targetLength: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_c_strategy: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_c_enableLongDistanceMatching: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_c_ldmHashLog: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_c_ldmMinMatch: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_c_ldmBucketSizeLog: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_c_ldmHashRateLog: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_c_contentSizeFlag: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_c_checksumFlag: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_c_dictIDFlag: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_c_nbWorkers: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_c_jobSize: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_c_overlapLog: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_d_windowLogMax: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_CLEVEL_DEFAULT: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_error_no_error: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_error_GENERIC: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_error_prefix_unknown: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_error_version_unsupported: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_error_frameParameter_unsupported: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_error_frameParameter_windowTooLarge: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_error_corruption_detected: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_error_checksum_wrong: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_error_literals_headerWrong: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_error_dictionary_corrupted: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_error_dictionary_wrong: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_error_dictionaryCreation_failed: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_error_parameter_unsupported: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_error_parameter_combination_unsupported: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_error_parameter_outOfBound: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_error_tableLog_tooLarge: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_error_maxSymbolValue_tooLarge: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_error_maxSymbolValue_tooSmall: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_error_stabilityCondition_notRespected: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_error_stage_wrong: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZSTD_error_init_missing: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_error_memory_allocation: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_error_workSpace_tooSmall: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_error_dstSize_tooSmall: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_error_srcSize_wrong: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_error_dstBuffer_null: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_error_noForwardProgress_destFull: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
    ZSTD_error_noForwardProgress_inputEmpty: {
        [READ]: { experimental: ["22.15.0", "23.8.0"] },
    },
}

/**
 * @satisfies {import('../types.js').SupportVersionTraceMap}
 */
const zlib = {
    brotliCompress: { [READ]: { supported: ["11.7.0", "10.16.0"] } },
    brotliCompressSync: { [READ]: { supported: ["11.7.0", "10.16.0"] } },
    brotliDecompress: { [READ]: { supported: ["11.7.0", "10.16.0"] } },
    brotliDecompressSync: { [READ]: { supported: ["11.7.0", "10.16.0"] } },
    constants: {
        ...ZSTDConstants,
        [READ]: { supported: ["7.0.0"] },
    },
    crc32: { [READ]: { supported: ["22.2.0", "20.15.0"] } },
    createBrotliCompress: { [READ]: { supported: ["11.7.0", "10.16.0"] } },
    createBrotliDecompress: { [READ]: { supported: ["11.7.0", "10.16.0"] } },
    createDeflate: { [READ]: { supported: ["0.5.8"] } },
    createDeflateRaw: { [READ]: { supported: ["0.5.8"] } },
    createGunzip: { [READ]: { supported: ["0.5.8"] } },
    createGzip: { [READ]: { supported: ["0.5.8"] } },
    createInflate: { [READ]: { supported: ["0.5.8"] } },
    createInflateRaw: { [READ]: { supported: ["0.5.8"] } },
    createUnzip: { [READ]: { supported: ["0.5.8"] } },
    createZstdCompress: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    createZstdDecompress: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    deflate: { [READ]: { supported: ["0.6.0"] } },
    deflateRaw: { [READ]: { supported: ["0.6.0"] } },
    deflateRawSync: { [READ]: { supported: ["0.11.12"] } },
    deflateSync: { [READ]: { supported: ["0.11.12"] } },
    gunzip: { [READ]: { supported: ["0.6.0"] } },
    gunzipSync: { [READ]: { supported: ["0.11.12"] } },
    gzip: { [READ]: { supported: ["0.6.0"] } },
    gzipSync: { [READ]: { supported: ["0.11.12"] } },
    inflate: { [READ]: { supported: ["0.6.0"] } },
    inflateRaw: { [READ]: { supported: ["0.6.0"] } },
    inflateRawSync: { [READ]: { supported: ["0.11.12"] } },
    inflateSync: { [READ]: { supported: ["0.11.12"] } },
    unzip: { [READ]: { supported: ["0.6.0"] } },
    unzipSync: { [READ]: { supported: ["0.11.12"] } },
    zstdCompress: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    zstdCompressSync: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    zstdDecompress: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    zstdDecompressSync: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    createZipArchive: { [READ]: { experimental: ["26.8.0"] } },
    createZipArchiveSync: { [READ]: { experimental: ["26.8.0"] } },
    getMaxZipContentSize: { [READ]: { experimental: ["26.8.0"] } },
    setMaxZipContentSize: { [READ]: { experimental: ["26.8.0"] } },
    zipFiles: { [READ]: { experimental: ["26.8.0"] } },

    BrotliCompress: {
        [CALL]: { deprecated: ["22.9.0"] },
        [READ]: { supported: ["11.7.0", "10.16.0"] },
    },
    BrotliDecompress: {
        [CALL]: { deprecated: ["22.9.0"] },
        [READ]: { supported: ["11.7.0", "10.16.0"] },
    },
    Deflate: {
        [CALL]: { deprecated: ["22.9.0"] },
        [READ]: { supported: ["0.5.8"] },
    },
    DeflateRaw: {
        [CALL]: { deprecated: ["22.9.0"] },
        [READ]: { supported: ["0.5.8"] },
    },
    Gunzip: {
        [CALL]: { deprecated: ["22.9.0"] },
        [READ]: { supported: ["0.5.8"] },
    },
    Gzip: {
        [CALL]: { deprecated: ["22.9.0"] },
        [READ]: { supported: ["0.5.8"] },
    },
    Inflate: {
        [CALL]: { deprecated: ["22.9.0"] },
        [READ]: { supported: ["0.5.8"] },
    },
    InflateRaw: {
        [CALL]: { deprecated: ["22.9.0"] },
        [READ]: { supported: ["0.5.8"] },
    },
    Unzip: {
        [CALL]: { deprecated: ["22.9.0"] },
        [READ]: { supported: ["0.5.8"] },
    },
    ZstdCompress: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZstdDecompress: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZstdOptions: { [READ]: { experimental: ["22.15.0", "23.8.0"] } },
    ZipBuffer: { [READ]: { experimental: ["26.8.0"] } },
    ZipEntry: {
        [READ]: { experimental: ["26.8.0"] },
        create: { [READ]: { experimental: ["26.8.0"] } },
        createStream: { [READ]: { experimental: ["26.8.0"] } },
        createSymlink: { [READ]: { experimental: ["26.8.0"] } },
        createSync: { [READ]: { experimental: ["26.8.0"] } },
        read: { [READ]: { experimental: ["26.8.0"] } },
    },
    ZipFile: {
        [READ]: { experimental: ["26.8.0"] },
        open: { [READ]: { experimental: ["26.8.0"] } },
        openSync: { [READ]: { experimental: ["26.8.0"] } },
    },
}

/**
 * @satisfies {import('../types.js').SupportVersionTraceMap}
 */
const ZlibIter = {
    compressBrotli: { [READ]: { experimental: ["25.9.0", "24.20.0"] } },
    compressBrotliSync: { [READ]: { experimental: ["25.9.0", "24.20.0"] } },
    compressDeflate: { [READ]: { experimental: ["25.9.0", "24.20.0"] } },
    compressDeflateSync: { [READ]: { experimental: ["25.9.0", "24.20.0"] } },
    compressGzip: { [READ]: { experimental: ["25.9.0", "24.20.0"] } },
    compressGzipSync: { [READ]: { experimental: ["25.9.0", "24.20.0"] } },
    compressZstd: { [READ]: { experimental: ["25.9.0", "24.20.0"] } },
    compressZstdSync: { [READ]: { experimental: ["25.9.0", "24.20.0"] } },
    decompressBrotli: { [READ]: { experimental: ["25.9.0", "24.20.0"] } },
    decompressBrotliSync: { [READ]: { experimental: ["25.9.0", "24.20.0"] } },
    decompressDeflate: { [READ]: { experimental: ["25.9.0", "24.20.0"] } },
    decompressDeflateSync: { [READ]: { experimental: ["25.9.0", "24.20.0"] } },
    decompressGzip: { [READ]: { experimental: ["25.9.0", "24.20.0"] } },
    decompressGzipSync: { [READ]: { experimental: ["25.9.0", "24.20.0"] } },
    decompressZstd: { [READ]: { experimental: ["25.9.0", "24.20.0"] } },
    decompressZstdSync: { [READ]: { experimental: ["25.9.0", "24.20.0"] } },
}

/**
 * @satisfies {import('../types.js').SupportVersionTraceMap}
 */
export default {
    zlib: zlib,
    "node:zlib": {
        ...zlib,
        [READ]: { supported: ["14.13.1", "12.20.0"] },
    },
    "zlib/iter": {
        [READ]: { experimental: ["25.9.0", "24.20.0"] },
        ...ZlibIter,
    },
    "node:zlib/iter": {
        [READ]: { experimental: ["25.9.0", "24.20.0"] },
        ...ZlibIter,
    },
}
