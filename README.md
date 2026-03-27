# calebjoshuapaul.github.io

Portfolio site built with React + Vite + Three.js.

## Tooling

- Package manager/runtime: `bun`
- Lint/format: `biome`
- Build tool: `vite`
- Language mode: JavaScript + TypeScript coexistence (`allowJs`)

## Setup

```bash
bun install
```

## Scripts

```bash
bun run dev
bun run build
bun run preview
bun run lint
bun run format
```

## Migration notes

- ESLint was removed in favor of Biome.
- TypeScript support is enabled without forcing full conversion.
- Existing `.js/.jsx` files continue to work while new code can be added as `.ts/.tsx`.
