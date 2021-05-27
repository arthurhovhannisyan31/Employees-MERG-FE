// deps
import React, { lazy } from 'react'
import { RouteProps, RouteComponentProps } from 'react-router-dom'
// helpers
import { routeMaker } from '_/routes/helpers'
import { ROUTES } from '_/utils/constants'

const Home = lazy(() => import('_/containers/Home'))
const About = lazy(() => import('_/containers/About'))
const Auth = lazy(() => import('_/containers/Auth'))
const NotFound = lazy(() => import('_/containers/NotFound'))
const Employees = lazy(() => import('_/containers/Employees'))
const Employee = lazy(() => import('_/containers/Employee'))

export interface IRoute extends RouteProps {
  exact?: boolean
  isPrivate?: boolean
  path: string
  label: string
  icon?: React.ReactNode
  component:
    | React.ComponentClass<RouteComponentProps<Record<string, never>>>
    | React.FunctionComponent<RouteComponentProps<Record<string, never>>>
}

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
