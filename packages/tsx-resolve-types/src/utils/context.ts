import type { SimpleTypeResolveContext } from '@vue/compiler-sfc'
import type { AST } from '../interface.js'
import { createAst } from './ast.js'

export interface CreateContextType {
  ctx: SimpleTypeResolveContext
  ast: AST
  source: string
  filepath: string
  importMergeDefaults?: boolean
}

export function createContext(code: string, id: string): CreateContextType {
  const ast = createAst(code)
  const helper = new Set<string>()
  return {
    ast,
    filepath: id,
    source: code,
    importMergeDefaults: false,
    ctx: {
      filename: id,
      source: code,
      ast: ast.program.body,
      error(msg) {
        throw new Error(`[tsx-resolve-types] ${msg}`)
      },
      helper(key) {
        helper.add(key)
        return `_${key}`
      },
      getString(node) {
        return code.slice(node.start!, node.end!)
      },
      propsTypeDecl: undefined,
      propsRuntimeDefaults: undefined,
      propsDestructuredBindings: Object.create(null),
      emitsTypeDecl: undefined,
      isCE: false,
      options: {},
    },
  }
}
