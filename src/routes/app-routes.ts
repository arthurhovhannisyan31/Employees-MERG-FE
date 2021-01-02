// deps
import React from 'react'
import {
  RouteProps,
} from 'react-router-dom'
// helpers
import {
  routeMaker,
} from '_/routes/helpers'
import CONSTANTS from '_/utils/constants'

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
  component: React.ComponentClass | React.FunctionComponent
}

const routes: IRoute[] = [
  {
    exact: true,
    isPrivate: true,
    path: CONSTANTS.ROUTES.HOME,
    component: Home,
  },
  {
    exact: true,
    isPrivate: true,
    path: CONSTANTS.ROUTES.ABOUT,
    component: About,
  },
  {
    exact: true,
    isPrivate: false,
    path: CONSTANTS.ROUTES.AUTH,
    component: Auth,
  },
  {
    exact: true,
    isPrivate: true,
    path: CONSTANTS.ROUTES.EMPLOYEE,
    component: Employee,
  },
  {
    exact: true,
    isPrivate: true,
    path: CONSTANTS.ROUTES.EMPLOYEES,
    component: Employees,
  },
  {
    exact: true,
    isPrivate: true,
    path: CONSTANTS.ROUTES.NOT_FOUND,
    component: NotFound,
  },
]

export default routes.map(routeMaker)
