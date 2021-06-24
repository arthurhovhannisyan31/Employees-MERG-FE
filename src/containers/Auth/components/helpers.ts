// deps
import React from 'react'
// model
import {
  FieldsHandlers,
  FieldHandlerProps,
} from '_/containers/Auth/components/types'

export const getFieldsHandlers = (
  handlers: FieldHandlerProps[],
): FieldsHandlers => {
  return handlers.reduce((acc: FieldsHandlers, [name, handler]) => {
    acc[name] = (event: React.ChangeEvent<HTMLInputElement>) =>
      handler(event.target.value)
    return acc
  }, {})
}
