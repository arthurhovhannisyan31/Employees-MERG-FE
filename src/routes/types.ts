import { ComponentClass, FunctionComponent } from 'react'
import { RouteComponentProps, RouteProps } from 'react-router-dom'

import { RouteConfig } from 'model/routes/types'

export type CustomRoute = CustomRouteConfig & RouteProps

export type RouteComponent =
  | ComponentClass<RouteComponentProps<Record<string, string | undefined>>>
  | FunctionComponent<RouteComponentProps<Record<string, string | undefined>>>

export interface CustomRouteConfig extends RouteConfig {
  component: RouteComponent
}
