# AGENTS.md — Coding Agent Instructions for token-bpmn-moddle

## Project Overview

This is a **moddle descriptor package** that defines token and process snapshot
namespace extensions for BPMN 2.0. The entire deliverable is a single JSON file
(`resources/token.json`). There is no runtime JavaScript source code — all `.js`
files are test infrastructure.

- **Language**: JavaScript (CommonJS), no TypeScript
- **Node.js version**: 22 (used in CI)
- **License**: MIT
- **Published artifact**: Only `resources/` is published to npm

## Build / Lint / Test Commands

```bash
# Full build (lint then test, sequentially)
npm run all

# Lint only (ESLint)
npm run lint

# Run all tests
npm test

# Run a single test file
npx mocha -r ./test/expect --reporter=spec "test/spec/xml/read.js"

# Run a single test by grep (matches `it()` or `describe()` text)
npx mocha -r ./test/expect --reporter=spec --grep "tokens with attributes" "test/**/*.js"

# Run tests in watch mode
npm run dev

# Check formatting (Prettier)
npm run pCheck

# Auto-fix formatting (Prettier)
npm run pWrite
```

### CI Pipeline

GitHub Actions (`.github/workflows/CI.yml`) runs on every push and PR:

1. `npm ci`
2. `npm run all` (lint + test)

There is no separate build/compile step — the project is a pure JSON descriptor.

## Project Structure

```
resources/
  token.json          # The moddle descriptor (the product)
test/
  expect.js           # Global test setup: chai + custom matchers
  helper.js           # Test helpers: readFile(), createModdle()
  matchers.js         # Custom chai matcher: jsonEqual
  xml-helper.js       # XML read/write/validate helpers
  fixtures/xml/       # BPMN XML fixtures for tests
  spec/
    ModdleSpec.js     # Schema and moddle integration tests
    xml/read.js       # XML deserialization tests
    xml/write.js      # XML serialization tests
    xml/roundtrip.js  # Import-then-export roundtrip tests
```

## Code Style Guidelines

### Formatting (Prettier)

Configured in `.prettierrc.json`: 2 spaces, CRLF line endings, double quotes,
semicolons always, trailing commas in multi-line structures.
Run `npm run pWrite` to auto-format. Run `npm run pCheck` to verify.

### Linting (ESLint 9 Flat Config)

Configured in `eslint.config.mjs`: extends `eslint-plugin-bpmn-io` recommended
rules + mocha rules (scoped to `test/**/*.js`) + `eslint-config-prettier`.
Node.js globals enabled only in test files.

### Module System & Declarations

- **CommonJS throughout** — use `require()` and `module.exports`
- Do NOT use ES module syntax (`import`/`export`) in `.js` files
- The only ESM file is `eslint.config.mjs` (required by ESLint 9)
- Every `.js` file must start with `"use strict";`
- Prefer `const` for new code; `var` exists in older files; `let` when reassignment is needed

### Import Patterns

```js
// Destructured require (preferred for named exports)
const { BpmnModdle } = require("bpmn-moddle");

// Plain require for default/single exports
var Helper = require("../../helper");

// Multi-binding with comma (used in existing code)
const readFile = require("../../helper").readFile,
  createModdle = require("../../helper").createModdle;
```

### Naming Conventions

- **Files**: camelCase for JS files (`ModdleSpec.js`), kebab-case for helpers (`xml-helper.js`)
- **Variables/functions**: camelCase (`createModdle`, `readFile`, `stripSpaces`)
- **Test descriptions**: lowercase sentence fragments in `describe`/`it` blocks
- **JSON descriptor types**: PascalCase (`BaseToken`, `ProcessSnapshot`)
- **JSON descriptor properties**: camelCase (`shouldExist`, `processSnapshot`)

### Test Patterns

- **Framework**: Mocha + Chai (BDD style with `describe`/`it`)
- **Assertions**: `expect` is a global (set up in `test/expect.js`)
- **Custom matcher**: `jsonEqual` — compares via JSON.stringify
- **Async tests**: Use `async function` with `await` (no callbacks for new tests)
- **Structure**: Follow **given / when / then** comments:

```js
it("tokens with attributes", async function () {
  // given
  const file = "token.part.bpmn";

  // when
  const { rootElement: process } = await fromFile(file, "bpmn:Process");

  // then
  expect(process).to.jsonEqual({
    /* ... */
  });
});
```

- **Test helpers**: Use `createModdle()` from `test/helper.js` to instantiate
  a `BpmnModdle` with the token descriptor pre-loaded
- **File reading**: Use `readFile()` from `test/helper.js` (synchronous)
- **Do NOT use arrow functions** for `describe`/`it` callbacks (Mocha binds `this`)

### Error Handling

- Tests do not use try/catch — let Mocha handle assertion errors naturally
- The moddle API (`fromXML`, `toXML`) returns Promises; use `await` and let
  rejections propagate as test failures

## The Moddle Descriptor (`resources/token.json`)

This is the core artifact. It defines three types with prefix `bt`:

| Type              | Extends                       | Properties                                 |
| ----------------- | ----------------------------- | ------------------------------------------ |
| `BaseToken`       | `bpmn:BaseElement`, `Element` | `shouldExist` (Boolean, default: true)     |
| `Token`           | `BaseToken`                   | `processSnapshot` (ref to ProcessSnapshot) |
| `ProcessSnapshot` | `BaseToken`                   | (none)                                     |

When modifying `token.json`:

- Maintain the moddle descriptor schema (name, uri, prefix, xml, associations, types, enumerations)
- Keep the URI as `http://tk/schema/1.0/bt` and prefix as `bt`
- Add corresponding read/write/roundtrip tests for any new types or properties
- Run `npm run all` to validate changes pass lint and tests

## Test Fixtures

BPMN XML fixtures live in `test/fixtures/xml/`:

- `*.part.bpmn` — partial BPMN fragments (single root element, no XML declaration)
- `roundtrip.bpmn` — full BPMN definitions document with diagrams

When adding fixtures, use `.part.bpmn` suffix for partial fragments that test
a single root element, and plain `.bpmn` for complete definitions documents.

## Dependencies

All dependencies are devDependencies (nothing is needed at runtime):

- `bpmn-moddle` — the moddle implementation being extended
- `chai` — assertion library
- `mocha` — test runner
- `eslint` + `eslint-plugin-bpmn-io` + `eslint-config-prettier` — linting
- `prettier` — code formatting
- `npm-run-all` — script orchestration (`run-s` for sequential)
