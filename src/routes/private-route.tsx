// deps
import React from 'react'
import { Route, useLocation, useHistory } from 'react-router-dom'
// model
import { IRoute } from '_/routes/app-routes'
// helpers
import { AuthContext } from '_/context'

const PrivateRoute: React.FC<IRoute> = ({
  component: Component,
  ...params
}) => {
  const { userCredentials } = React.useContext(AuthContext)
  const isAuthorized = userCredentials?._id

  const location = useLocation()
  const history = useHistory()

  if (!isAuthorized) {
    history.push(`/auth${location.pathname}`)
  }
  return <Route {...params} render={(props) => <Component {...props} />} />
}

export default PrivateRoute
