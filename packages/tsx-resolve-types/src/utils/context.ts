import type { SimpleTypeResolveContext } from '@vue/compiler-sfc'
import type { AST } from '../interface.js'
import fs from 'node:fs'
import { createAst } from './ast.js'

export interface CreateContextType {
  ctx: SimpleTypeResolveContext
  ast: AST
  source: string
  filepath: string
  importMergeDefaults?: boolean
}

export function createContext(code: string, id: string) {
  const ast = createAst(code)
  const helper = new Set<string>()
  const dependencies: string[] = []
  const context: CreateContextType = {
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
      options: {
        fs: {
          fileExists(_file: string): boolean {
            // 检查文件是否存在
            try {
              const stat = fs.statSync(_file)
              if (stat.isFile()) {
                if (!(/node_modules/.test(_file)) && _file.endsWith('.ts')) {
                  dependencies.push(_file)

                  // if (map.get(id)) {
                  //   const array = map.get(id)
                  //   array?.push(_file)
                  //   map.set(id, [...new Set(array || [])])
                  // }
                  // else {
                  //   map.set(id, [_file])
                  // }
                }

                return true
              }
              return false
            }
            // eslint-disable-next-line unused-imports/no-unused-vars
            catch (e) {
              return false
            }
          },
          readFile(_file: string): string | undefined {
            return fs.readFileSync(_file, 'utf-8')
          },
        },
      },
    },
  }

  return { context, dependencies }
}
