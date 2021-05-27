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
    path: ROUTES.HOME.url,
    label: ROUTES.HOME.label,
    component: Home,
  },
  {
    exact: true,
    isPrivate: false,
    path: ROUTES.ABOUT.url,
    label: ROUTES.ABOUT.label,
    component: About,
  },
  {
    exact: false,
    isPrivate: false,
    path: ROUTES.AUTH.url,
    label: ROUTES.AUTH.label,
    component: Auth,
  },
  {
    exact: true,
    isPrivate: true,
    path: ROUTES.EMPLOYEE.url,
    label: ROUTES.EMPLOYEE.label,
    component: Employee,
  },
  {
    exact: true,
    isPrivate: true,
    path: ROUTES.EMPLOYEES.url,
    label: ROUTES.EMPLOYEES.label,
    component: Employees,
  },
  {
    exact: true,
    isPrivate: true,
    path: ROUTES.NOT_FOUND.url,
    label: ROUTES.NOT_FOUND.label,
    component: NotFound,
  },
]

export default routes.map(routeMaker)
