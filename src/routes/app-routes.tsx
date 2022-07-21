import { lazy } from 'react'

import { routes } from 'constants/routes'
import { routeMaker } from 'routes/helpers'

import { RouteName } from 'model/routes/configs'

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

const routesComponentMap: Record<RouteName, CustomRouteConfig['component']> = {
  [RouteName.HOME]: Home,
  [RouteName.ABOUT]: About,
  [RouteName.AUTH]: Auth,
  [RouteName.CHANGE_PASSWORD]: ChangePassword,
  [RouteName.EMPLOYEE]: Employee,
  [RouteName.EMPLOYEES]: Employees,
  [RouteName.NOT_FOUND]: NotFound,
}

export const routesConfig: CustomRouteConfig[] = Object.values(routes).map(
  (route) => ({
    ...route,
    component: routesComponentMap[route.key],
  }),
)

export default routesConfig.map(routeMaker)
