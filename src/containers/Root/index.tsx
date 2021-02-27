// deps
import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Switch } from 'react-router-dom'
// components
import Layout from '_/containers/Layout'
import SnackbarComp from '_/components/UI/Snackbar'
import BreadcrumbsComp from '_/components/UI/Breadcrumbs'
import Backdrop from '_/components/UI/Backdrop'
// model
import { EAuthContextActions } from '_/model/context/auth'
import { AuthData } from '_/model/generated'
// helpers
import routes from '_/routes/app-routes'
import { AuthContext } from '_/context'
import storage from '_/utils/storage'
import Grid from '@material-ui/core/Grid'
import { useCheckAuthorization } from '_/containers/Root/hooks'
import useStyles from './styles'

const Root: React.FC = () => {
  const { token, dispatch } = React.useContext(AuthContext)

  const classes = useStyles()

  const [handleCheckAuthorization] = useCheckAuthorization()

  if (!token && storage.get('token')) {
    const data: AuthData = {
      token: storage.get('token') || '',
      userCredentials: JSON.parse(storage.get('userCredentials') || ''),
    }
    dispatch({
      type: EAuthContextActions.LOGIN,
      payload: data,
    })
  }

  React.useEffect(() => {
    if (token) {
      handleCheckAuthorization()
    }
  }, [token])

  return (
    <Layout>
      <SnackbarComp />
      <BreadcrumbsComp />
      <React.Suspense
        fallback={
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.loadingFallback}
          >
            <Backdrop />
            <CircularProgress />
          </Grid>
        }
      >
        <Switch>{routes}</Switch>
      </React.Suspense>
    </Layout>
  )
}

export default Root
