// deps
import React from 'react'
import { Route } from 'react-router-dom'
// model
import { IRoute } from '_/routes/app-routes'
// local
import PrivateRoute from '_/routes/private-route'

// eslint-disable-next-line import/prefer-default-export
export const routeMaker: React.FC<IRoute> = (params) =>
  params.isPrivate ? (
    <PrivateRoute key={params.path} {...params} />
  ) : (
    <Route key={params.path} {...params} />
  )
