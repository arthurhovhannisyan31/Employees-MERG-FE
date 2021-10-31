import { ComponentClass, FunctionComponent, ReactNode } from 'react'
import { RouteComponentProps, RouteProps } from 'react-router-dom'

import { RoutePath } from 'model/common'

export interface CustomRoute extends RouteProps {
  exact?: boolean
  isPrivate?: boolean
  path: string
  basePath: RoutePath
  label: string
  icon?: ReactNode
  component:
    | ComponentClass<RouteComponentProps<Record<string, string | undefined>>>
    | FunctionComponent<RouteComponentProps<Record<string, string | undefined>>>
}
