# rsbuild-plugins

## Usage

Install:

```bash
npm add rsbuild-plugin-svg-sprites -D
```

Add plugin to your `rsbuild.config.ts`:

```typescript
// rsbuild.config.ts
import { defineConfig } from '@rsbuild/core'
import { pluginRsbuildSvgSprites } from 'rsbuild-plugin-svg-sprites'

export default defineConfig({
  plugins: [
    pluginRsbuildSvgSprites({
      path: 'src/assets/svg-icons',
      symbolId: 'icon-[name]',
    }),
  ],
})
```

## License

[MIT](./LICENSE).
