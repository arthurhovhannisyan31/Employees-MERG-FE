// deps
import React from 'react'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
// components
// model
import { EAuthContextActions } from '_/model/context/auth'
// helpers
import { AuthContext } from '_/context'
import storage from '_/utils/storage'
import { loginQuery } from '_/gql/queries'
import { signUp } from '_/gql/mutations'
import useStyles from './style'

const Auth: React.FC = () => {
  // router
  const history = useHistory()

  // context
  const { dispatch, errors: authErrors } = React.useContext(AuthContext)

  // state
  const [authState, setAuthState] = React.useState<boolean>(false)
  const toggleAuthState = () => setAuthState((val: boolean) => !val)

  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  // styles
  const classes = useStyles({ hasError: !!authErrors?.length })

  const handleTextField = React.useCallback(
    (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const apiUrl = process?.env?.API_URL || ''
  const disableSubmit = React.useMemo(
    () => !email?.trim() || !password?.trim(),
    [email, password],
  )

  const errorMessages = React.useMemo(
    () =>
      authErrors?.map((err) => (
        <Typography className={classes.errorMessage}>{err.message}</Typography>
      )),
    [authErrors, classes.errorMessage],
  )

  const handleSubmit = React.useCallback(async () => {
    const loginBody = loginQuery({ email, password })
    const signupBody = signUp({ email, password })

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        body: JSON.stringify(authState ? signupBody : loginBody),
        headers: { 'Content-Type': 'application/json' },
      })
      if (![200, 201].includes(res?.status)) {
        throw new Error('Failed!')
      }
      const result = await res.json()
      if (result?.data?.login?.token) {
        const {
          token: tokenValue,
          userId: userIdValue,
          tokenExpiration: tokenExpirationValue,
        } = result.data.login
        dispatch({
          type: EAuthContextActions.LOGIN,
          payload: {
            token: tokenValue,
            userId: userIdValue,
            tokenExpiration: tokenExpirationValue,
          },
        })
        storage.set('token', tokenValue)
        storage.set('userId', userIdValue)
        storage.set('tokenExpiration', tokenExpirationValue)
        history.push('/')
      }
    } catch (err) {
      dispatch({
        type: EAuthContextActions.ERRORS,
        payload: { errors: [err] },
      })
    }
  }, [authState, history, apiUrl, dispatch, email, password])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' && !disableSubmit) {
        handleSubmit()
      }
    },
    [handleSubmit, disableSubmit],
  )

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.container}
    >
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
