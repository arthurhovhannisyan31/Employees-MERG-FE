// deps
import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
// local
import CONSTANTS from '_/utils/constants'
import { IRoute } from '_/routes/app-routes'
import { AuthContext } from '_/context'
import storage from '_/utils/storage'

const PrivateRoute: React.FC<IRoute> = ({
  component: Component,
  ...params
}) => {
  // useContext
  const { token } = useContext(AuthContext)

  const isAuthorized = token || storage.get('token')

  return (
    <Route
      {...params}
      render={(props) =>
        isAuthorized ? (
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
