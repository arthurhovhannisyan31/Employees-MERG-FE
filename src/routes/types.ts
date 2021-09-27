import React from 'react'
import { RouteComponentProps, RouteProps } from 'react-router-dom'

export interface IRoute extends RouteProps {
  exact?: boolean
  isPrivate?: boolean
  path: string
  component:
    | React.ComponentClass<RouteComponentProps<Partial<Record<string, string>>>>
    | React.FunctionComponent<
        RouteComponentProps<Partial<Record<string, string>>>
      >
}
