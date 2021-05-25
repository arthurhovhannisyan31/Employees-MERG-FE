// deps
import React from 'react'
import { RouteComponentProps, RouteProps } from 'react-router-dom'
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
  component:
    | React.ComponentClass<RouteComponentProps<Record<string, never>>>
    | React.FunctionComponent<RouteComponentProps<Record<string, never>>>
}

const routes: IRoute[] = [
  {
    exact: true,
    isPrivate: false,
    path: ROUTES.HOME,
    component: Home,
  },
  {
    exact: true,
    isPrivate: false,
    path: ROUTES.ABOUT,
    component: About,
  },
  {
    exact: false,
    isPrivate: false,
    path: ROUTES.AUTH,
    component: Auth,
  },
  {
    exact: true,
    isPrivate: true,
    path: ROUTES.EMPLOYEE,
    component: Employee,
  },
  {
    exact: true,
    isPrivate: true,
    path: ROUTES.EMPLOYEES,
    component: Employees,
  },
  {
    exact: true,
    isPrivate: true,
    path: ROUTES.NOT_FOUND,
    component: NotFound,
  },
]

export default routes.map(routeMaker)
