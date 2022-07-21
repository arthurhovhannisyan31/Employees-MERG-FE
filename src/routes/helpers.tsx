import React, { FC } from 'react'
import { Route } from 'react-router-dom'

import PrivateRoute from 'routes/private-route'
import { CustomRoute } from 'routes/types'

import { RouteMap } from 'model/routes/types'

export const routeMaker: FC<CustomRoute> = (params) =>
  params.isPrivate ? (
    <PrivateRoute
      key={params.path}
      basePath={params.basePath}
      isPrivate={params.isPrivate}
      path={params.path}
      component={params.component}
      label={params.label}
      exact={params.exact}
    />
  ) : (
    <Route key={params.path} {...params} />
  )

export const getAuthFreeRoutes = (routes: RouteMap): string[] => {
  return Object.values(routes).reduce((acc: string[], route) => {
    if (!route.isPrivate) {
      acc.push(route.basePath)
    }
    return acc
  }, [])
}
