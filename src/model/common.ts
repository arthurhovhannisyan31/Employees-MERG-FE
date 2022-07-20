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

export enum RouteName {
  HOME = 'HOME',
  AUTH = 'AUTH',
  ABOUT = 'ABOUT',
  EMPLOYEES = 'EMPLOYEES',
  EMPLOYEE = 'EMPLOYEE',
  NOT_FOUND = 'NOT_FOUND',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
}

export const routeNameLabelMap: Record<RouteName, string> = {
  [RouteName.HOME]: 'Home',
  [RouteName.AUTH]: 'Auth',
  [RouteName.ABOUT]: 'About',
  [RouteName.EMPLOYEES]: 'Employees',
  [RouteName.EMPLOYEE]: 'Employee',
  [RouteName.NOT_FOUND]: 'Not found',
  [RouteName.CHANGE_PASSWORD]: 'Change password',
}

export enum RoutePath {
  HOME = '/',
  AUTH = '/auth',
  ABOUT = '/about',
  EMPLOYEES = '/employees',
  EMPLOYEE = '/employees',
  NOT_FOUND = '*',
  CHANGE_PASSWORD = '/change-password',
}

export interface RouteMapItem {
  url: RoutePath
  label: string
}
export type RouteMap = Record<RouteName, RouteMapItem>

export interface QueryResponse<T> {
  data: T | null
  errors: FetchError[]
}

export type OmitTypeName<T> = Omit<T, '__typename'>
