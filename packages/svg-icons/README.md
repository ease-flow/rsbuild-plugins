# rsbuild-plugins

## Usage

Install:

```bash
npm add rsbuild-plugin-svg-icons -D
```

Add plugin to your `rsbuild.config.ts`:

```typescript
// rsbuild.config.ts
import { defineConfig } from '@rsbuild/core'
import { pluginRsbuildSvgIcons } from 'rsbuild-plugin-svg-icons'

export default defineConfig({
  plugins: [
    pluginRsbuildSvgIcons({
      path: 'src/assets/svg-icons',
      symbolId: 'icon-[name]',
    }),
  ],
})
```