import React, { ReactNode } from 'react'
import { MemoryRouter, Route } from 'react-router'

interface RouteWrapProps {
  path: string
  initialEntries: string[]
  children: ReactNode
}

export const routeWrap = ({
  children,
  initialEntries,
  path,
}: RouteWrapProps): JSX.Element => (
  <MemoryRouter initialEntries={initialEntries}>
    <Route path={path}>{children}</Route>
  </MemoryRouter>
)
