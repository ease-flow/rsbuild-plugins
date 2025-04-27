# tsx-resolve-types

Rsbuild Plugin for parser vue3-tsx types & hmr unsupported.

## Usage

Install:

```bash
pnpm add rsbuild-plugin-tsx-resolve-types -D
```

Add plugin to your `rsbuild.config.ts`:

```ts
// rsbuild.config.ts
import { pluginRsbuildTsxResolveTypes } from 'rsbuild-plugin-tsx-resolve-types'

export default {
  plugins: [pluginRsbuildTsxResolveTypes()],
}
```

## Example

See [vite-plugin-tsx-resolve-types](https://www.npmjs.com/package/vite-plugin-tsx-resolve-types) Example

## License

[MIT](./LICENSE).
