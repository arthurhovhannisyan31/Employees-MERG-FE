// deps
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
// model
import { IRoute } from '_/routes/app-routes'
// local
import CONSTANTS from '_/utils/constants'
import { AuthContext } from '_/context'

const PrivateRoute: React.FC<IRoute> = ({
  component: Component,
  ...params
}) => {
  const { userCredentials } = React.useContext(AuthContext)
  const isAuthorized = userCredentials?._id

  return (
    <Route
      {...params}
      render={(props) =>
        isAuthorized ? (
          // todo fix types
          // eslint-disable-next-line
          // @ts-ignore
          <Component {...props} />
        ) : (
          <Redirect to={CONSTANTS.ROUTES.AUTH} />
        )
      }
    />
  )
}

export default PrivateRoute
