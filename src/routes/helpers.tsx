import React from 'react'
import { Route } from 'react-router-dom'

import PrivateRoute from 'routes/private-route'

import { IRoute } from './types'

export const routeMaker: React.FC<IRoute> = (params) =>
  params.isPrivate ? (
    <PrivateRoute key={params.path} {...params} />
  ) : (
    <Route key={params.path} {...params} />
  )
