// deps
import { ChangeEvent } from 'react'

export type FieldHandlerProps = [name: string, handler: (val: string) => void]

export type FieldsHandlers = Record<
  string,
  (event: ChangeEvent<HTMLInputElement>) => void
>
