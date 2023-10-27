# Galias

Write aliases using glob patterns and variables.

## Current state

This project is in a very early stage. Any feedback is welcome.

A vite-plugin is available at this moment.

Next steps:

- [ ] Add documentation
- [ ] Add examples
- [ ] Add support for other bundlers (unplugin ?)

## Installation

```bash
npm i -D vite-plugin-galias
```

```bash
yarn add -d vite-plugin-galias
```

```bash
pnpm i -D vite-plugin-galias
```

## Usage

### With vite

```ts
// vite.config.ts
import { defineConfig } from "vite";
import galias from "vite-plugin-galias";
import {
  TSConfigAdapter /** JSConfigAdapter */,
} from "vite-plugin-galias/adapters";

export default defineConfig({
  plugins: [
    galias({
      adapters: [
        new TSConfigAdapter({
          source: "tsconfig.base.json",
          output: "tsconfig.json",
        }),
      ],
      rootDir: "./src",
      prefix: "#",
      exclude: ["**/*.test.ts"],
      galiases: {
        "my-alias": "some/folder/file.ts",
        "{{component}}": "components/{{component}}/index.{tsx,jsx}",
        "{{domain}}/{{usecase}}": {
            search: "{{domain}}/**/usecases/{{usecase}}/{{usecase}}.usecase.ts",
            exclude: ["**/*.spec.ts"]
        }
        "{{domain}}/{{usecase}}/{{boundary}}": {
          search: "{{domain}}/**/boundaries/{{usecase}}/*.{{boundary}}.ts",
          prefix: "$",
          exclude: ["**/create/*.ts"],
        },
      },
    }),
  ],
});
```
