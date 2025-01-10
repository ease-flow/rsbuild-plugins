import type { CallExpression } from '@babel/types'
import type { AST } from '../interface.js'
import { isCallExpression } from '@babel/types'
import { traverse } from '../utils/traverse.js'

function checkIsDefineComponent(node: CallExpression) {
  return isCallExpression(node) && node.callee && (node as any).callee?.name === 'defineComponent'
}
export function findComponents(ast: AST) {
  const componentsAst: CallExpression[] = []
  traverse(ast, {
    CallExpression({ node }) {
      if (checkIsDefineComponent(node))
        componentsAst.push(node)
    },
  })
  return componentsAst
}
