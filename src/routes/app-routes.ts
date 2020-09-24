// deps
import React from 'react'
import { RouteProps } from 'react-router-dom'
import { routeMaker } from '_/routes/helpers'
// local
import CONSTANTS from '_/utils/constants'

const Home = React.lazy(() => import('_/pages/Home'))
const About = React.lazy(() => import('_/pages/About'))
const Auth = React.lazy(() => import('_/pages/Auth'))
const Events = React.lazy(() => import('_/pages/Events'))
const Bookings = React.lazy(() => import('_/pages/Bookings'))
const NotFound = React.lazy(() => import('_/pages/NotFound'))

export interface IRoute extends RouteProps {
  exact: boolean
  isPrivate: boolean
  path: string
  component: any
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
    isPrivate: false,
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
    isPrivate: false,
    path: CONSTANTS.ROUTES.EVENTS,
    component: Events,
  },
  {
    exact: true,
    isPrivate: true,
    path: CONSTANTS.ROUTES.BOOKINGS,
    component: Bookings,
  },
  {
    exact: true,
    isPrivate: false,
    path: CONSTANTS.ROUTES.NOT_FOUND,
    component: NotFound,
  },
]

export default routes.map(routeMaker)
