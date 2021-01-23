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
// helpers
import routes from '_/routes/app-routes'
import { AuthContext } from '_/context'
import storage from '_/utils/storage'
import Grid from '@material-ui/core/Grid'
import useStyles from './styles'

const Root: React.FC = () => {
  // theme
  const { token, dispatch } = React.useContext(AuthContext)
  // styles
  const classes = useStyles()

  if (!token && storage.get('token')) {
    dispatch({
      type: EAuthContextActions.LOGIN,
      payload: {
        token: storage.get('token') as string,
        userId: storage.get('userId') as string,
        tokenExpiration: +((storage.get(
          'tokenExpirationtoken',
        ) as unknown) as number),
      },
    })
  }

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
