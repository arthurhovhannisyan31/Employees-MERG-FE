// deps
import React from 'react'
import { CssBaseline } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Header from '_/pages/Header'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Switch } from 'react-router-dom'
// local
import routes from '_/routes/app-routes'
import { makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles'
import themeCreator from '_/theme'
import { ThemeContext, AuthContext } from '_/context'
import storage from '_/utils/storage'

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    height: theme.spacing(6),
  },
  container: {
    height: `calc(100vh - ${theme.spacing(6)}px)`,
  },
}))

const Root: React.FC = () => {
  // useTheme
  const { darkMode } = React.useContext(ThemeContext)
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

  // useStyles
  const classes = useStyles()

  return (
    <ThemeProvider theme={themeCreator({ darkMode })}>
      <CssBaseline />
      <Grid container direction="column">
        <Grid item className={classes.header}>
          <Header />
        </Grid>
        <Grid item className={classes.container}>
          <React.Suspense fallback={<CircularProgress />}>
            <Switch>{routes}</Switch>
          </React.Suspense>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Root
