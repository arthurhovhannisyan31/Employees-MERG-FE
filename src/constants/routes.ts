// model
import { RouteName, RoutePath, RouteMap } from 'model/common'

export const ROUTES: RouteMap = {
  [RouteName.HOME]: {
    label: 'Home',
    url: RoutePath.HOME,
  },
  [RouteName.AUTH]: {
    label: 'Auth',
    url: RoutePath.AUTH,
  },
  [RouteName.CHANGE_PASSWORD]: {
    label: 'Change password',
    url: RoutePath.CHANGE_PASSWORD,
  },
  [RouteName.ABOUT]: {
    label: 'About',
    url: RoutePath.ABOUT,
  },
  [RouteName.EMPLOYEES]: {
    label: 'Employees',
    url: RoutePath.EMPLOYEES,
  },
  [RouteName.EMPLOYEE]: {
    label: 'Employee',
    url: RoutePath.EMPLOYEES,
  },
  [RouteName.NOT_FOUND]: {
    label: 'Not found',
    url: RoutePath.NOT_FOUND,
  },
}
