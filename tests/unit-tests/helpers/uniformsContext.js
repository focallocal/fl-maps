import { randomIds } from 'uniforms'

import createSchema from './uniformsSchema'

const randomId = randomIds()

const createContext = (schema, context) => ({
  context: {
    uniforms: {
      error: null,
      model: {},
      name: [],
      onChange () {},

      ...context,

      randomId,
      schema: createSchema(schema),
      state: {
        changedMap: {},

        changed: false,
        disabled: false,
        label: false,
        placeholder: false,
        showInlineError: false,

        ...context && context.state
      }
    }
  }
})

export default createContext
