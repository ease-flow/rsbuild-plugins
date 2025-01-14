import type { UserOptions } from './interface.js'
import { findComponents } from './parser/index.js'
import { resolveEmits } from './resolves/emits.js'
import { resolveProps } from './resolves/props.js'
import { checkMergeDefaults } from './utils/check-merge-defaults.js'
import { createContext } from './utils/context.js'
import { generate } from './utils/genrate.js'

export function transformTsx(code: string, id: string, options: UserOptions = {}) {
  if (options.props === false && options.emits === false)
    return { dependencies: [], code }

  const { context, dependencies } = createContext(code, id)
  const expression = findComponents(context.ast)
  for (const callExpression of expression) {
    if (options.props !== false) {
      resolveProps(callExpression, context)
    }
    if (options.emits !== false) {
      resolveEmits(callExpression, context)
    }
  }
  checkMergeDefaults(context)
  const gen = generate(context.ast)

  return {
    code: gen.code,
    map: gen.map,
    dependencies,
  }
}
