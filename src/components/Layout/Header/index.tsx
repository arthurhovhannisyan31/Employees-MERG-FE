import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import LogOut from '@material-ui/icons/ExitToApp'
import HomeIcon from '@material-ui/icons/Home'
import AboutIcon from '@material-ui/icons/Info'
import PeopleIcon from '@material-ui/icons/People'
import PersonIcon from '@material-ui/icons/Person'
import clsx from 'clsx'
import React, { FC, useContext } from 'react'
import { useHistory, useLocation, useCallback } from 'react-router-dom'

import { useLogout } from 'containers/Auth/hooks/useLogout'
import { AuthContext, ThemeContext } from 'context'

import useStyles from './styles'

const Header: FC = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext)
  const {
    userCredentials: { email, _id: id },
  } = useContext(AuthContext)
  const isAuth = !!id

  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()

  const handleLogout = useLogout()

  const handleLogin = useCallback((): void => {
    history.push('/auth')
  }, [])

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar variant="dense">
        <Grid container justify="space-between" className={classes.container}>
          <Grid item>
            <Grid item container alignItems="center">
              <Tooltip title="Home">
                <Button
                  disabled={!token}
                  onClick={() => history.push('/')}
                  className={clsx(classes.link, {
                    [classes.activeLink]: location?.pathname === '/',
                  })}
                >
                  <HomeIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Employees">
                <Button
                  disabled={!token}
                  onClick={() => history.push('/employees')}
                  className={clsx(classes.link, {
                    [classes.activeLink]: location?.pathname === '/employees',
                  })}
                >
                  <PeopleIcon />
                </Button>
              </Tooltip>
              <Tooltip title="About">
                <Button
                  disabled={!token}
                  onClick={() => history.push('/about')}
                  className={clsx(classes.link, {
                    [classes.activeLink]: location?.pathname === '/about',
                  })}
                >
                  <AboutIcon />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Typography>{email}</Typography>
              <Switch checked={darkMode} onChange={toggleTheme} />
              {isAuth ? (
                <Tooltip title="Logout">
                  <Button onClick={handleLogout} className={clsx(classes.link)}>
                    <LogOut />
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip title="Login">
                  <Button onClick={handleLogin} className={clsx(classes.link)}>
                    <PersonIcon />
                  </Button>
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
