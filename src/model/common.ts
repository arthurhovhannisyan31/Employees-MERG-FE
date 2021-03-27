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

export enum ERoutes {
  HOME = 'HOME',
  AUTH = 'AUTH',
  ABOUT = 'ABOUT',
  EMPLOYEES = 'EMPLOYEES',
  EMPLOYEE = 'EMPLOYEE',
  NOT_FOUND = 'NOT_FOUND',
}

export type IRouteMapItem = Record<'url' | 'label', string>
export type IRouteMap = Record<ERoutes, IRouteMapItem>

export interface IQueryResponse<T> {
  data: T | null
  errors: IFetchError[]
}

export type OmitTypeName<T> = Omit<T, '__typename'>

export enum ERoutesPaths {
  HOME = '',
  AUTH = 'auth',
  ABOUT = 'about',
  EMPLOYEES = 'employees',
  EMPLOYEE = 'employees',
  NOT_FOUND = '*',
}
