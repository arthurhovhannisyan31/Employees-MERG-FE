export interface IModule extends NodeModule {
  hot: {
    accept: (str: string, node: () => void) => void
  }
}

export interface IFetchError {
  message: string
  statusCode: number
}

export interface IAction<T> {
  type: string
  prop?: string
  payload: T
}

export interface IQueryProps {
  query: string
  variables?: Record<
    string,
    string | number | Record<string, string | number | null>
  >
}

export interface IQueryResponse<T> {
  data: T | null
  errors: IFetchError[]
}

export type OmitTypeName<T> = Omit<T, '__typename'>
