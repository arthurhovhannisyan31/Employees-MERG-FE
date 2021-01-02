// deps
import React, {
  useState, useContext,
} from 'react'
import {
  useHistory,
} from 'react-router-dom'
import {
  makeStyles, Theme,
} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
// components
// helpers
import {
  AuthContext,
} from '_/context'
import storage from '_/utils/storage'
import {
  loginQuery,
} from '_/gql/queries'
import {
  signUp,
} from '_/gql/mutations'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: '100%',
  },
  paper: {
    padding: theme.spacing(2),
  },
  headTitle: {
    textAlign: 'center',
  },
}))

const Auth: React.FC = () => {
  // router
  const history = useHistory()

  // context
  const { login } = useContext(AuthContext)

  // state
  const [authState, setAuthState] = useState<boolean>(false)
  const toggleAuthState = () => setAuthState((val: boolean) => !val)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  // styles
  const classes = useStyles()

  const handleTextField = (type: string) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
  }

  const disableSubmit = !email?.trim() || !password?.trim()
  const apiUrl = process?.env?.API_URL || ''

  const handleSubmit = async () => {
    const loginBody = loginQuery({
      email, password,
    })
    const signupBody = signUp({
      email, password,
    })

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        body: JSON.stringify(authState ? signupBody : loginBody),
        headers: {
          'Content-Type': 'application/json',
        },
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
        } = result?.data?.login
        login({
          token: tokenValue,
          userId: userIdValue,
          tokenExpiration: tokenExpirationValue,
        })
        storage.set('token', tokenValue)
        storage.set('userId', userIdValue)
        storage.set('tokenExpiration', tokenExpirationValue)
        history.push('/')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !disableSubmit) {
      handleSubmit()
    }
  }

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
