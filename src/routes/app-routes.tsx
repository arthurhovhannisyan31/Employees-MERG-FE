import { lazy } from 'react'

import { ROUTES } from 'constants/routes'
import { routeMaker } from 'routes/helpers'

import { RoutePath } from 'model/common'

import { CustomRoute, CustomRouteConfig } from './types'

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

const routesComponentMap: Record<RoutePath, CustomRouteConfig['component']> = {
  [RoutePath.HOME]: Home,
  [RoutePath.ABOUT]: About,
  [RoutePath.AUTH]: Auth,
  [RoutePath.CHANGE_PASSWORD]: ChangePassword,
  [RoutePath.EMPLOYEE]: Employee,
  [RoutePath.EMPLOYEES]: Employees,
  [RoutePath.NOT_FOUND]: NotFound,
}

export const routes: CustomRoute[] = [
  {
    exact: true,
    isPrivate: true,
    path: ROUTES.HOME.url,
    basePath: ROUTES.HOME.url,
    label: ROUTES.HOME.label,
  },
  {
    exact: true,
    isPrivate: false,
    path: ROUTES.ABOUT.url,
    basePath: ROUTES.ABOUT.url,
    label: ROUTES.ABOUT.label,
  },
  {
    exact: false,
    isPrivate: false,
    path: `${ROUTES.AUTH.url}/:next?`,
    basePath: ROUTES.AUTH.url,
    label: ROUTES.AUTH.label,
  },
  {
    exact: false,
    isPrivate: false,
    path: `${ROUTES.CHANGE_PASSWORD.url}/:id`,
    basePath: ROUTES.CHANGE_PASSWORD.url,
    label: ROUTES.CHANGE_PASSWORD.label,
  },
  {
    exact: true,
    isPrivate: true,
    path: `${ROUTES.EMPLOYEE.url}/:id`,
    basePath: ROUTES.EMPLOYEE.url,
    label: ROUTES.EMPLOYEE.label,
  },
  {
    exact: true,
    isPrivate: true,
    path: ROUTES.EMPLOYEES.url,
    basePath: ROUTES.EMPLOYEES.url,
    label: ROUTES.EMPLOYEES.label,
  },
  {
    exact: true,
    isPrivate: true,
    path: ROUTES.NOT_FOUND.url,
    basePath: ROUTES.NOT_FOUND.url,
    label: ROUTES.NOT_FOUND.label,
  },
]

export const routesConfig: CustomRouteConfig[] = routes.map((route) => ({
  ...route,
  component: routesComponentMap[route.basePath],
}))

export default routesConfig.map(routeMaker)
