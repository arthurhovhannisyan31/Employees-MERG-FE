// deps
import React, { useCallback, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Switch from '@material-ui/core/Switch'
import Grid from '@material-ui/core/Grid'
import HomeIcon from '@material-ui/icons/Home'
import AboutIcon from '@material-ui/icons/Info'
import PeopleIcon from '@material-ui/icons/People'
import Tooltip from '@material-ui/core/Tooltip'
import LogOut from '@material-ui/icons/ExitToApp'
import PersonIcon from '@material-ui/icons/Person'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
// helpers
import { AuthContext, ThemeContext } from '_/context'
import { useLogout } from '_/containers/Auth/hooks/useLogout'

import useStyles from './styles'

const Header: React.FC = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext)
  const {
    userCredentials: { email, _id: id },
  } = React.useContext(AuthContext)
  const isAuth = !!id

  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()

  const handleLogout = useLogout()

  const handleLogin = useCallback(() => {
    history.push('/auth')
  }, [history])

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar variant="dense">
        <Grid container justify="space-between" className={classes.container}>
          <Grid item>
            <Grid item container alignItems="center">
              <Tooltip title="Home">
                <Button
                  disabled={!isAuth}
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
                  disabled={!isAuth}
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
                  disabled={!isAuth}
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
