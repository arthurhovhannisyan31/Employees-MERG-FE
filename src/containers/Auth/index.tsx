import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useContext,
  KeyboardEvent,
  ChangeEvent,
  FC,
} from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { useLogin } from 'containers/Auth/hooks'
import { AuthContext } from 'context'

import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SignIn from 'containers/Auth/components/singIn'
import SignUp from 'containers/Auth/components/signUp'
import { AuthContext } from 'context'
import { useLogin } from 'containers/Auth/hooks'
import { a11yProps } from 'utils/helpers'
import TabPanel from 'components/UI/TabPanel'

import useStyles from './style'

const Auth: FC = () => {
  const history = useHistory()
  const { next = '' } = useParams<Record<'next', string>>()
  const {
    userCredentials,
    dispatch,
    errors: authErrors,
  } = useContext(AuthContext)

  const [tab, setTab] = useState(0)

  const [authState, setAuthState] = useState<boolean>(false)
  const toggleAuthState = (): void => setAuthState((val: boolean) => !val)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const classes = useStyles({ hasError: !!authErrors?.length })

  const handleChange = useCallback(
    (_: React.ChangeEvent<{}>, newValue: number) => {
      setTab(newValue)
    },
    [],
  )
  const handleTextField = useCallback(
    (type: string) => (event: ChangeEvent<HTMLInputElement>): void => {
      switch (type) {
        case 'email':
          setEmail(event.target.value)
          break
        case 'password':
          setPassword(event.target.value)
          break
        default:
          break
      }
    },
    [],
  )

  const disableSubmit = useMemo(
    () => !email?.trim() || !password?.trim(),
    [email, password],
  )

  const errorMessages = useMemo(
    () =>
      authErrors?.map((err) => (
        <Typography
          key={`${err.name}-${err.message}`}
          className={classes.errorMessage}
        >
          {err.message}
        </Typography>
      )),
    [authErrors, classes.errorMessage],
  )

  const handleLogin = useLogin({
    authState,
    dispatch,
  })

  const handleSubmit = useCallback(() => {
    handleLogin({ email, password })
  }, [email, handleLogin, password])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !disableSubmit) {
        handleSubmit()
      }
    },
    [disableSubmit, handleSubmit],
  )

  useEffect(() => {
    if (userCredentials?._id) {
      history.push(`/${next}`)
    }
  }, [history, next, userCredentials])

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid direction="column" spacing={2}>
        <AppBar position="static" color="transparent">
          <Tabs
            indicatorColor="primary"
            value={tab}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Sign In" {...a11yProps('sign in')} />
            <Tab label="Sign Up" {...a11yProps('sign up')} />
          </Tabs>
        </AppBar>
        <TabPanel value={tab} index={0}>
          <SignIn handleSubmit={handleSubmit} />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <SignUp handleSubmit={handleSubmit} />
        </TabPanel>
      </Grid>
      <Paper className={classes.paper}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography className={classes.headTitle}>
              {authState ? 'Sign up' : 'Login'}
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              id="outlined-basic-email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={handleTextField('email')}
              onKeyDown={handleKeyDown}
              type="email"
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-basic-password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={handleTextField('password')}
              onKeyDown={handleKeyDown}
              type="password"
            />
          </Grid>
          <Grid item>{errorMessages}</Grid>
          <Grid item container justify="space-between">
            <Button onClick={toggleAuthState}>
              {authState ? 'Login' : 'Sign up'}
            </Button>
            <Button onClick={handleSubmit} disabled={disableSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default Auth
