# rsbuild-plugins

## Usage

Install:

```bash
npm add rsbuild-plugin-svg-icon -D
```

Add plugin to your `rsbuild.config.ts`:

```typescript
// rsbuild.config.ts
import { defineConfig } from '@rsbuild/core'
import { pluginRsbuildSvgIcons } from 'rsbuild-plugin-svg-icon'

export default defineConfig({
  plugins: [
    pluginRsbuildSvgIcons({
      path: 'src/assets/svg-icon',
      symbolId: 'icon-[name]',
    }),
  ],
})
```

## License

[MIT](./LICENSE).
