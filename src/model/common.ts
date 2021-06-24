export interface FetchError {
  message: string
  statusCode: number
}

export interface Action<T> {
  type: string
  prop?: string
  payload: T
}

export interface QueryProps {
  query: string
  variables?: Record<
    string,
    string | number | Record<string, string | number | null>
  >
}

export enum RouteName {
  HOME = 'HOME',
  AUTH = 'AUTH',
  ABOUT = 'ABOUT',
  EMPLOYEES = 'EMPLOYEES',
  EMPLOYEE = 'EMPLOYEE',
  NOT_FOUND = 'NOT_FOUND',
}

export enum RoutePath {
  HOME = '/',
  AUTH = '/auth',
  ABOUT = '/about',
  EMPLOYEES = '/employees',
  EMPLOYEE = '/employees',
  NOT_FOUND = '*',
}

export type RouteMapItem = Record<'url' | 'label', string>
export type RouteMap = Record<RouteName, RouteMapItem>

export interface QueryResponse<T> {
  data: T | null
  errors: FetchError[]
}

export type OmitTypeName<T> = Omit<T, '__typename'>
