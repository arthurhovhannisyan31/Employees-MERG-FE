// model
import { ERoutes, IRouteMap } from 'model/common'
import { ERoutesPaths } from 'model/common'

export const ROUTES: IRouteMap = {
  [ERoutes.HOME]: {
    label: 'Home',
    url: '/',
  },
  [ERoutes.AUTH]: {
    label: 'Auth',
    url: '/auth',
  },
  [ERoutes.ABOUT]: {
    label: 'About',
    url: '/about',
  },
  [ERoutes.EMPLOYEES]: {
    label: 'Employees',
    url: '/employees',
  },
  [ERoutes.EMPLOYEE]: {
    label: 'Employee',
    url: '/employees/:id',
  },
  [ERoutes.NOT_FOUND]: {
    label: 'Not found',
    url: '*',
  },
}

const CONSTANTS = { ROUTES }

export default CONSTANTS

export const ADULT_AGE = 18

export const ROUTES: Record<keyof typeof EROUTES, string> = {
  HOME: '/',
  AUTH: `/${EROUTES.AUTH}/:next?`,
  ABOUT: `/${EROUTES.ABOUT}`,
  EMPLOYEES: `/${EROUTES.EMPLOYEES}`,
  EMPLOYEE: `/${EROUTES.EMPLOYEE}/:id`,
  NOT_FOUND: EROUTES.NOT_FOUND,
}
