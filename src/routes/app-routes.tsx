import { lazy } from 'react'

import { routeMaker } from 'routes/helpers'
import { ROUTES } from 'utils/constants'

import { IRoute } from './types'

const Home = lazy(() => import('containers/Home'))
const About = lazy(() => import('containers/About'))
const Auth = lazy(() => import('containers/Auth'))
const NotFound = lazy(() => import('containers/NotFound'))
const Employees = lazy(() => import('containers/Employees'))
const Employee = lazy(() => import('containers/Employee'))

const routes: IRoute[] = [
  {
    exact: true,
    isPrivate: false,
    path: CONSTANTS.ROUTES.HOME.url,
    label: CONSTANTS.ROUTES.HOME.label,
    component: Home,
  },
  {
    exact: true,
    isPrivate: false,
    path: CONSTANTS.ROUTES.ABOUT.url,
    label: CONSTANTS.ROUTES.ABOUT.label,
    component: About,
  },
  {
    exact: false,
    isPrivate: false,
    path: CONSTANTS.ROUTES.AUTH.url,
    label: CONSTANTS.ROUTES.AUTH.label,
    component: Auth,
  },
  {
    exact: true,
    isPrivate: true,
    path: CONSTANTS.ROUTES.EMPLOYEE.url,
    label: CONSTANTS.ROUTES.EMPLOYEE.label,
    component: Employee,
  },
  {
    exact: true,
    isPrivate: true,
    path: CONSTANTS.ROUTES.EMPLOYEES.url,
    label: CONSTANTS.ROUTES.EMPLOYEES.label,
    component: Employees,
  },
  {
    exact: true,
    isPrivate: true,
    path: CONSTANTS.ROUTES.NOT_FOUND.url,
    label: CONSTANTS.ROUTES.NOT_FOUND.label,
    component: NotFound,
  },
]

export default routes.map(routeMaker)
