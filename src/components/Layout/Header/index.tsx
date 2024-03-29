import {
  Button,
  AppBar,
  Toolbar,
  Switch,
  Grid,
  Tooltip,
  Typography,
  FormLabel,
} from '@material-ui/core'
import {
  Home as HomeIcon,
  Info as AboutIcon,
  People as PeopleIcon,
  ExitToApp as LogOut,
  Person as PersonIcon,
} from '@material-ui/icons'
import clsx from 'clsx'
import React, { FC, useCallback, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { useLogout } from 'containers/Auth/hooks/useLogout'
import { AuthContext, ThemeContext } from 'context'

import { RoutePath } from 'model/routes/configs'

import useStyles from './styles'

const Header: FC = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext)
  const {
    userCredentials: { email, _id: id },
  } = useContext(AuthContext)

  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()

  // TODO extract to constants
  const isUnauthenticated = !!id
  const isAuthRoute = location?.pathname.includes(RoutePath.AUTH)
  const isResetPassword = location.pathname.includes(RoutePath.CHANGE_PASSWORD)

  const handleLogout = useLogout()

  const handleLogin = useCallback((): void => {
    history.push('/auth')
  }, [history])

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Grid
          container
          justifyContent="space-between"
          className={classes.container}
        >
          <Grid item>
            <Grid item container alignItems="center">
              <Tooltip title="Home">
                <span>
                  <Button
                    aria-label={'Home'}
                    onClick={() => history.push('/')}
                    className={clsx(classes.link, {
                      [classes.activeLink]: location?.pathname === '/',
                    })}
                  >
                    <HomeIcon />
                  </Button>
                </span>
              </Tooltip>
              <Tooltip title="Employees">
                <span>
                  <Button
                    aria-label={'Employees'}
                    disabled={!isUnauthenticated}
                    onClick={() => history.push('/employees')}
                    className={clsx(classes.link, {
                      [classes.activeLink]: location?.pathname === '/employees',
                    })}
                  >
                    <PeopleIcon />
                  </Button>
                </span>
              </Tooltip>
              <Tooltip title="About">
                <span>
                  <Button
                    aria-label={'About'}
                    disabled={!isUnauthenticated}
                    onClick={() => history.push('/about')}
                    className={clsx(classes.link, {
                      [classes.activeLink]: location?.pathname === '/about',
                    })}
                  >
                    <AboutIcon />
                  </Button>
                </span>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Typography>{email}</Typography>
              <FormLabel>
                <Switch
                  role="application"
                  aria-label={'Theme Switch'}
                  aria-roledescription={'Theme Switch'}
                  checked={darkMode}
                  onChange={toggleTheme}
                />
              </FormLabel>
              {isUnauthenticated ? (
                <Tooltip title="Logout">
                  <Button
                    aria-label={'Logout'}
                    onClick={handleLogout}
                    className={clsx(classes.link)}
                  >
                    <LogOut />
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip title="Login">
                  <span>
                    <Button
                      aria-label={'Login'}
                      disabled={isAuthRoute || isResetPassword}
                      onClick={handleLogin}
                      className={clsx(classes.link)}
                    >
                      <PersonIcon />
                    </Button>
                  </span>
                </Tooltip>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header
