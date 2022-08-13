export enum RouteName {
  HOME = 'HOME',
  AUTH = 'AUTH',
  ABOUT = 'ABOUT',
  EMPLOYEES = 'EMPLOYEES',
  EMPLOYEE = 'EMPLOYEE',
  NOT_FOUND = 'NOT_FOUND',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
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

export const routeNameLabelMap: Record<RouteName, string> = {
  [RouteName.HOME]: 'Home',
  [RouteName.AUTH]: 'Auth',
  [RouteName.ABOUT]: 'About',
  [RouteName.EMPLOYEES]: 'Employees',
  [RouteName.EMPLOYEE]: 'Employee',
  [RouteName.NOT_FOUND]: 'Not found',
  [RouteName.CHANGE_PASSWORD]: 'Change password',
}
