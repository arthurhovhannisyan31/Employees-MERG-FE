import React, { FC } from 'react'
import { Route } from 'react-router-dom'

import PrivateRoute from 'routes/private-route'
import { CustomRoute } from 'routes/types'

import { RouteMap } from 'model/routes/types'

export const routeMaker: FC<CustomRoute> = (params) =>
  params.isPrivate ? (
    <PrivateRoute
      key={params.key}
      basePath={params.basePath}
      isPrivate={params.isPrivate}
      path={params.path}
      component={params.component}
      label={params.label}
      exact={params.exact}
    />
  ) : (
    <Route
      key={params.key}
      path={params.path}
      component={params.component}
      exact={params.exact}
    />
  )

export const getAuthFreeRoutes = (routes: RouteMap): string[] => {
  return Object.values(routes).reduce((acc: string[], route) => {
    if (!route.isPrivate) {
      acc.push(route.basePath)
    }
    return acc
  }, [])
}
