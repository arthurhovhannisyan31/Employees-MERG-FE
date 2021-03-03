// deps
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Switch from '@material-ui/core/Switch'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme } from '@material-ui/core/styles'
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
import { useLogout } from '_/utils/hooks'

const useStyles = makeStyles((theme: Theme) => ({
  container: {},
  link: {
    color: 'white',
  },
  activeLink: {
    color: theme.palette.secondary.main,
  },
}))

const Header: React.FC = () => {
  const { darkMode, toggleTheme } = React.useContext(ThemeContext)
  const {
    token,
    userCredentials: { email },
  } = React.useContext(AuthContext)

  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()

  const [handleLogout] = useLogout()

  const handleLogin = () => {
    history.push('/auth')
  }
  // todo nav bar props array

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Grid container justify="space-between" className={classes.container}>
          <Grid item>
            <Grid item container alignItems="center">
              <Tooltip title="Home">
                <Button
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
              {token ? (
                <Tooltip title="Logout">
                  <Button onClick={handleLogout} className={clsx(classes.link)}>
                    <LogOut />
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip title="Logout">
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
