import type { RsbuildPlugin } from '@rsbuild/core'
import type { UserOptions } from './interface.js'
import { invalidateTypeCache, registerTS } from '@vue/compiler-sfc'
import ts from 'typescript'
import { transformTsx } from './transform.js'

registerTS(() => ts as any)
export function pluginRsbuildTsxResolveTypes(options: UserOptions = {}): RsbuildPlugin {
  return {
    name: 'rsbuild-plugin-tsx-resolve-types',
    setup(api) {
      const dependenciesMap = new Map<string, string[]>()

      api.transform({ test: /\.tsx$/ }, async ({ code, resourcePath, addDependency }) => {
        invalidateTypeCache(resourcePath)
        const oldDependenciesCache = dependenciesMap.get(resourcePath) ?? []
        oldDependenciesCache.forEach(invalidateTypeCache)
        const { dependencies = [], ...result } = transformTsx(code, resourcePath, options)
        dependenciesMap.set(resourcePath, dependencies)
        dependencies.forEach(addDependency)

        return result
      })
    },
  }
}
