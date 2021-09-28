import { ThemeProvider } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import React, { useContext, useEffect, FC } from 'react'
import { Switch, useLocation } from 'react-router-dom'

import Backdrop from 'components/UI/Backdrop'
import BreadcrumbsComp from 'components/UI/Breadcrumbs'
import SnackbarComp from 'components/UI/Snackbar'
import { useMe } from 'containers/Auth/hooks'
import Layout from 'containers/Layout'
import { AuthContext, ThemeContext } from 'context'
import { default as routes } from 'routes/app-routes'
import themeCreator from 'utils/theme'

import { RoutePath } from 'model/common'

import useStyles from './styles'

const Root: FC = () => {
  const classes = useStyles()
  const location = useLocation()

  const { darkMode } = useContext(ThemeContext)
  const isAuthRoute = location?.pathname.includes(RoutePath.AUTH)
  const isResetPassword = location.pathname.includes(RoutePath.CHANGE_PASSWORD)

  const { dispatch } = useContext(AuthContext)
  // TODO case for CHANGE_PASSWORD
  const showBreadcrumbs = !(isAuthRoute || isResetPassword)

  const handleCheckAuthorization = useMe({ dispatch })

  useEffect(() => {
    handleCheckAuthorization()
    // eslint-disable-next-line
  }, [])

  return (
    <ThemeProvider theme={themeCreator({ darkMode })}>
      <Layout>
        <SnackbarComp />
        {showBreadcrumbs && <BreadcrumbsComp />}
        <React.Suspense
          fallback={
            <Grid
              container
              justifyContent="center"
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
    </ThemeProvider>
  )
}

export default Root
