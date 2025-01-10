import type { UserOptions } from './interface.js'
import { findComponents } from './parser/index.js'
import { resolveEmits } from './resolves/emits.js'
import { resolveProps } from './resolves/props.js'
import { checkMergeDefaults } from './utils/check-merge-defaults.js'
import { createContext } from './utils/context.js'
import { generate } from './utils/genrate.js'

export function transform(code: string, id: string, options: UserOptions = {}) {
  if (options.props === false && options.emits === false)
    return code

  const ctx = createContext(code, id)
  const expression = findComponents(ctx.ast)
  for (const callExpression of expression) {
    if (options.props !== false) {
      resolveProps(callExpression, ctx)
    }
    if (options.emits !== false) {
      resolveEmits(callExpression, ctx)
    }
  }
  checkMergeDefaults(ctx)
  const gen = generate(ctx.ast)
  return {
    code: gen.code,
    map: gen.map,
  }
}
