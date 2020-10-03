// deps
import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Switch } from 'react-router-dom'
// components
import Layout from '_/containers/Layout'
// helpers
import routes from '_/routes/app-routes'
import { AuthContext } from '_/context'
import storage from '_/utils/storage'

const Root: React.FC = () => {
  // useTheme
  const { token, login } = React.useContext(AuthContext)

  if (!token && storage.get('token')) {
    login({
      token: storage.get('token') as string,
      userId: storage.get('userId') as string,
      tokenExpiration: +((storage.get(
        'tokenExpirationtoken'
      ) as unknown) as number),
    })
  }

  return (
    <Layout>
      <React.Suspense fallback={<CircularProgress />}>
        <Switch>{routes}</Switch>
      </React.Suspense>
    </Layout>
  )
}

export default Root
