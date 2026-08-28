# Interaktiv Templates

[![npm](https://img.shields.io/npm/v/@interaktivgmbh/volto-templates)](https://www.npmjs.com/package/@interaktivgmbh/volto-templates)
[![Code analysis checks](https://github.com/interaktivgmbh/volto-templates/actions/workflows/code.yml/badge.svg)](https://github.com/interaktivgmbh/volto-templates/actions/workflows/code.yml)

The Volto add-on for [interaktiv.templates](https://github.com/interaktivgmbh/interaktiv.templates)

## Features

- Create reusable page templates either from scratch or based on existing Documents using a toolbar button
- When creating new Documents, available templates are automatically presented in a modal
- Templates support block restrictions to control which blocks users can add or modify
- Screenshot thumbnails are automatically generated for visual template preview
- Templates can be organized in containers for better structure and management

## Volto compatibility

You are reading the `17.x` branch (Volto 17), maintenance (bugfixes only).
Releases from this branch are versioned `1.1.x`; Volto 18 is served by `main` (`2.x`).

Note on version numbers: `1.0.0` was an early, unpublished Volto 18 tag.
The Volto 17 line starts at `1.1.0`, so `^1.1.0` resolves to Volto 17
compatible releases only.

The code in `TemplateAdd.jsx`, `TemplateEdit.jsx` and `customizations/volto/components/manage/Blocks/Block/Edit.jsx`
is derived from `@plone/volto@17.23.0`; custom changes are marked with
`volto-templates:` comments.

## Requirements

- Volto 17 (Yarn 3 project generated with `@plone/generator-volto`)
- Node 20
- The [interaktiv.templates](https://github.com/interaktivgmbh/interaktiv.templates)
  add-on installed on the Plone backend
- `de` and/or `en` in `config.settings.supportedLanguages` of your project
  (the add-on ships translations for both; with other languages the English
  default messages are used)

## Installation

### Option A: npm package (recommended once released)

Add `@interaktivgmbh/volto-templates` to your `package.json`:

```JSON
"addons": [
    "@interaktivgmbh/volto-templates"
],

"dependencies": {
    "@interaktivgmbh/volto-templates": "^1.1.0"
}
```

then run `yarn install`.

### Option B: source checkout inside a Volto 17 project

This repository is a pnpm monorepo. The add-on itself lives in
`packages/volto-templates`, the repository root is only a development workspace.
Therefore **installing via a Git URL** (`"@interaktivgmbh/volto-templates":
"git+https://…"`) **does not work with Yarn** (it fails with
`Assertion failed: Unsupported workflow`). Use a workspace checkout instead:

1. Clone the `17.x` branch into `src/addons/volto-templates`:

   ```bash
   git clone -b 17.x https://github.com/interaktivgmbh/volto-templates.git src/addons/volto-templates
   ```

   or add it to `mrs.developer.json` and run `yarn missdev`:

   ```JSON
   "volto-templates": {
     "package": "@interaktivgmbh/volto-templates",
     "url": "https://github.com/interaktivgmbh/volto-templates.git",
     "path": "packages/volto-templates/src",
     "branch": "17.x"
   }
   ```

2. Register the package folder as a workspace and add the add-on in
   `package.json`:

   ```JSON
   "workspaces": [
     "src/addons/volto-templates/packages/volto-templates"
   ],
   "addons": [
     "@interaktivgmbh/volto-templates"
   ],
   "dependencies": {
     "@interaktivgmbh/volto-templates": "workspace:*"
   }
   ```

3. Add the path mapping to `tsconfig.json` (or `jsconfig.json`) – note: no
   `/*` entry, Volto's add-on registry requires the plain path only:

   ```JSON
   "paths": {
     "@interaktivgmbh/volto-templates": [
       "addons/volto-templates/packages/volto-templates/src"
     ]
   }
   ```

4. `yarn install && yarn start`

## License

The project is licensed under the MIT license.

## Credits and acknowledgements 🙏

Generated using [Cookieplone (0.9.10)](https://github.com/plone/cookieplone) and [cookieplone-templates (96574af)](https://github.com/plone/cookieplone-templates/commit/96574af4136cae375cc74be36daed12df6ed6f82) on 2026-01-09 13:47:39.745815. A special thanks to all contributors and supporters!
