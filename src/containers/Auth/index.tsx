// deps
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
// helpers
import { AuthContext } from '_/context'
import { useHandleSubmit } from '_/containers/Auth/hooks'
import useStyles from './style'

const Auth: React.FC = () => {
  const { dispatch, errors: authErrors } = React.useContext(AuthContext)

  const [authState, setAuthState] = React.useState<boolean>(false)
  const toggleAuthState = () => setAuthState((val: boolean) => !val)

  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

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

  const [handleSubmit] = useHandleSubmit({
    email,
    password,
    authState,
    dispatch,
  })

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
