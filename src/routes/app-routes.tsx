import { lazy } from 'react'

import { ROUTES } from 'constants/routes'
import { routeMaker } from 'routes/helpers'

import { CustomRoute } from './types'

const Home = lazy(() => import(/* webpackPrefetch: true */ 'containers/Home'))
const About = lazy(() => import(/* webpackPrefetch: true */ 'containers/About'))
// eslint-disable-next-line import/no-cycle
const Auth = lazy(() => import(/* webpackPrefetch: true */ 'containers/Auth'))
const NotFound = lazy(
  () => import(/* webpackPrefetch: true */ 'containers/NotFound'),
)
const Employees = lazy(
  () => import(/* webpackPrefetch: true */ 'containers/Employees'),
)
const Employee = lazy(
  () => import(/* webpackPrefetch: true */ 'containers/Employee'),
)
const ChangePassword = lazy(
  () => import(/* webpackPrefetch: true */ 'containers/ChangePassword'),
)

export const routes: CustomRoute[] = [
  {
    exact: true,
    isPrivate: true,
    path: ROUTES.HOME.url,
    basePath: ROUTES.HOME.url,
    label: ROUTES.HOME.label,
    component: Home,
  },
  {
    exact: true,
    isPrivate: false,
    path: ROUTES.ABOUT.url,
    basePath: ROUTES.ABOUT.url,
    label: ROUTES.ABOUT.label,
    component: About,
  },
  {
    exact: false,
    isPrivate: false,
    path: `${ROUTES.AUTH.url}/:next?`,
    basePath: ROUTES.AUTH.url,
    label: ROUTES.AUTH.label,
    component: Auth,
  },
  {
    exact: false,
    isPrivate: false,
    path: `${ROUTES.CHANGE_PASSWORD.url}/:id`,
    basePath: ROUTES.CHANGE_PASSWORD.url,
    label: ROUTES.CHANGE_PASSWORD.label,
    component: ChangePassword,
  },
  {
    exact: true,
    isPrivate: true,
    path: `${ROUTES.EMPLOYEE.url}/:id`,
    basePath: ROUTES.EMPLOYEE.url,
    label: ROUTES.EMPLOYEE.label,
    component: Employee,
  },
  {
    exact: true,
    isPrivate: true,
    path: ROUTES.EMPLOYEES.url,
    basePath: ROUTES.EMPLOYEES.url,
    label: ROUTES.EMPLOYEES.label,
    component: Employees,
  },
  {
    exact: true,
    isPrivate: true,
    path: ROUTES.NOT_FOUND.url,
    basePath: ROUTES.NOT_FOUND.url,
    label: ROUTES.NOT_FOUND.label,
    component: NotFound,
  },
]

export default routes.map(routeMaker)
