// deps
import React, { useContext } from 'react'
import { Route, useLocation, useHistory } from 'react-router-dom'
// model
import { CustomRoute } from '_/routes/app-routes'
// helpers
import { AuthContext } from '_/context'

const PrivateRoute: React.FC<CustomRoute> = ({
  component: Component,
  ...params
}) => {
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
