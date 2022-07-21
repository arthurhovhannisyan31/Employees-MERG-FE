export interface FetchError {
  message: string
  statusCode: number
}

export interface Action<P, T = string> {
  type: T
  prop?: string
  payload: P
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
