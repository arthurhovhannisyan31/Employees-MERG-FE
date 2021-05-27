import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import React, { useEffect, useContext, FC } from 'react'
import { Switch, useLocation } from 'react-router-dom'

import Backdrop from 'components/UI/Backdrop'
import BreadcrumbsComp from 'components/UI/Breadcrumbs'
import SnackbarComp from 'components/UI/Snackbar'
import Layout from 'containers/Layout'
import { useCheckAuthorization } from 'containers/Root/hooks'
import { AuthContext } from 'context'
import routes from 'routes/app-routes'

import { ERoutePath } from 'model/common'

import useStyles from './styles'

const Root: FC = () => {
  const classes = useStyles()
  const location = useLocation()

  const { dispatch } = useContext(AuthContext)
  console.log(location.pathname, location.pathname.includes(ERoutePath.AUTH))
  const showBreadcrumbs = !location.pathname.includes(ERoutePath.AUTH)

  const handleCheckAuthorization = useCheckAuthorization({ dispatch })

  useEffect(() => {
    handleCheckAuthorization()
    // eslint-disable-next-line
  }, [])

  return (
    <Layout>
      <SnackbarComp />
      {showBreadcrumbs && <BreadcrumbsComp />}
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
