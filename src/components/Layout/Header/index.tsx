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
// model
import { RoutePath } from 'model/common'
// helpers
import { AuthContext, ThemeContext } from 'context'
import { useLogout } from 'containers/Auth/hooks/useLogout'
import useStyles from './styles'

const Header: FC = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext)
  const {
    userCredentials: { email, _id: id },
  } = React.useContext(AuthContext)

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
                    disabled={!isUnauthenticated}
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
              <Switch checked={darkMode} onChange={toggleTheme} />
              {isUnauthenticated ? (
                <Tooltip title="Logout">
                  <Button onClick={handleLogout} className={clsx(classes.link)}>
                    <LogOut />
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip title="Login">
                  <span>
                    <Button
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
