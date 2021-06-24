// deps
import React from 'react'

export type FieldHandlerProps = [name: string, handler: (val: string) => void]

export type FieldsHandlers = Record<
  string,
  (event: React.ChangeEvent<HTMLInputElement>) => void
>
