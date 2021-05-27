// model
import { ERouteName, ERoutePath, IRouteMap } from 'model/common'

export const ROUTES: IRouteMap = {
  [ERouteName.HOME]: {
    label: 'Home',
    url: ERoutePath.HOME,
  },
  [ERouteName.AUTH]: {
    label: 'Auth',
    url: `${ERoutePath.AUTH}/:next?`,
  },
  [ERouteName.ABOUT]: {
    label: 'About',
    url: ERoutePath.ABOUT,
  },
  [ERouteName.EMPLOYEES]: {
    label: 'Employees',
    url: ERoutePath.EMPLOYEES,
  },
  [ERouteName.EMPLOYEE]: {
    label: 'Employee',
    url: `${ERoutePath.EMPLOYEES}/:id`,
  },
  [ERouteName.NOT_FOUND]: {
    label: 'Not found',
    url: ERoutePath.NOT_FOUND,
  },
}

export const ADULT_AGE = 18
