import { ReactNode } from 'react'

export interface FetchError {
  message: string
  statusCode: number
}

export interface Action<T, P = unknown> {
  type: T
  payload?: P
}

export interface CustomAction<T, P, S = string> extends Action<T, P> {
  prop?: S
}

export interface QueryProps {
  query: string
  variables?: Record<
    string,
    string | number | Record<string, string | number | null>
  >
}

export interface QueryResponse<T> {
  data: T | null
  errors: FetchError[]
}

export type OmitTypeName<T> = Omit<T, '__typename'>

export interface AbstractContextContainerProps<T = Record<string, unknown>> {
  children: ReactNode
  initState?: T
}
