import type { AST } from '../interface.js'
import { parse } from '@babel/parser'

export function createAst(code: string, jsx = true): AST {
  if (!jsx) {
    return parse(code, {
      sourceType: 'module',
      plugins: ['typescript'],
    })
  }
  return parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  })
}
