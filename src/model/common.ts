// TODO check
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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

export enum EROUTES {
  HOME = '',
  AUTH = 'auth',
  ABOUT = 'about',
  EMPLOYEES = 'employees',
  EMPLOYEE = 'employees',
  NOT_FOUND = '*',
}
