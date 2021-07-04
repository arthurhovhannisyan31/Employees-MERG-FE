// deps
import React from 'react'
// model
import {
  FieldsHandlers,
  FieldHandlerProps,
} from '_/containers/Auth/components/types'
import { FieldError } from '_/model/generated'

export const getFieldsHandlers = (
  handlers: FieldHandlerProps[],
): FieldsHandlers => {
  return handlers.reduce((acc: FieldsHandlers, [name, handler]) => {
    acc[name] = (event: React.ChangeEvent<HTMLInputElement>) =>
      handler(event.target.value)
    return acc
  }, {})
}

export const errorArrayToMap = (
  errors: FieldError[] = [],
): Record<string, string> => {
  return errors.reduce((acc: Record<string, string>, fieldError) => {
    acc[fieldError.field] = fieldError.message
    return acc
  }, {})
}
