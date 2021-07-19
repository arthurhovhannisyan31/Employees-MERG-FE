// deps
import React from 'react'
import { Route } from 'react-router-dom'
// model
import { CustomRoute, routes } from 'routes/app-routes'
// local
import PrivateRoute from 'routes/private-route'

export const routeMaker: React.FC<CustomRoute> = (params) =>
  params.isPrivate ? (
    <PrivateRoute key={params.path} {...params} />
  ) : (
    <Route key={params.path} {...params} />
  )

export const getAuthFreeRoutes = (): string[] => {
  return routes.reduce((acc: string[], route) => {
    if (!route.isPrivate) {
      acc.push(route.basePath)
    }
    return acc
  }, [])
}
