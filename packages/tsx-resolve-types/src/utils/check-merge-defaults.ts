import type { CreateContextType } from './context.js'
import { createAst } from './ast.js'
import { traverse } from './traverse.js'

export function checkMergeDefaults(ctx: CreateContextType) {
  if (!ctx.importMergeDefaults)
    return

  /**
   * 判断是否存在导入了
   */
  let hasImportVue = false
  traverse(ctx.ast, {
    ImportDeclaration(path) {
      if (path.node.source.value === 'vue') {
        const node = path.node.specifiers.find((v) => {
          return v.local.name === '_mergeDefaults'
        })
        if (node)
          hasImportVue = true
      }
    },
  })
  if (!hasImportVue) {
    const myAst = createAst(`import { mergeDefaults as  _mergeDefaults } from 'vue'`, false)
    ctx.ast.program.body.unshift(
      ...myAst.program.body,
    )
  }
}
