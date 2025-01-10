import type { RsbuildPlugin } from '@rsbuild/core'
import type { UserOptions } from './interface.js'
import { registerTS } from '@vue/compiler-sfc'
import ts from 'typescript'
import { transform } from './transform.js'

registerTS(() => ts as any)
export function pluginRsbuildTsxResolveTypes(options: UserOptions = {}): RsbuildPlugin {
  return {
    name: 'rsbuild-plugin-tsx-resolve-types',
    setup(api) {
      api.transform({ test: /\.(tsx|ts)$/ }, ({ code, resourcePath }) => {
        // TODO: return后并未替换rsbuild在dev-server缓存中的code
        return transform(code, resourcePath, options)
      })
    },
  }
}
