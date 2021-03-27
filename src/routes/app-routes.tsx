// deps
import React from 'react'
import { RouteProps, RouteComponentProps } from 'react-router-dom'
// helpers
import { routeMaker } from '_/routes/helpers'
import { ROUTES } from '_/utils/constants'

const Home = React.lazy(() => import('_/containers/Home'))
const About = React.lazy(() => import('_/containers/About'))
const Auth = React.lazy(() => import('_/containers/Auth'))
const NotFound = React.lazy(() => import('_/containers/NotFound'))
const Employees = React.lazy(() => import('_/containers/Employees'))
const Employee = React.lazy(() => import('_/containers/Employee'))

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
