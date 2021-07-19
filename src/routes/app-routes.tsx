// deps
import React, { lazy } from 'react'
import { RouteProps, RouteComponentProps } from 'react-router-dom'
// helpers
import { routeMaker } from '_/routes/helpers'
import { ROUTES } from '_/constants/routes'
import { RoutePath } from '_/model/common'

const Home = lazy(() => import('_/containers/Home'))
const About = lazy(() => import('_/containers/About'))
const Auth = lazy(() => import('_/containers/Auth'))
const NotFound = lazy(() => import('_/containers/NotFound'))
const Employees = lazy(() => import('_/containers/Employees'))
const Employee = lazy(() => import('_/containers/Employee'))
const ChangePassword = lazy(() => import('_/containers/ChangePassword'))

export interface CustomRoute extends RouteProps {
  exact?: boolean
  isPrivate?: boolean
  path: string
  basePath: RoutePath
  label: string
  icon?: React.ReactNode
  component:
    | React.ComponentClass<
        RouteComponentProps<Record<string, string | undefined>>
      >
    | React.FunctionComponent<
        RouteComponentProps<Record<string, string | undefined>>
      >
}

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
