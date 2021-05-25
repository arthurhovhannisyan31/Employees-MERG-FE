// deps
import React, { useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Switch } from 'react-router-dom'
// components
import Layout from '_/containers/Layout'
import SnackbarComp from '_/components/UI/Snackbar'
import BreadcrumbsComp from '_/components/UI/Breadcrumbs'
import Backdrop from '_/components/UI/Backdrop'
// helpers
import routes from '_/routes/app-routes'
import { AuthContext } from '_/context'
import Grid from '@material-ui/core/Grid'
import { useCheckAuthorization } from '_/containers/Root/hooks'
import useStyles from './styles'

const Root: React.FC = () => {
  const classes = useStyles()

  const { dispatch } = React.useContext(AuthContext)

  const [handleCheckAuthorization] = useCheckAuthorization({ dispatch })

  useEffect(() => {
    handleCheckAuthorization()
    // eslint-disable-next-line
  }, [])

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
