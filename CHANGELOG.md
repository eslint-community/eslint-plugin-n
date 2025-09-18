# Changelog

## [17.23.1](https://github.com/eslint-community/eslint-plugin-n/compare/v17.23.0...v17.23.1) (2025-09-18)


### 🩹 Fixes

* **node-builtins-modules/tls.js:** Update minimal version ([#484](https://github.com/eslint-community/eslint-plugin-n/issues/484)) ([fe94432](https://github.com/eslint-community/eslint-plugin-n/commit/fe94432306f35a3af53c2f9c9feb49259aa27f79))


### 📚 Documentation

* improve clarity of no-missing-import and no-missing-require ([#455](https://github.com/eslint-community/eslint-plugin-n/issues/455)) ([92ea876](https://github.com/eslint-community/eslint-plugin-n/commit/92ea876039dd42602da6a6e87129958552a8f3b7))

## [17.23.0](https://github.com/eslint-community/eslint-plugin-n/compare/v17.22.0...v17.23.0) (2025-09-15)


### 🌟 Features

* Support latest node v23.x ✨ ([#478](https://github.com/eslint-community/eslint-plugin-n/issues/478)) ([6516414](https://github.com/eslint-community/eslint-plugin-n/commit/6516414c61aeb3b43ee41983f7cdb45f6f9e867b))

## [17.22.0](https://github.com/eslint-community/eslint-plugin-n/compare/v17.21.3...v17.22.0) (2025-09-13)


### 🌟 Features

* Add missing features from node 20.19.0 ([#473](https://github.com/eslint-community/eslint-plugin-n/issues/473)) ([fd0c192](https://github.com/eslint-community/eslint-plugin-n/commit/fd0c19271ba9a4592281c72dbcfe282a2ce01e20))
* support latest node 22 ([#474](https://github.com/eslint-community/eslint-plugin-n/issues/474)) ([0ab562b](https://github.com/eslint-community/eslint-plugin-n/commit/0ab562b95ed98983308f107f4f2b679fc4d68701))


### 🩹 Fixes

* **ci:** bump markdowncli-lint version ([#468](https://github.com/eslint-community/eslint-plugin-n/issues/468)) ([91a56d0](https://github.com/eslint-community/eslint-plugin-n/commit/91a56d01322d1f3da8571b5358fd641a15a1e42a))
* **no-unsupported:** `URL.createObjectURL`, `URL.revokeObjectURL` are supported ([#471](https://github.com/eslint-community/eslint-plugin-n/issues/471)) ([844155c](https://github.com/eslint-community/eslint-plugin-n/commit/844155c9e6f31ad915ba84e923fbc96cb72611c6))

## [17.21.3](https://github.com/eslint-community/eslint-plugin-n/compare/v17.21.2...v17.21.3) (2025-07-28)


### 🩹 Fixes

* **no-missing-import:** Support data imports ([#465](https://github.com/eslint-community/eslint-plugin-n/issues/465)) ([69ea12b](https://github.com/eslint-community/eslint-plugin-n/commit/69ea12b939fd600b5bd3593dc1382e3a45d320e5))

## [17.21.2](https://github.com/eslint-community/eslint-plugin-n/compare/v17.21.1...v17.21.2) (2025-07-27)


### 🧹 Chores

* remove minimatch dependency ([#462](https://github.com/eslint-community/eslint-plugin-n/issues/462)) ([92a24ac](https://github.com/eslint-community/eslint-plugin-n/commit/92a24accf83bdf40fbaef804cf764405c756a852))

## [17.21.1](https://github.com/eslint-community/eslint-plugin-n/compare/v17.21.0...v17.21.1) (2025-07-27)


### 🩹 Fixes

* **ci:** Ignore type test failures for types present in ESLint 8 that we removed in ESLint 9.31.0 ([#460](https://github.com/eslint-community/eslint-plugin-n/issues/460)) ([76f8150](https://github.com/eslint-community/eslint-plugin-n/commit/76f81500f2f5b15b3a01405ec65ebe29ffdacbc5))
* **no-restricted-require:** Handle .. paths ([#458](https://github.com/eslint-community/eslint-plugin-n/issues/458)) ([34719e8](https://github.com/eslint-community/eslint-plugin-n/commit/34719e8b7efc8ccb95ab06841f3121c1aa6eb2a0))

## [17.21.0](https://github.com/eslint-community/eslint-plugin-n/compare/v17.20.0...v17.21.0) (2025-07-03)


### 🌟 Features

* add config "flat/all" ([#401](https://github.com/eslint-community/eslint-plugin-n/issues/401)) ([b6a0d71](https://github.com/eslint-community/eslint-plugin-n/commit/b6a0d7115015827b868e8fd4528c1722faf64fd3))


### 🩹 Fixes

* correctly handle version ranges in prefer-node-protocol ([#454](https://github.com/eslint-community/eslint-plugin-n/issues/454)) ([d60439d](https://github.com/eslint-community/eslint-plugin-n/commit/d60439d83b48717e56a44de89e2b6beaf6ea05bf))


### 🧹 Chores

* **no-sync:** remove `@typescript-eslint/utils` ([#449](https://github.com/eslint-community/eslint-plugin-n/issues/449)) ([45e2803](https://github.com/eslint-community/eslint-plugin-n/commit/45e28036dfde635fc4a66143de2e5131eae6da3f))

## [17.20.0](https://github.com/eslint-community/eslint-plugin-n/compare/v17.19.0...v17.20.0) (2025-06-12)


### 🌟 Features

* **no-top-level-await:** add support for `await using` ([#447](https://github.com/eslint-community/eslint-plugin-n/issues/447)) ([88dea92](https://github.com/eslint-community/eslint-plugin-n/commit/88dea92e099edfdab5a2b89a2bbde8c297f880dd))

## [17.19.0](https://github.com/eslint-community/eslint-plugin-n/compare/v17.18.0...v17.19.0) (2025-06-02)


### 🌟 Features

* add `no-top-level-await` rule ([#440](https://github.com/eslint-community/eslint-plugin-n/issues/440)) ([a500a48](https://github.com/eslint-community/eslint-plugin-n/commit/a500a48dec48707c12c1b0300632bb6ea7c99734))
* add support for ignoring sync methods from certain locations ([#424](https://github.com/eslint-community/eslint-plugin-n/issues/424)) ([ef94e49](https://github.com/eslint-community/eslint-plugin-n/commit/ef94e498e0b79fbdd8a44bb01c95e1bf3d4ba09a))

## [17.18.0](https://github.com/eslint-community/eslint-plugin-n/compare/v17.17.0...v17.18.0) (2025-05-09)


### 🌟 Features

* Allow to use `tryExtensions` in the rule `no-unpublished-import` ([#429](https://github.com/eslint-community/eslint-plugin-n/issues/429)) ([002ac9c](https://github.com/eslint-community/eslint-plugin-n/commit/002ac9cbc57272b9b3d28fb6aaea32dc8235bfc4))
* **no-deprecated-api:** Add support for `process.getBuiltinModule()` ([#435](https://github.com/eslint-community/eslint-plugin-n/issues/435)) ([fca7cf4](https://github.com/eslint-community/eslint-plugin-n/commit/fca7cf48d7d5d74feefd1864ab5f1fa098662fad))
* **node-builtins:** Add support for `process.getBuiltinModule()` ([#433](https://github.com/eslint-community/eslint-plugin-n/issues/433)) ([d4c7831](https://github.com/eslint-community/eslint-plugin-n/commit/d4c7831bfec83b8930e0c4754429162ade128653))
* **prefer-global:** Add support for `process.getBuiltinModule()` ([#436](https://github.com/eslint-community/eslint-plugin-n/issues/436)) ([83aa3a7](https://github.com/eslint-community/eslint-plugin-n/commit/83aa3a7dc4ef0b683e7d30acbf9177da35bfe1b4))
* **prefer-node-protocol:** Add support for `process.getBuiltinModule()` ([#430](https://github.com/eslint-community/eslint-plugin-n/issues/430)) ([9e97d8e](https://github.com/eslint-community/eslint-plugin-n/commit/9e97d8efc32f1dc6fa5568d862f5505d8e1e5cb9))
* **prefer-promises:** Add support for `process.getBuiltinModule()` ([#437](https://github.com/eslint-community/eslint-plugin-n/issues/437)) ([6f5e81d](https://github.com/eslint-community/eslint-plugin-n/commit/6f5e81d20bb0fdffdada5b06f43113cd41131e0e))


### 🩹 Fixes

* false negatives for `https` in `prefer-node-protocol`, and false negatives for `node:sqlite` in `node-builtins` ([#432](https://github.com/eslint-community/eslint-plugin-n/issues/432)) ([bb21bd0](https://github.com/eslint-community/eslint-plugin-n/commit/bb21bd0f33a0785ad20c33c33190f72f44685196))

## [17.17.0](https://github.com/eslint-community/eslint-plugin-n/compare/v17.16.2...v17.17.0) (2025-03-26)


### 🌟 Features

* **allow-modules:** include `virtual:` in the modules pattern ([#425](https://github.com/eslint-community/eslint-plugin-n/issues/425)) ([a109793](https://github.com/eslint-community/eslint-plugin-n/commit/a10979306d2f23ea78984d708f61213a098490f9))
* **node-builtin:** Add support for import.meta properties ([#420](https://github.com/eslint-community/eslint-plugin-n/issues/420)) ([76fc219](https://github.com/eslint-community/eslint-plugin-n/commit/76fc219c57f0519c2f7138e23ffb09cd66da6546))


### 🩹 Fixes

* **no-unpublished:** `allowModules` option was disabled when using TS alias ([#423](https://github.com/eslint-community/eslint-plugin-n/issues/423)) ([9ae39fb](https://github.com/eslint-community/eslint-plugin-n/commit/9ae39fb38331592d916c906ec772e73364f96599))
* type errors ([#427](https://github.com/eslint-community/eslint-plugin-n/issues/427)) ([8e3c290](https://github.com/eslint-community/eslint-plugin-n/commit/8e3c290c23ccb2826fd3fc611bb8a52765eea60b))

## [17.16.2](https://github.com/eslint-community/eslint-plugin-n/compare/v17.16.1...v17.16.2) (2025-03-04)


### 🩹 Fixes

* Revert "feat: add support for ignoring sync methods from certain locations" ([#416](https://github.com/eslint-community/eslint-plugin-n/issues/416)) ([0779e2f](https://github.com/eslint-community/eslint-plugin-n/commit/0779e2ffc17ae49b58db32835e1c697b8125ec67))

## [17.16.1](https://github.com/eslint-community/eslint-plugin-n/compare/v17.16.0...v17.16.1) (2025-03-02)


### 🩹 Fixes

* patch new eslint options types ([#411](https://github.com/eslint-community/eslint-plugin-n/issues/411)) ([340312e](https://github.com/eslint-community/eslint-plugin-n/commit/340312e15f062e059c04ef8c8cf238afd3454b68))


### 🧹 Chores

* **package:** explicitly declare js module type ([#410](https://github.com/eslint-community/eslint-plugin-n/issues/410)) ([9f09931](https://github.com/eslint-community/eslint-plugin-n/commit/9f099311720f078c398a1c931959b05ba6d60516))

## [17.16.0](https://github.com/eslint-community/eslint-plugin-n/compare/v17.15.1...v17.16.0) (2025-02-23)


### 🌟 Features

* add support for ignoring sync methods from certain locations ([#392](https://github.com/eslint-community/eslint-plugin-n/issues/392)) ([5544f20](https://github.com/eslint-community/eslint-plugin-n/commit/5544f20f113e59d6789a249dc24df73fdc354fa1))


### 🩹 Fixes

* False-positive `no-extraneous-import` when using the `tsconfig &gt; paths` alias import ([#408](https://github.com/eslint-community/eslint-plugin-n/issues/408)) ([f486492](https://github.com/eslint-community/eslint-plugin-n/commit/f48649239392f647fe8426f66fc9b4ea6a9ba45e))


### 🧹 Chores

* eslint v8 compat ([#397](https://github.com/eslint-community/eslint-plugin-n/issues/397)) ([86a5242](https://github.com/eslint-community/eslint-plugin-n/commit/86a524250dcc7c32225f2880ec66767a06c6258d))
* improve `prefer-node-protocol`'s performance ([#406](https://github.com/eslint-community/eslint-plugin-n/issues/406)) ([4efe60f](https://github.com/eslint-community/eslint-plugin-n/commit/4efe60f37c71ce3d71932714207bac780332cf3d))

## [17.15.1](https://github.com/eslint-community/eslint-plugin-n/compare/v17.15.0...v17.15.1) (2024-12-20)


### 🩹 Fixes

* Promise.withResolvers is supported since node 22.11 ([#398](https://github.com/eslint-community/eslint-plugin-n/issues/398)) ([c5bcb3a](https://github.com/eslint-community/eslint-plugin-n/commit/c5bcb3aa9a13f1de1b4aea20cfc08323f31f75ce))

## [17.15.0](https://github.com/eslint-community/eslint-plugin-n/compare/v17.14.0...v17.15.0) (2024-12-10)


### 🌟 Features

* **no-unsupported:** support node 22.12.0 ([#393](https://github.com/eslint-community/eslint-plugin-n/issues/393)) ([af4f774](https://github.com/eslint-community/eslint-plugin-n/commit/af4f774be560ac9472d98c99082a678ca5703574))
* **resolve:** allow overriding enhanced-resolve's options ([#384](https://github.com/eslint-community/eslint-plugin-n/issues/384)) ([1466bec](https://github.com/eslint-community/eslint-plugin-n/commit/1466bec9050606ea874444452a4d58484b480a14))


### 🩹 Fixes

* **no-unsupported:** Correctly handle recursive objects on a per module basis ([#396](https://github.com/eslint-community/eslint-plugin-n/issues/396)) ([db384d1](https://github.com/eslint-community/eslint-plugin-n/commit/db384d13ada7d9f48a7f8bf2ae92f76a4e3789aa))

## [17.14.0](https://github.com/eslint-community/eslint-plugin-n/compare/v17.13.2...v17.14.0) (2024-11-21)


### 🌟 Features

* **no-sync:** Add ignores option ([#386](https://github.com/eslint-community/eslint-plugin-n/issues/386)) ([c8fbf00](https://github.com/eslint-community/eslint-plugin-n/commit/c8fbf000e337d3b099e89465adda3be8e0541554))
* **no-unsupported:** support Node 23.2.0 & 23.3.0 ([#390](https://github.com/eslint-community/eslint-plugin-n/issues/390)) ([a52c968](https://github.com/eslint-community/eslint-plugin-n/commit/a52c96813496c346cd9cacc23df8ade2567012af))

## [17.13.2](https://github.com/eslint-community/eslint-plugin-n/compare/v17.13.1...v17.13.2) (2024-11-15)


### 🩹 Fixes

* **no-missing-require:** handle multiple resolvePaths ([#383](https://github.com/eslint-community/eslint-plugin-n/issues/383)) ([df6ad2a](https://github.com/eslint-community/eslint-plugin-n/commit/df6ad2a3f2cbc2218fe8bd23222e3867642d1e70))

## [17.13.1](https://github.com/eslint-community/eslint-plugin-n/compare/v17.13.0...v17.13.1) (2024-11-07)


### 🩹 Fixes

* exported / referenced plugin same instance ([#380](https://github.com/eslint-community/eslint-plugin-n/issues/380)) ([3c45b67](https://github.com/eslint-community/eslint-plugin-n/commit/3c45b67cc566021399ab8f2bb840fa4c62556b7f))

## [17.13.0](https://github.com/eslint-community/eslint-plugin-n/compare/v17.12.0...v17.13.0) (2024-11-05)


### 🌟 Features

* **no-unsupported:** support Node 20.18.0 ([#374](https://github.com/eslint-community/eslint-plugin-n/issues/374)) ([d39d99a](https://github.com/eslint-community/eslint-plugin-n/commit/d39d99aecf2e8f0dde59b980f209d1c377af9a46))


### 🩹 Fixes

* **no-unsupported:** fix `node:test` module ([#378](https://github.com/eslint-community/eslint-plugin-n/issues/378)) ([0b228dd](https://github.com/eslint-community/eslint-plugin-n/commit/0b228ddece63d2939551ea6ccb73e9dfbefe88ec))


### 🧹 Chores

* update dependencies ([#375](https://github.com/eslint-community/eslint-plugin-n/issues/375)) ([8a8104e](https://github.com/eslint-community/eslint-plugin-n/commit/8a8104e27bb278f21f25bd7d9a7acfa1523ccb13))

## [17.12.0](https://github.com/eslint-community/eslint-plugin-n/compare/v17.11.1...v17.12.0) (2024-10-30)


### 🌟 Features

* **no-unsupported:** Support node 23.0.0 and 22.10.0 ([#358](https://github.com/eslint-community/eslint-plugin-n/issues/358)) ([0fd0350](https://github.com/eslint-community/eslint-plugin-n/commit/0fd0350ee1aa7825fb52c172342dd419f79a21f7))
* **no-unsupported:** Support node 23.1.0 ([#370](https://github.com/eslint-community/eslint-plugin-n/issues/370)) ([06d60ae](https://github.com/eslint-community/eslint-plugin-n/commit/06d60aef21a01ac8a77101d1e983d3b4c31822c1))


### 🩹 Fixes

* **no-unsupported:** `getCallSite` is experimental ([#363](https://github.com/eslint-community/eslint-plugin-n/issues/363)) ([d15c63a](https://github.com/eslint-community/eslint-plugin-n/commit/d15c63a9a874e5d0becc7d213d354ae3c8231b21))
* **no-unsupported:** support missing `process.features` ([#362](https://github.com/eslint-community/eslint-plugin-n/issues/362)) ([9552a4a](https://github.com/eslint-community/eslint-plugin-n/commit/9552a4a4c9001c6b5f51620d68a3b2cbaa392cd4))
* update dependencies ([#365](https://github.com/eslint-community/eslint-plugin-n/issues/365)) ([bf34ca5](https://github.com/eslint-community/eslint-plugin-n/commit/bf34ca53864e059e3fbf632f33429ba10a75ee9b))


### 🧹 Chores

* Improve typescript types and strictness ([#367](https://github.com/eslint-community/eslint-plugin-n/issues/367)) ([18cdd53](https://github.com/eslint-community/eslint-plugin-n/commit/18cdd53b8bc520e84cc1edbf0e21fd26357ce8a2))

## [17.11.1](https://github.com/eslint-community/eslint-plugin-n/compare/v17.11.0...v17.11.1) (2024-10-09)


### 🩹 Fixes

* **no-deprecated-api:** dedeprecate `process.nextTick` ([#350](https://github.com/eslint-community/eslint-plugin-n/issues/350)) ([dd889ab](https://github.com/eslint-community/eslint-plugin-n/commit/dd889ab9301a72deea32b9f3cf6497864919ff66))

## [17.11.0](https://github.com/eslint-community/eslint-plugin-n/compare/v17.10.3...v17.11.0) (2024-10-09)


### 🌟 Features

* **no-missing-import:** Add `ignoreTypeImport` options ([#344](https://github.com/eslint-community/eslint-plugin-n/issues/344)) ([e022aba](https://github.com/eslint-community/eslint-plugin-n/commit/e022abad91701660ffd3bf52693ae2749a5131ee))
* **no-process-env:** Allow users to exclude specific variables ([#345](https://github.com/eslint-community/eslint-plugin-n/issues/345)) ([b16a475](https://github.com/eslint-community/eslint-plugin-n/commit/b16a4753c111271325f6dced4936bc9da6162138))
* Update no-unsupported to node v22.9.0 ([#342](https://github.com/eslint-community/eslint-plugin-n/issues/342)) ([87fb484](https://github.com/eslint-community/eslint-plugin-n/commit/87fb4849ecb52164b24c5ae840fff0b699241fa4))


### 🩹 Fixes

* **no-missing-import:** Ignore node builtins in package.json `imports` ([#346](https://github.com/eslint-community/eslint-plugin-n/issues/346)) ([148e47e](https://github.com/eslint-community/eslint-plugin-n/commit/148e47e7502c3784b1f2b86aae594c7fc58b31a3))
* **no-missing-import:** Resolve tsconfig paths relative to the tsconfig ([#343](https://github.com/eslint-community/eslint-plugin-n/issues/343)) ([6cd7954](https://github.com/eslint-community/eslint-plugin-n/commit/6cd7954ff91818c3bb4d3c2d7a316f2716720276))


### 📚 Documentation

* Explain the transitive dependency case for no-extraneous-* ([#347](https://github.com/eslint-community/eslint-plugin-n/issues/347)) ([8c0a2cc](https://github.com/eslint-community/eslint-plugin-n/commit/8c0a2cc515e4541883e1d8aba85fa71d3a865891))

## [17.10.3](https://github.com/eslint-community/eslint-plugin-n/compare/v17.10.2...v17.10.3) (2024-09-18)


### 🩹 Fixes

* Use our data set to work out if a module is a node module ([#338](https://github.com/eslint-community/eslint-plugin-n/issues/338)) ([6a1b2c5](https://github.com/eslint-community/eslint-plugin-n/commit/6a1b2c5606f0c6a37b38b60d780df8698db22a87))


### 📚 Documentation

* **process-exit-as-throw:** update wording ([#323](https://github.com/eslint-community/eslint-plugin-n/issues/323)) ([e5e758e](https://github.com/eslint-community/eslint-plugin-n/commit/e5e758ea0cd238220127ae7bcbd967f1d8920f28))

## [17.10.2](https://github.com/eslint-community/eslint-plugin-n/compare/v17.10.1...v17.10.2) (2024-08-05)


### 🩹 Fixes

* Duplex.from is supported in 16.8.0 ([#325](https://github.com/eslint-community/eslint-plugin-n/issues/325)) ([de5ac0a](https://github.com/eslint-community/eslint-plugin-n/commit/de5ac0a4f4ea3e6de21d765084e03fcc37ef0b68)), closes [#324](https://github.com/eslint-community/eslint-plugin-n/issues/324)

## [17.10.1](https://github.com/eslint-community/eslint-plugin-n/compare/v17.10.0...v17.10.1) (2024-07-26)


### 🩹 Fixes

* Revert ts version (5.5 -&gt; 5.4) ([#317](https://github.com/eslint-community/eslint-plugin-n/issues/317)) ([3bee0d9](https://github.com/eslint-community/eslint-plugin-n/commit/3bee0d9b3d6b01c1dffb21aa0ca608045ae4aafd))

## [17.10.0](https://github.com/eslint-community/eslint-plugin-n/compare/v17.9.0...v17.10.0) (2024-07-26)


### 🌟 Features

* **no-unsupported:** Support node 20.16.0 ([73e2bed](https://github.com/eslint-community/eslint-plugin-n/commit/73e2bed2e76dc9382069268954ae894665f18538))
* **no-unsupported:** Support node 22.3.0 and 20.16.0 ([#315](https://github.com/eslint-community/eslint-plugin-n/issues/315)) ([73e2bed](https://github.com/eslint-community/eslint-plugin-n/commit/73e2bed2e76dc9382069268954ae894665f18538))
* Update to node v22.4.0 ([#310](https://github.com/eslint-community/eslint-plugin-n/issues/310)) ([f7a74eb](https://github.com/eslint-community/eslint-plugin-n/commit/f7a74eb147875d7e2125125863befe61d0be0614)), closes [#308](https://github.com/eslint-community/eslint-plugin-n/issues/308)
* Update to node v22.5.0 ([#312](https://github.com/eslint-community/eslint-plugin-n/issues/312)) ([2539c9d](https://github.com/eslint-community/eslint-plugin-n/commit/2539c9deaa0c339b520dcd45ba4998dca6b678e3))


### 📚 Documentation

* add clarifications to readme ([dbdfa8e](https://github.com/eslint-community/eslint-plugin-n/commit/dbdfa8e0abdeb96f2f843c4112cc43f16f2657ea))
* fix spacings in the example ([#306](https://github.com/eslint-community/eslint-plugin-n/issues/306)) ([c092cd8](https://github.com/eslint-community/eslint-plugin-n/commit/c092cd893010f8da894f87da567c07d69be6cc0d))


### 🧹 Chores

* upgrade compatible deps ([8f6f11d](https://github.com/eslint-community/eslint-plugin-n/commit/8f6f11da5d072fe7b0ca1e916744e527ee260db2))

## [17.9.0](https://github.com/eslint-community/eslint-plugin-n/compare/v17.8.1...v17.9.0) (2024-06-14)


### 🌟 Features

* Add flag ignorePrivate to no-unpublished-x rules ([#298](https://github.com/eslint-community/eslint-plugin-n/issues/298)) ([0609431](https://github.com/eslint-community/eslint-plugin-n/commit/0609431dabcd9402720071025c0206d2686e1d78))

## [17.8.1](https://github.com/eslint-community/eslint-plugin-n/compare/v17.8.0...v17.8.1) (2024-06-06)


### 🩹 Fixes

* hashbang + eslint v8 compat issue ([e82974f](https://github.com/eslint-community/eslint-plugin-n/commit/e82974fc724e4a410f85459f4cd3e5367939cc9c))
* hashbang + eslint v8 compat issue ([#290](https://github.com/eslint-community/eslint-plugin-n/issues/290)) ([e82974f](https://github.com/eslint-community/eslint-plugin-n/commit/e82974fc724e4a410f85459f4cd3e5367939cc9c))

## [17.8.0](https://github.com/eslint-community/eslint-plugin-n/compare/v17.7.0...v17.8.0) (2024-06-05)


### 🌟 Features

* **node-builtin:** Add node 22.2.0 support ([#282](https://github.com/eslint-community/eslint-plugin-n/issues/282)) ([5221c40](https://github.com/eslint-community/eslint-plugin-n/commit/5221c4015fb939cfb33231b7b6f4669cf1197ef7))


### 🩹 Fixes

* Allow for misconfigured default exports ([#288](https://github.com/eslint-community/eslint-plugin-n/issues/288)) ([92e18b5](https://github.com/eslint-community/eslint-plugin-n/commit/92e18b572f7bd2427f050eab8484cb393e1dac7a))


### 🧹 Chores

* add a test for self-ref ([#280](https://github.com/eslint-community/eslint-plugin-n/issues/280)) ([4f50dfe](https://github.com/eslint-community/eslint-plugin-n/commit/4f50dfe6528e32749aac315e53b351345cfc8c13))
* update dependency markdownlint-cli to ^0.41.0 ([#287](https://github.com/eslint-community/eslint-plugin-n/issues/287)) ([0efe751](https://github.com/eslint-community/eslint-plugin-n/commit/0efe751b1fa1194ddc58b0934a1299d982e93d35))

## [17.7.0](https://github.com/eslint-community/eslint-plugin-n/compare/v17.6.0...v17.7.0) (2024-05-14)


### 🌟 Features

* **hashbang:** Add support to map extensions to executables ([#278](https://github.com/eslint-community/eslint-plugin-n/issues/278)) ([3fd7639](https://github.com/eslint-community/eslint-plugin-n/commit/3fd7639e4d98d2cd936682197ef4004d59adadfd))
* **node-builtin:** Add node 20.13.0, 22.0.0, and 22.1.0 support ([#276](https://github.com/eslint-community/eslint-plugin-n/issues/276)) ([4a685c0](https://github.com/eslint-community/eslint-plugin-n/commit/4a685c05e2d5770e22c46dcb78267fa8c484f725))


### 🩹 Fixes

* **node-builtins:** Remove "node:" prefix from "ignores" message ([#277](https://github.com/eslint-community/eslint-plugin-n/issues/277)) ([704f0b9](https://github.com/eslint-community/eslint-plugin-n/commit/704f0b9373542e03b42102d30bc44cb7e30fc5d8))


### 📚 Documentation

* **node-builtins:** Specify that only static properties are supported ([#272](https://github.com/eslint-community/eslint-plugin-n/issues/272)) ([735a520](https://github.com/eslint-community/eslint-plugin-n/commit/735a5207aee828e324835bdb0c7fa743347ef4b9))
* Provide an example with eslint-plugin-n to Playground ([#275](https://github.com/eslint-community/eslint-plugin-n/issues/275)) ([cb8ffa6](https://github.com/eslint-community/eslint-plugin-n/commit/cb8ffa62d07869dd23985f7d861ad3c60deec4f8))

## [17.6.0](https://github.com/eslint-community/eslint-plugin-n/compare/v17.5.1...v17.6.0) (2024-05-10)


### 🌟 Features

* Add support for ignoring experemental features ([#269](https://github.com/eslint-community/eslint-plugin-n/issues/269)) ([c046376](https://github.com/eslint-community/eslint-plugin-n/commit/c046376fb52bef8104502ffab3c457412d1a1e27))


### 📚 Documentation

* add maintainance info ([#271](https://github.com/eslint-community/eslint-plugin-n/issues/271)) ([b454488](https://github.com/eslint-community/eslint-plugin-n/commit/b454488bd63c046d101305c40d24bf44ae83971e)), closes [#194](https://github.com/eslint-community/eslint-plugin-n/issues/194)

## [17.5.1](https://github.com/eslint-community/eslint-plugin-n/compare/v17.5.0...v17.5.1) (2024-05-07)


### 🩹 Fixes

* Add supported version to Buffer constructor ([#266](https://github.com/eslint-community/eslint-plugin-n/issues/266)) ([030f51b](https://github.com/eslint-community/eslint-plugin-n/commit/030f51bacd21918ef6d5b2bba9ec77cd701c3eba))

## [17.5.0](https://github.com/eslint-community/eslint-plugin-n/compare/v17.4.0...v17.5.0) (2024-05-07)


### 🌟 Features

* **import-target:** Add resolution error reason ([#264](https://github.com/eslint-community/eslint-plugin-n/issues/264)) ([982a723](https://github.com/eslint-community/eslint-plugin-n/commit/982a723dfb81dc141b093e27b41cd67f82ba8587))
* **node-builtins:** Add node globals ([#261](https://github.com/eslint-community/eslint-plugin-n/issues/261)) ([9466731](https://github.com/eslint-community/eslint-plugin-n/commit/946673149b51b84581f91890495c810a496e0022))


### 🩹 Fixes

* remove invalid es-builtins ([#258](https://github.com/eslint-community/eslint-plugin-n/issues/258)) ([ecdf019](https://github.com/eslint-community/eslint-plugin-n/commit/ecdf019c54c5bd720c20d2ea21886559c15f3205))


### 🧹 Chores

* update dependency markdownlint-cli to ^0.40.0 ([#263](https://github.com/eslint-community/eslint-plugin-n/issues/263)) ([1e41e7c](https://github.com/eslint-community/eslint-plugin-n/commit/1e41e7cf5328df05d07aeab8bc9c5d0f27d33695))

## [17.4.0](https://github.com/eslint-community/eslint-plugin-n/compare/v17.3.1...v17.4.0) (2024-04-30)


### 🌟 Features

* no-deprecated-api support removed api ([#240](https://github.com/eslint-community/eslint-plugin-n/issues/240)) ([36fd35d](https://github.com/eslint-community/eslint-plugin-n/commit/36fd35d9bbbaec43dd911e06bd83625cd1650fb3))


### 🩹 Fixes

* unsupported-features/node-builtins-modules version comparation ([#257](https://github.com/eslint-community/eslint-plugin-n/issues/257)) ([5c67787](https://github.com/eslint-community/eslint-plugin-n/commit/5c67787cb191ff7409fa17ec5b12cfdc3a7a26d3))


### 🧹 Chores

* Update release manifest (17.3.1) ([#255](https://github.com/eslint-community/eslint-plugin-n/issues/255)) ([cf576cb](https://github.com/eslint-community/eslint-plugin-n/commit/cf576cb45bd1f13b675b1612e79f571acfb780af))

## [17.3.0](https://github.com/eslint-community/eslint-plugin-n/compare/v17.2.1...v17.3.0) (2024-04-24)


### 🌟 Features

* More es-syntax deprecations ([#249](https://github.com/eslint-community/eslint-plugin-n/issues/249)) ([2ecee79](https://github.com/eslint-community/eslint-plugin-n/commit/2ecee796c53733c70ea671a1e029aed9cf06d050))


### 🩹 Fixes

* unsupported-features/node-builtins-modules range compare ([#252](https://github.com/eslint-community/eslint-plugin-n/issues/252)) ([d50ae85](https://github.com/eslint-community/eslint-plugin-n/commit/d50ae85c209a47a8a5d4c1bedaa94e6a77540095))


### 🧹 Chores

* update outdated funding ([#246](https://github.com/eslint-community/eslint-plugin-n/issues/246)) ([8d711f5](https://github.com/eslint-community/eslint-plugin-n/commit/8d711f5446655c9874aeffb2ef28b3c4d8463fb6))
* upgrade globals v15 ([#241](https://github.com/eslint-community/eslint-plugin-n/issues/241)) ([eb11b5b](https://github.com/eslint-community/eslint-plugin-n/commit/eb11b5b35a6a797dc7fba6df53b1c4dada3a2a55))

## [17.2.1](https://github.com/eslint-community/eslint-plugin-n/compare/v17.2.0...v17.2.1) (2024-04-15)


### 🩹 Fixes

* **unsupported-features:** Improve URL module ([#244](https://github.com/eslint-community/eslint-plugin-n/issues/244)) ([6581979](https://github.com/eslint-community/eslint-plugin-n/commit/6581979cfb6afa6a50531d37303af24aa7b4db37)), closes [#243](https://github.com/eslint-community/eslint-plugin-n/issues/243)


### 🧹 Chores

* update dependency @typescript-eslint/typescript-estree to v7 ([#236](https://github.com/eslint-community/eslint-plugin-n/issues/236)) ([a0b45ee](https://github.com/eslint-community/eslint-plugin-n/commit/a0b45ee9c35279c29d3602609dad3b36d95d6f5f))
* update dependency eslint-plugin-eslint-plugin to v6 ([#237](https://github.com/eslint-community/eslint-plugin-n/issues/237)) ([7addf99](https://github.com/eslint-community/eslint-plugin-n/commit/7addf998e72d0f8ae92c52b112667bcb2c9558cd))

## [17.2.0](https://github.com/eslint-community/eslint-plugin-n/compare/v17.1.0...v17.2.0) (2024-04-10)


### 🌟 Features

* **no-missing-imports:** add `tryExtensions` option ([#228](https://github.com/eslint-community/eslint-plugin-n/issues/228)) ([ae5329c](https://github.com/eslint-community/eslint-plugin-n/commit/ae5329c06b38da1220a352d4d268cfa8038c0d00))
* **no-unsupported-features:** ✨ Update to node v20.12.0/v21.7.0 ([#229](https://github.com/eslint-community/eslint-plugin-n/issues/229)) ([a8d0539](https://github.com/eslint-community/eslint-plugin-n/commit/a8d0539ae99697f0e3441625c61e2e6ed7a10b9a))


### 🩹 Fixes

* `stream/promises` is stable ([02a264e](https://github.com/eslint-community/eslint-plugin-n/commit/02a264e0acb7ba913500e195fe0a2a6aaae74c6e))
* **no-unsupported-features:** `stream/promises` is stable ([#235](https://github.com/eslint-community/eslint-plugin-n/issues/235)) ([02a264e](https://github.com/eslint-community/eslint-plugin-n/commit/02a264e0acb7ba913500e195fe0a2a6aaae74c6e)), closes [#234](https://github.com/eslint-community/eslint-plugin-n/issues/234)

## [17.1.0](https://github.com/eslint-community/eslint-plugin-n/compare/v17.0.0...v17.1.0) (2024-04-09)


### 🌟 Features

* add `name` to flat configs ([#224](https://github.com/eslint-community/eslint-plugin-n/issues/224)) ([24512a0](https://github.com/eslint-community/eslint-plugin-n/commit/24512a0fe27bcb9b2a0ed20cd83bcbd3c0060d0b))
* **import-target:** Add resolution error reason ([ed7b25c](https://github.com/eslint-community/eslint-plugin-n/commit/ed7b25cf4ccb3f27bf89993a7fc8c706e3491ad5))
* remove "is-builtin-module" dependency (fixes [#232](https://github.com/eslint-community/eslint-plugin-n/issues/232)) ([#227](https://github.com/eslint-community/eslint-plugin-n/issues/227)) ([03619ee](https://github.com/eslint-community/eslint-plugin-n/commit/03619eed4d24cb8ed79c467fe4a620bd58fea4cd))


### 📚 Documentation

* add v17 changelog ([#223](https://github.com/eslint-community/eslint-plugin-n/issues/223)) ([4fb36eb](https://github.com/eslint-community/eslint-plugin-n/commit/4fb36eb253536b694d16b72d31221c98f1012f9f))

## [17.0.0](https://github.com/eslint-community/eslint-plugin-n/compare/v17.0.0...v17.0.0-8) (2024-04-08)

## 💥 Breaking changes:

* feat!: drop eslint v7 & node.js < 18 ([#161](https://github.com/eslint-community/eslint-plugin-n/issues/161)) ([41ceed7](https://github.com/eslint-community/eslint-plugin-n/commit/41ceed7))
* feat!: Start using `enhanced-resolve` to improve ts support ([#139](https://github.com/eslint-community/eslint-plugin-n/issues/139)) ([dc9f473](https://github.com/eslint-community/eslint-plugin-n/commit/dc9f473))
* rename rule shebang => hashbang, deprecate rule shebang ([#198](https://github.com/eslint-community/eslint-plugin-n/issues/198))

## Features

* typescript (jsdoc) checking and definition generation ([#169](https://github.com/eslint-community/eslint-plugin-n/issues/169)) ([6d8ed14](https://github.com/eslint-community/eslint-plugin-n/commit/6d8ed14c186a814c3a258993fb6c986a02ed5568))
* rename rule shebang =&gt; hashbang, deprecate rule shebang ([#198](https://github.com/eslint-community/eslint-plugin-n/issues/198)) ([cefdb1c](https://github.com/eslint-community/eslint-plugin-n/commit/cefdb1c26d856b544470e825daef2dfa5d0e4a30)), closes [#196](https://github.com/eslint-community/eslint-plugin-n/issues/196)
* **shebang:** add support for env's split-string option ([#195](https://github.com/eslint-community/eslint-plugin-n/issues/195)) ([b383b49](https://github.com/eslint-community/eslint-plugin-n/commit/b383b4971df4f4b67099655797b654b36d6a8fdf))
* Update ES Syntax ([#189](https://github.com/eslint-community/eslint-plugin-n/issues/189)) ([4778ae8](https://github.com/eslint-community/eslint-plugin-n/commit/4778ae86c398f90da13248c2d31bfc4a83cd2dea))
* feat: Update es-builtins ([#174](https://github.com/eslint-community/eslint-plugin-n/issues/174)) ([fbc9e7b](https://github.com/eslint-community/eslint-plugin-n/commit/fbc9e7b))
* feat(no-unsupported-features): Update to v21.6.1 of node ([#180](https://github.com/eslint-community/eslint-plugin-n/issues/180)) ([d24f645](https://github.com/eslint-community/eslint-plugin-n/commit/d24f645))
* feat: Add n/prefer-node-protocol rule ([#183](https://github.com/eslint-community/eslint-plugin-n/issues/183)) ([88d1c37](https://github.com/eslint-community/eslint-plugin-n/commit/88d1c37))
* feat(shebang): Add options to ignore unpublished files ([#172](https://github.com/eslint-community/eslint-plugin-n/issues/172)) ([5609abb](https://github.com/eslint-community/eslint-plugin-n/commit/5609abb))

## Bugfixes

* prefer-node-protocol: not first target ([#204](https://github.com/eslint-community/eslint-plugin-n/issues/204)) ([caab777](https://github.com/eslint-community/eslint-plugin-n/commit/caab77714ec9195c07290d4c212a95f11b48bb5f))
* **prefer-node-protocol:** continue on version range check ([#206](https://github.com/eslint-community/eslint-plugin-n/issues/206)) ([14d2ea9](https://github.com/eslint-community/eslint-plugin-n/commit/14d2ea90c1609b49e95cc805105711c62bf6fd50))
* prefer-node-prefix: pass moduleName ([#203](https://github.com/eslint-community/eslint-plugin-n/issues/203))
* **no-unsupported-features:** Remove use of `static` as a variable ([#190](https://github.com/eslint-community/eslint-plugin-n/issues/190)) ([e31d868](https://github.com/eslint-community/eslint-plugin-n/commit/e31d8683b65a6f982cb91634f951afd0fe5583ae))
* fix: Remove `require("util")` import in import-target (#181) (d32eff3)

## Chores

* use `ts-ignore-import` to lighten the dependencies ([#219](https://github.com/eslint-community/eslint-plugin-n/issues/219)) ([fb0aaae](https://github.com/eslint-community/eslint-plugin-n/commit/fb0aaae9a5d540542a4122fe333097c200b78b95))
* update dependency @typescript-eslint/parser to v7 ([#207](https://github.com/eslint-community/eslint-plugin-n/issues/207)) ([0b8aeb3](https://github.com/eslint-community/eslint-plugin-n/commit/0b8aeb3e8d8f1837a443d93a5bf55ad55bba085d))
* update dependency husky to v9 ([#208](https://github.com/eslint-community/eslint-plugin-n/issues/208)) ([e84d47b](https://github.com/eslint-community/eslint-plugin-n/commit/e84d47b98de65eb77ac96cef44af2adb901acac0))
* Enable global strict eslint rule ([#191](https://github.com/eslint-community/eslint-plugin-n/issues/191)) ([99fe387](https://github.com/eslint-community/eslint-plugin-n/commit/99fe38722d02de867f4bd8061a343b9754b62610))
* Migrate to manifest config ([#192](https://github.com/eslint-community/eslint-plugin-n/issues/192)) ([c8a87f3](https://github.com/eslint-community/eslint-plugin-n/commit/c8a87f3ef99348e547259f3939274cdf4da72b08))
* docs: improve wording of file-extension-in-import docs (#110) (3f178ab)
* build: run test on eslint pre-releases (#171) (77de809)
* ci: Make release-please publish pre-releases (#186) (4b12cdc)
* chore: update dependency globals to v14 (#185) (9930101)
* chore: update dependency markdownlint-cli to ^0.39.0 (#179) (cd5cbbb)
* chore: Merge supported and backport properties (#177) (5d1cb98)
* chore: `npm run format` (#175) (17e658e)
* chore!: remove "n/no-unsupported-features" #140 (#173) (372b283)
* chore: update dependency minimatch to v9 (#167) (5ad657c)
* chore: add release-please (#170) (fc77da2)
* chore: update dependency @typescript-eslint/parser to v6 (#166) (4265094)
* chore: update dependency markdownlint-cli to ^0.38.0 (#149) (3fd61be)
* chore: update dependency release-it to v17 (#168) (1c91e05)
* chore: upgrade prettier v3 (#165) (bbfde8d)

## [17.0.0-8](https://github.com/eslint-community/eslint-plugin-n/compare/v17.0.0-7...v17.0.0-8) (2024-04-08)


### Chores

* use `ts-ignore-import` to lighten the dependencies ([#219](https://github.com/eslint-community/eslint-plugin-n/issues/219)) ([fb0aaae](https://github.com/eslint-community/eslint-plugin-n/commit/fb0aaae9a5d540542a4122fe333097c200b78b95))

## [17.0.0-7](https://github.com/eslint-community/eslint-plugin-n/compare/v17.0.0-6...v17.0.0-7) (2024-04-07)


### Features

* typescript (jsdoc) checking and definition generation ([#169](https://github.com/eslint-community/eslint-plugin-n/issues/169)) ([6d8ed14](https://github.com/eslint-community/eslint-plugin-n/commit/6d8ed14c186a814c3a258993fb6c986a02ed5568))


### Bug Fixes

* change peer dependencies to allow eslint v9 ([#216](https://github.com/eslint-community/eslint-plugin-n/issues/216)) ([5e82d7f](https://github.com/eslint-community/eslint-plugin-n/commit/5e82d7f26aa8dc58b46584c9fe3c74a11c265228))

## [17.0.0-6](https://github.com/eslint-community/eslint-plugin-n/compare/v17.0.0-5...v17.0.0-6) (2024-03-25)


### Bug Fixes

* prefer-node-protocol: not first target ([#204](https://github.com/eslint-community/eslint-plugin-n/issues/204)) ([caab777](https://github.com/eslint-community/eslint-plugin-n/commit/caab77714ec9195c07290d4c212a95f11b48bb5f))
* **prefer-node-protocol:** continue on version range check ([#206](https://github.com/eslint-community/eslint-plugin-n/issues/206)) ([14d2ea9](https://github.com/eslint-community/eslint-plugin-n/commit/14d2ea90c1609b49e95cc805105711c62bf6fd50))


### Chores

* update dependency @typescript-eslint/parser to v7 ([#207](https://github.com/eslint-community/eslint-plugin-n/issues/207)) ([0b8aeb3](https://github.com/eslint-community/eslint-plugin-n/commit/0b8aeb3e8d8f1837a443d93a5bf55ad55bba085d))
* update dependency husky to v9 ([#208](https://github.com/eslint-community/eslint-plugin-n/issues/208)) ([e84d47b](https://github.com/eslint-community/eslint-plugin-n/commit/e84d47b98de65eb77ac96cef44af2adb901acac0))

## [17.0.0-5](https://github.com/eslint-community/eslint-plugin-n/compare/v17.0.0-4...v17.0.0-5) (2024-03-19)


### ⚠ BREAKING CHANGES

* prefer-node-prefix: pass moduleName ([#203](https://github.com/eslint-community/eslint-plugin-n/issues/203))

### Features

* prefer-node-prefix: pass moduleName ([#203](https://github.com/eslint-community/eslint-plugin-n/issues/203)) ([38985ca](https://github.com/eslint-community/eslint-plugin-n/commit/38985ca63537cc56ae2476457ec7d5e433bf0a2f))


### Bug Fixes

* explicitly support ESLint 9.0.0 pre-releases ([#200](https://github.com/eslint-community/eslint-plugin-n/issues/200)) ([a5eaa9c](https://github.com/eslint-community/eslint-plugin-n/commit/a5eaa9c867bc2e87b1fa54920c85acd1e8f9f927))


### Documentation

* Remove text "Node does not support modules yet" ([#202](https://github.com/eslint-community/eslint-plugin-n/issues/202)) ([5abca5b](https://github.com/eslint-community/eslint-plugin-n/commit/5abca5bb6f1166045578ba7d51cda36b32cb333b))

## [17.0.0-4](https://github.com/eslint-community/eslint-plugin-n/compare/17.0.0-3...v17.0.0-4) (2024-03-06)


### ⚠ BREAKING CHANGES

* rename rule shebang => hashbang, deprecate rule shebang ([#198](https://github.com/eslint-community/eslint-plugin-n/issues/198))

### Features

* rename rule shebang =&gt; hashbang, deprecate rule shebang ([#198](https://github.com/eslint-community/eslint-plugin-n/issues/198)) ([cefdb1c](https://github.com/eslint-community/eslint-plugin-n/commit/cefdb1c26d856b544470e825daef2dfa5d0e4a30)), closes [#196](https://github.com/eslint-community/eslint-plugin-n/issues/196)
* **shebang:** add support for env's split-string option ([#195](https://github.com/eslint-community/eslint-plugin-n/issues/195)) ([b383b49](https://github.com/eslint-community/eslint-plugin-n/commit/b383b4971df4f4b67099655797b654b36d6a8fdf))
* Update ES Syntax ([#189](https://github.com/eslint-community/eslint-plugin-n/issues/189)) ([4778ae8](https://github.com/eslint-community/eslint-plugin-n/commit/4778ae86c398f90da13248c2d31bfc4a83cd2dea))


### Bug Fixes

* **no-unsupported-features:** Remove use of `static` as a variable ([#190](https://github.com/eslint-community/eslint-plugin-n/issues/190)) ([e31d868](https://github.com/eslint-community/eslint-plugin-n/commit/e31d8683b65a6f982cb91634f951afd0fe5583ae))


### Chores

* Enable global strict eslint rule ([#191](https://github.com/eslint-community/eslint-plugin-n/issues/191)) ([99fe387](https://github.com/eslint-community/eslint-plugin-n/commit/99fe38722d02de867f4bd8061a343b9754b62610))
* Migrate to manifest config ([#192](https://github.com/eslint-community/eslint-plugin-n/issues/192)) ([c8a87f3](https://github.com/eslint-community/eslint-plugin-n/commit/c8a87f3ef99348e547259f3939274cdf4da72b08))
