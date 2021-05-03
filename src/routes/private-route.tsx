// deps
import React from 'react'
import { Redirect, Route, useLocation, useHistory } from 'react-router-dom'

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

  const location = useLocation()
  const history = useHistory()

  if (!isAuthorized) {
    history.replace(`/auth${location.pathname}`)
  }

  // return (
  //   <Route
  //     {...params}
  //     render={(props) =>
  //       isAuthorized ? (
  //         // todo fix types***********
  //         // eslint-disable-next-line
  //         // @ts-ignore
  //         <Component {...props} />
  //       ) : (
  //         <Redirect to={CONSTANTS.ROUTES.AUTH} />
  //       )
  //     }
  //   />
  // )
  return (
    <Route
      {...params}
      render={(props) => (
        // eslint-disable-next-line
        // @ts-ignore
        <Component {...props} />
      )}
    />
  )
}

export default PrivateRoute
