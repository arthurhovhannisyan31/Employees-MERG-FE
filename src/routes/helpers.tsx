import React, { FC } from 'react'
import { Route } from 'react-router-dom'

import PrivateRoute from 'routes/private-route'
import { CustomRoute } from 'routes/types'

export const routeMaker: FC<CustomRoute> = (params) =>
  params.isPrivate ? (
    <PrivateRoute key={params.path} {...params} />
  ) : (
    <Route key={params.path} {...params} />
  )

export const getAuthFreeRoutes = (routes: CustomRoute[]): string[] => {
  return routes.reduce((acc: string[], route) => {
    if (!route.isPrivate) {
      acc.push(route.basePath)
    }
    return acc
  }, [])
}
