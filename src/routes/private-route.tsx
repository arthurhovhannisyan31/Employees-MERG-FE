import React, { useContext, FC } from 'react'
import { Route, useLocation, useHistory } from 'react-router-dom'

import { AuthContext } from 'context'
import { CustomRoute } from 'routes/types'

const PrivateRoute: FC<CustomRoute> = ({ component: Component, ...params }) => {
  const { userCredentials } = useContext(AuthContext)
  const isAuthorized = userCredentials?._id

  const location = useLocation()
  const history = useHistory()

  if (!isAuthorized) {
    history.push(`/auth${location.pathname}`)
  }
  return <Route {...params} render={(props) => <Component {...props} />} />
}

export default PrivateRoute
