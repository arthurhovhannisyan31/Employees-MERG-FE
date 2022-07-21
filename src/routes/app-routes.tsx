import { lazy } from 'react'

import { routes } from 'constants/routes'
import { routeMaker } from 'routes/helpers'

import { RoutePath } from 'model/routes/configs'

import { CustomRouteConfig } from './types'

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

export const routesConfig: CustomRouteConfig[] = Object.values(routes).map(
  (route) => ({
    ...route,
    component: routesComponentMap[route.basePath],
  }),
)

export default routesConfig.map(routeMaker)
